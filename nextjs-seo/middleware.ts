import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cache for redirects (in-memory, refreshes on deployment)
let redirectsCache: Map<string, { to_path: string; redirect_type: number }> | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getRedirects() {
  const now = Date.now();

  // Return cached redirects if still valid
  if (redirectsCache && (now - lastCacheTime) < CACHE_DURATION) {
    return redirectsCache;
  }

  // Fetch fresh redirects from database
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('seo_redirects')
      .select('from_path, to_path, redirect_type');

    if (error) {
      console.error('Error fetching redirects:', error);
      return redirectsCache || new Map(); // Return old cache or empty map on error
    }

    // Build new cache
    const newCache = new Map<string, { to_path: string; redirect_type: number }>();
    data?.forEach((redirect) => {
      newCache.set(redirect.from_path, {
        to_path: redirect.to_path,
        redirect_type: redirect.redirect_type || 301,
      });
    });

    redirectsCache = newCache;
    lastCacheTime = now;

    return newCache;
  } catch (err) {
    console.error('Exception fetching redirects:', err);
    return redirectsCache || new Map();
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get redirects from cache or database
  const redirects = await getRedirects();

  // Check if current path needs to be redirected
  const redirect = redirects.get(pathname);

  if (redirect) {
    const { to_path, redirect_type } = redirect;

    // Build the full destination URL
    const destination = new URL(to_path, request.url);

    // Preserve query parameters if any
    destination.search = request.nextUrl.search;

    // Return appropriate redirect response
    return NextResponse.redirect(destination, redirect_type);
  }

  // No redirect needed, continue
  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

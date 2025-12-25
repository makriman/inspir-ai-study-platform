/**
 * Analytics tracking utilities for Google Analytics 4 and Microsoft Clarity
 * Use these functions to track custom events throughout the application
 */

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    clarity?: (command: string, ...args: any[]) => void;
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event (e.g., 'trial_signup', 'tool_click')
 * @param params - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track page views (automatically handled by Next.js, but can be called manually)
 * @param url - The URL of the page being viewed
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-H9NLQ3DV2T', {
      page_path: url,
    });
  }
};

/**
 * Track conversion events (trial signups, purchases, etc.)
 * @param conversionName - Name of the conversion
 * @param value - Value of the conversion (e.g., subscription price)
 */
export const trackConversion = (
  conversionName: string,
  value?: number
) => {
  trackEvent(conversionName, {
    value: value || 0,
    currency: 'GBP',
  });
};

/**
 * Track tool interactions
 * @param toolName - Name of the tool being used
 * @param action - Action taken (e.g., 'open', 'close', 'use')
 */
export const trackToolInteraction = (
  toolName: string,
  action: string
) => {
  trackEvent('tool_interaction', {
    tool_name: toolName,
    action: action,
  });
};

/**
 * Track blog post engagement
 * @param postSlug - Slug of the blog post
 * @param action - Action taken (e.g., 'read', 'share', 'bookmark')
 */
export const trackBlogEngagement = (
  postSlug: string,
  action: string
) => {
  trackEvent('blog_engagement', {
    post_slug: postSlug,
    action: action,
  });
};

/**
 * Track CTA clicks
 * @param ctaLocation - Where the CTA is located (e.g., 'hero', 'footer', 'blog_post')
 * @param ctaText - Text of the CTA button
 */
export const trackCTAClick = (
  ctaLocation: string,
  ctaText: string
) => {
  trackEvent('cta_click', {
    location: ctaLocation,
    cta_text: ctaText,
  });
};

/**
 * Track newsletter signups
 * @param source - Where the signup occurred (e.g., 'footer', 'popup')
 */
export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', {
    source: source,
  });
};

/**
 * Track search queries
 * @param query - The search query
 */
export const trackSearch = (query: string) => {
  trackEvent('search', {
    search_term: query,
  });
};

/**
 * Track outbound link clicks
 * @param url - The destination URL
 * @param linkText - Text of the link
 */
export const trackOutboundClick = (url: string, linkText: string) => {
  trackEvent('outbound_click', {
    destination: url,
    link_text: linkText,
  });
};

/**
 * Custom Clarity tags for session segmentation
 * @param key - Tag key
 * @param value - Tag value
 */
export const setClarityTag = (key: string, value: string) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', key, value);
  }
};

/**
 * Identify user in Clarity (for logged-in users)
 * @param userId - Unique user identifier
 */
export const identifyClarityUser = (userId: string) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', userId);
  }
};

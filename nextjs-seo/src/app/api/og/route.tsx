import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters from URL
    const title = searchParams.get('title') || 'inspir'
    const subtitle = searchParams.get('subtitle') || 'AI-Powered Study Platform'
    const category = searchParams.get('category') || 'blog'

    // Category colors
    const categoryColors: Record<string, string> = {
      'blog': '#7C3AED',
      'tool': '#0030AB',
      'study-skills': '#3B82F6',
      'tool-guides': '#7C3AED',
      'subject-help': '#10B981',
      'exam-prep': '#EF4444',
      'productivity': '#EAB308',
      'ai-education': '#4F46E5',
    }

    const primaryColor = categoryColors[category] || '#7C3AED'
    const secondaryColor = '#1E293B'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            fontSize: 48,
            fontWeight: 700,
            padding: '80px 120px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              lineHeight: 1.4,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                marginBottom: 40,
                maxWidth: '90%',
                wordWrap: 'break-word',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 400,
                color: '#E2E8F0',
                maxWidth: '80%',
              }}
            >
              {subtitle}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 80,
              fontSize: 28,
              color: '#E2E8F0',
              fontWeight: 600,
            }}
          >
            inspir.uk
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error('OG Image generation error:', e.message)
    return new Response('Failed to generate image', { status: 500 })
  }
}

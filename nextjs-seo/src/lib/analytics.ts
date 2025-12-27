/**
 * Google Analytics 4 Helper Functions
 * Centralized analytics tracking for inspir
 */

// GA4 Measurement ID
export const GA_MEASUREMENT_ID = 'G-H9NLQ3DV2T'

// Microsoft Clarity Project ID
export const CLARITY_PROJECT_ID = 'uqoefkpodz'

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * Track page views
 * @param url - The page URL
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

/**
 * Track custom events
 * @param action - Event action (e.g., 'click', 'view', 'submit')
 * @param category - Event category (e.g., 'engagement', 'conversion')
 * @param label - Event label for additional context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Track CTA button clicks
 * @param ctaName - Name of the CTA (e.g., 'Start Free Trial', 'View Pricing')
 * @param location - Where the CTA appears (e.g., 'hero', 'pricing_page', 'tool_page')
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', 'conversion', `${ctaName} - ${location}`)
}

/**
 * Track tool page views
 * @param toolName - Name of the tool
 * @param toolSlug - URL slug of the tool
 */
export const trackToolView = (toolName: string, toolSlug: string) => {
  trackEvent('tool_view', 'engagement', `${toolName} (${toolSlug})`)
}

/**
 * Track blog post views
 * @param postTitle - Title of the blog post
 * @param postSlug - URL slug of the post
 * @param category - Blog post category
 */
export const trackBlogView = (
  postTitle: string,
  postSlug: string,
  category?: string
) => {
  trackEvent('blog_view', 'engagement', `${postTitle} (${category || 'uncategorized'})`)
}

/**
 * Track search queries
 * @param query - The search term
 * @param resultsCount - Number of results returned
 */
export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'engagement', query, resultsCount)
}

/**
 * Track outbound link clicks
 * @param url - The external URL being clicked
 * @param linkText - Text of the link
 */
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('outbound_click', 'engagement', linkText || url)
}

/**
 * Track trial signup initiation
 * @param source - Where the signup was initiated (e.g., 'pricing_page', 'tool_page')
 */
export const trackTrialSignup = (source: string) => {
  trackEvent('trial_signup_start', 'conversion', source)
}

/**
 * Track trial signup completion
 * @param userId - Optional user ID for tracking
 */
export const trackTrialComplete = (userId?: string) => {
  trackEvent('trial_signup_complete', 'conversion', userId)
}

/**
 * Track time on page (call when user is about to leave)
 * @param pageName - Name of the page
 * @param timeInSeconds - Time spent on page in seconds
 */
export const trackTimeOnPage = (pageName: string, timeInSeconds: number) => {
  trackEvent('time_on_page', 'engagement', pageName, timeInSeconds)
}

/**
 * Track scroll depth
 * @param percentage - Scroll depth percentage (25, 50, 75, 100)
 * @param pagePath - Page URL path
 */
export const trackScrollDepth = (percentage: number, pagePath: string) => {
  trackEvent('scroll_depth', 'engagement', pagePath, percentage)
}

/**
 * Set user properties
 * @param properties - User properties to set
 */
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties)
  }
}

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param success - Whether submission was successful
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'engagement',
    formName
  )
}

/**
 * Track video interactions
 * @param action - Video action (play, pause, complete)
 * @param videoTitle - Title of the video
 * @param position - Current position in seconds
 */
export const trackVideoInteraction = (
  action: 'play' | 'pause' | 'complete',
  videoTitle: string,
  position?: number
) => {
  trackEvent(`video_${action}`, 'engagement', videoTitle, position)
}

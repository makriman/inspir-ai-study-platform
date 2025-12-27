'use client'

/**
 * Sentry Test Page - Triggers Error for Verification
 * Visit this page to send a test error to Sentry
 */

export default function SentryTestPage() {
  // Trigger test error immediately on page load
  if (typeof window !== 'undefined') {
    // @ts-ignore - intentional error for Sentry testing
    myUndefinedFunction();
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Sentry Test Page</h1>
      <p>If you can see this, the error was caught by Sentry!</p>
      <button
        onClick={() => {
          // @ts-ignore - intentional error for Sentry testing
          myUndefinedFunction();
        }}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#7C3AED',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Trigger Error
      </button>
    </div>
  )
}

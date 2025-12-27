import * as Sentry from '@sentry/react';

/**
 * Test button to verify Sentry error tracking in React SPA
 * Add this temporarily to any page to test
 */
function SentryErrorButton() {
  return (
    <button
      onClick={() => {
        throw new Error('This is your first React SPA error!');
      }}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 24px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 9999
      }}
    >
      Break the world 🐛
    </button>
  );
}

export default SentryErrorButton;

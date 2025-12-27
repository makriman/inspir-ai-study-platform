import React from 'react';
import * as Sentry from "@sentry/react";

/**
 * Test button to verify Sentry error tracking is working
 * This component can be temporarily added to any page for testing
 */
export default function SentryTestButton() {
  const testError = () => {
    try {
      throw new Error("Test error from React SPA - Sentry is working!");
    } catch (error) {
      Sentry.captureException(error);
      console.log("Test error sent to Sentry");
    }
  };

  return (
    <button
      onClick={testError}
      className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium"
      title="Click to test Sentry error reporting"
    >
      Test Sentry 🐛
    </button>
  );
}

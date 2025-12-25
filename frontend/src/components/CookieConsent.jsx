import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem('inspir_cookie_consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        setShowBanner(true)
      }
    }
  }, [])

  const saveConsent = (prefs) => {
    localStorage.setItem('inspir_cookie_consent', JSON.stringify(prefs))
    localStorage.setItem('inspir_cookie_consent_date', new Date().toISOString())
    setShowBanner(false)
    setShowPreferences(false)
  }

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
  }

  const rejectAll = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(necessaryOnly)
    saveConsent(necessaryOnly)
  }

  const savePrefs = () => {
    saveConsent(preferences)
  }

  const togglePref = (key) => {
    setPreferences(p => ({ ...p, [key]: !p[key] }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 shadow-2xl" style={{ borderColor: '#661eaa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#661eaa' }} />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
                <a
                  href="/cookies"
                  className="text-sm hover:underline font-semibold"
                  style={{ color: '#661eaa' }}
                >
                  Learn more about cookies
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#661eaa] transition-colors"
              >
                Customize
              </button>
              <button
                onClick={rejectAll}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#db3e4a] hover:text-[#db3e4a] transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-md"
                style={{ background: 'linear-gradient(to right, #661eaa, #0030ab)' }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Necessary Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 rounded-full flex items-center px-1" style={{ backgroundColor: '#661eaa' }}>
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePref('analytics')}
                    className="ml-4"
                  >
                    <div className="w-12 h-6 rounded-full flex items-center px-1 transition-colors" style={{ backgroundColor: preferences.analytics ? '#661eaa' : '#d1d5db' }}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${preferences.analytics ? 'ml-auto' : ''}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Used to track visitors across websites to display relevant ads.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePref('marketing')}
                    className="ml-4"
                  >
                    <div className="w-12 h-6 rounded-full flex items-center px-1 transition-colors" style={{ backgroundColor: preferences.marketing ? '#661eaa' : '#d1d5db' }}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${preferences.marketing ? 'ml-auto' : ''}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Functional Cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePref('functional')}
                    className="ml-4"
                  >
                    <div className="w-12 h-6 rounded-full flex items-center px-1 transition-colors" style={{ backgroundColor: preferences.functional ? '#661eaa' : '#d1d5db' }}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${preferences.functional ? 'ml-auto' : ''}`}></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#661eaa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePrefs}
                className="px-6 py-2.5 text-white font-bold rounded-lg hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to right, #661eaa, #0030ab)' }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

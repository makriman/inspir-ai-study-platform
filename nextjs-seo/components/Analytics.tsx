'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      <GoogleAnalytics gaId="G-H9NLQ3DV2T" />

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "uqoefkpodz");
        `}
      </Script>
    </>
  )
}

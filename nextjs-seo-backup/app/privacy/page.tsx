import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy | inspir',
  description: 'Privacy policy for the inspir AI study platform. Learn how we protect your data.',
  canonical: 'https://inspir.uk/privacy',
  noindex: true,
})

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-gray-600">Last updated: December 20, 2024</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, including:
        </p>
        <ul>
          <li>Email address and account information</li>
          <li>Usage data and study patterns</li>
          <li>Conversations with the AI tutor</li>
          <li>Device and browser information</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide and improve our Service</li>
          <li>Personalize your learning experience</li>
          <li>Respond to your requests and provide support</li>
          <li>Send you updates and educational content</li>
          <li>Ensure the safety and security of our platform</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information with:
        </p>
        <ul>
          <li>Service providers who help us operate our platform</li>
          <li>Law enforcement when required by law</li>
          <li>Other users only if you explicitly choose to share</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Export your data</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our Service and hold certain information to improve your experience.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our Service is designed for students of all ages. We take extra precautions to protect the privacy of younger users and comply with applicable children's privacy laws.
        </p>

        <h2>8. Changes to Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@inspir.uk">privacy@inspir.uk</a>
        </p>
      </div>
    </main>
  )
}

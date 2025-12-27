/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 */

import { serializeJsonLd } from '@/lib/structured-data'

interface StructuredDataProps {
  data: any | any[]
}

export default function StructuredData({ data }: StructuredDataProps) {
  // Support both single schema and array of schemas
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(schema),
          }}
        />
      ))}
    </>
  )
}

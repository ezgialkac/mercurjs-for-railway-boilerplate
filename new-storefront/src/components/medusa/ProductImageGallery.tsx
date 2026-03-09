"use client"

import { useMemo, useState } from "react"

export default function ProductImageGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const safeImages = useMemo(
    () => images.filter(Boolean).slice(0, 10),
    [images]
  )
  const [active, setActive] = useState(0)
  const activeUrl = safeImages[active] || safeImages[0]

  return (
    <div className="single-pro-slider">
      <div className="single-product-cover">
        {activeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="img-responsive" src={activeUrl} alt={alt} />
        ) : (
          <div
            style={{
              width: "100%",
              height: 380,
              borderRadius: 12,
              background: "rgba(0,0,0,0.05)",
            }}
          />
        )}
      </div>

      {safeImages.length > 1 ? (
        <div className="single-nav-thumb" style={{ marginTop: 12 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {safeImages.map((url, idx) => (
              <button
                key={`${url}-${idx}`}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Select image ${idx + 1}`}
                style={{
                  border: idx === active ? "2px solid #000" : "1px solid #ddd",
                  padding: 2,
                  borderRadius: 10,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img-responsive"
                  src={url}
                  alt={alt}
                  style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }}
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}


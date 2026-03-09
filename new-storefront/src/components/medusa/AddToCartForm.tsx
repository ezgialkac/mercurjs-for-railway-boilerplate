"use client"

import { useMemo, useState } from "react"
import { addToCartAction } from "@/lib/medusa/actions/cart"
import type { StoreProductVariant } from "@/lib/medusa/products"
import { getVariantDisplayPrice } from "@/lib/medusa/pricing"

export default function AddToCartForm({
  variants,
}: {
  variants: StoreProductVariant[]
}) {
  const available = useMemo(
    () =>
      (variants || [])
        .filter(Boolean)
        .map((v) => ({
          id: v.id,
          title: v.title || v.sku || v.id,
          price: getVariantDisplayPrice(v),
        }))
        .filter((v) => Boolean(v.id)),
    [variants]
  )

  const [variantId, setVariantId] = useState(available[0]?.id || "")
  const [qty, setQty] = useState(1)

  const selected = available.find((v) => v.id === variantId)

  return (
    <form action={addToCartAction}>
      <div style={{ display: "grid", gap: 10 }}>
        {available.length > 1 ? (
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
              Variant
            </label>
            <select
              className="custom-select width-100"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
            >
              {available.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                  {v.price?.formatted ? ` — ${v.price.formatted}` : ""}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Quantity
          </label>
          <div className="qty-plus-minus">
            <div
              className="bb-qtybtn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{ margin: "0 0 0 10px" }}
            >
              -
            </div>
            <input
              readOnly
              className="qty-input location-select"
              type="text"
              name="qty_display"
              value={qty}
            />
            <div
              className="bb-qtybtn"
              onClick={() => setQty((q) => q + 1)}
              style={{ margin: "0 10px 0 0" }}
            >
              +
            </div>
          </div>
        </div>

        <input type="hidden" name="variant_id" value={variantId} />
        <input type="hidden" name="quantity" value={String(qty)} />

        <button type="submit" className="bb-btn-2" disabled={!variantId}>
          Add to cart{selected?.price?.formatted ? ` — ${selected.price.formatted}` : ""}
        </button>
      </div>
    </form>
  )
}


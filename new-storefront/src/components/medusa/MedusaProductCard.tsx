import Link from "next/link"
import { addToCartAction } from "@/lib/medusa/actions/cart"
import type { StoreProduct } from "@/lib/medusa/products"
import { getCheapestVariant, getVariantDisplayPrice } from "@/lib/medusa/pricing"

export default function MedusaProductCard({ product }: { product: StoreProduct }) {
  const handle = product.handle || product.id
  const cheapest = getCheapestVariant(product)
  const price = cheapest ? getVariantDisplayPrice(cheapest) : null

  return (
    <div className="bb-pro-box">
      <div className="bb-pro-img">
        <div className="inner-img">
          <Link href={`/product/${handle}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="main-img"
              src={product.thumbnail || "/assets/img/new-product/1.jpg"}
              alt={product.title}
            />
          </Link>
        </div>

        <ul className="bb-pro-actions">
          <li className="bb-btn-group">
            <form action={addToCartAction}>
              <input type="hidden" name="variant_id" value={cheapest?.id || ""} />
              <input type="hidden" name="quantity" value="1" />
              <button
                type="submit"
                title="Add To Cart"
                style={{
                  all: "unset",
                  cursor: cheapest?.id ? "pointer" : "not-allowed",
                }}
                aria-disabled={!cheapest?.id}
              >
                <i className="ri-shopping-bag-4-line"></i>
              </button>
            </form>
          </li>
        </ul>
      </div>

      <div className="bb-pro-contact">
        <h4 className="bb-pro-title">
          <Link href={`/product/${handle}`}>{product.title}</Link>
        </h4>

        <div className="bb-price">
          <div className="inner-price">
            <span className="new-price">{price?.formatted || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


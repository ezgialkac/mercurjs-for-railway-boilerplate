import { listProducts } from "@/lib/medusa/products"
import { retrieveCart } from "@/lib/medusa/cart"
import { addToCartAction } from "@/lib/medusa/actions/cart"

export const dynamic = "force-dynamic"

export default async function MedusaDemoPage() {
  const [{ products }, cart] = await Promise.all([
    listProducts({ limit: 12, page: 1 }),
    retrieveCart(),
  ])

  const itemCount =
    cart?.items?.reduce((acc, i) => acc + (i?.quantity || 0), 0) || 0

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Medusa connection demo
      </h1>
      <p style={{ marginBottom: 16 }}>
        This page fetches products from <code>/store/products</code> and adds
        real variants to a Medusa cart using server actions.
      </p>

      <div style={{ marginBottom: 16 }}>
        <strong>Cart:</strong>{" "}
        {cart ? (
          <>
            <code>{cart.id}</code> ({itemCount} items)
          </>
        ) : (
          "no cart yet"
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((p) => {
          const variant = p.variants?.[0]
          const canAdd = Boolean(variant?.id)

          return (
            <div
              key={p.id}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 12,
                padding: 12,
              }}
            >
              {p.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 160,
                    borderRadius: 10,
                    marginBottom: 10,
                    background: "rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(0,0,0,0.55)",
                    fontSize: 13,
                  }}
                >
                  no thumbnail
                </div>
              )}

              <div style={{ fontWeight: 600, marginBottom: 6 }}>{p.title}</div>

              <div style={{ fontSize: 12, marginBottom: 10, opacity: 0.75 }}>
                Variant:{" "}
                {variant ? (
                  <code>{variant.id}</code>
                ) : (
                  <span>none available</span>
                )}
              </div>

              <form action={addToCartAction}>
                <input type="hidden" name="variant_id" value={variant?.id} />
                <input type="hidden" name="quantity" value="1" />
                <button
                  type="submit"
                  disabled={!canAdd}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.2)",
                    background: canAdd ? "black" : "rgba(0,0,0,0.2)",
                    color: "white",
                    fontWeight: 600,
                    cursor: canAdd ? "pointer" : "not-allowed",
                  }}
                >
                  Add to cart
                </button>
              </form>
            </div>
          )
        })}
      </div>
    </main>
  )
}


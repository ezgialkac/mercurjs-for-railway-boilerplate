import "server-only"
import { listProducts } from "@/lib/medusa/products"
import MedusaProductCard from "./MedusaProductCard"

export default async function MedusaProductListing({
  page,
  q,
  limit,
}: {
  page: number
  q?: string
  limit?: number
}) {
  const { products, count, nextPage } = await listProducts({ page, q, limit })

  return (
    <section className="section-shop padding-b-50">
      <div className="container">
        <div className="bb-shop-pro-inner">
          <div className="row mb-minus-24">
            {products.map((p) => (
              <div key={p.id} className="col-lg-4 col-6 mb-24 bb-product-box">
                <MedusaProductCard product={p} />
              </div>
            ))}

            <div className="col-12">
              <div className="bb-pro-pagination" style={{ marginTop: 24 }}>
                <p>
                  Showing page {page}. Total items: {count}.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {page > 1 ? (
                    <a
                      className="bb-btn-2"
                      href={`?${new URLSearchParams({
                        ...(q ? { q } : {}),
                        page: String(page - 1),
                      }).toString()}`}
                    >
                      Prev
                    </a>
                  ) : null}

                  {nextPage ? (
                    <a
                      className="bb-btn-2"
                      href={`?${new URLSearchParams({
                        ...(q ? { q } : {}),
                        page: String(nextPage),
                      }).toString()}`}
                    >
                      Next
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


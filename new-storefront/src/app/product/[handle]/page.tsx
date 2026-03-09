import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import ProductImageGallery from "@/components/medusa/ProductImageGallery"
import AddToCartForm from "@/components/medusa/AddToCartForm"
import { retrieveProductByHandle } from "@/lib/medusa/products"
import { getCheapestVariant, getVariantDisplayPrice } from "@/lib/medusa/pricing"
import { notFound } from "next/navigation"
import { Row, Col } from "react-bootstrap"

export const dynamic = "force-dynamic"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await retrieveProductByHandle({ handle })
  if (!product) notFound()

  const images = [
    ...(product.images || []).filter(Boolean).map((i) => i!.url),
    ...(product.thumbnail ? [product.thumbnail] : []),
  ]

  const cheapest = getCheapestVariant(product)
  const cheapestPrice = cheapest ? getVariantDisplayPrice(cheapest) : null
  const variants = (product.variants || []).filter(Boolean)

  return (
    <>
      <Breadcrumb title={product.title} />
      <section className="section-product padding-tb-50">
        <div className="container">
          <Row className="row mb-minus-24">
            <Col sm={12} lg={5} className="col-12 mb-24">
              <ProductImageGallery images={images} alt={product.title} />
            </Col>
            <Col lg={7} className="col-12 mb-24">
              <div className="bb-single-pro-contact">
                <div className="bb-sub-title">
                  <h4>{product.title}</h4>
                </div>

                {product.description ? <p>{product.description}</p> : null}

                <div className="bb-single-price-wrap">
                  <div className="bb-single-price">
                    <div className="price">
                      <h5>{cheapestPrice?.formatted || "-"}</h5>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <AddToCartForm variants={variants as any} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}


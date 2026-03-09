import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
import ProductImageGallery from "@/components/medusa/ProductImageGallery"
import AddToCartForm from "@/components/medusa/AddToCartForm"
import RelatedSlider from "@/components/deal-slider/RelatedSlider"
import { Row, Col } from "react-bootstrap"
import { listProducts, retrieveProductByHandle } from "@/lib/medusa/products"
import { getCheapestVariant, getVariantDisplayPrice } from "@/lib/medusa/pricing"

const page = async ({ searchParams }) => {
  const handle = searchParams?.handle

  let product = handle
    ? await retrieveProductByHandle({ handle: String(handle) })
    : null

  if (!product) {
    const { products } = await listProducts({ limit: 1, page: 1 })
    product = products[0] || null
  }

  if (!product) {
    return (
      <>
        <Breadcrumb title={"Product Page"} />
        <section className="section-product padding-tb-50">
          <div className="container">
            <p>No products available.</p>
          </div>
        </section>
      </>
    )
  }

  const images = [
    ...(product.images || []).filter(Boolean).map((i) => i.url),
    ...(product.thumbnail ? [product.thumbnail] : []),
  ]

  const cheapest = getCheapestVariant(product)
  const cheapestPrice = cheapest ? getVariantDisplayPrice(cheapest) : null
  const variants = (product.variants || []).filter(Boolean)

  return (
    <>
      <Breadcrumb title={product.title || "Product Page"} />
      <section className="section-product padding-tb-50">
        <div className="container">
          <Row>
            <Col sm={12}>
              <div className="bb-single-pro">
                <Row>
                  <Col sm={12} lg={6} className="col-12 mb-24">
                    <ProductImageGallery images={images} alt={product.title} />
                  </Col>
                  <Col lg={6} className="col-12 mb-24">
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
                        <AddToCartForm variants={variants} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <RelatedSlider />
    </>
  )
}

export default page

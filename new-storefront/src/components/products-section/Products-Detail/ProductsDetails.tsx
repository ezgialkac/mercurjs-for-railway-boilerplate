import React, { useEffect, useState } from 'react'
import SingleProductSlider from './single-product-slider/SingleProductSlider'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ProductsDetails = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const controller = new AbortController();
        const handle = searchParams.get("handle");

        const load = async () => {
            try {
                const qs = handle ? `?handle=${encodeURIComponent(handle)}` : "";
                const res = await fetch(`/api/medusa-product${qs}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });
                if (!res.ok) return;
                const json = await res.json();
                setProduct(json.product || null);
            } catch {
                // ignore, fall back to template defaults
            }
        };

        load();

        return () => controller.abort();
    }, [searchParams]);

    const defaultOptions: { value: string }[] = [
        { value: "250g" }, { value: "500g" }, { value: "1kg" }, { value: "2kg" },
    ]

    const dynamicWeights: string[] =
        product?.variants
            ?.map((v: any) => v?.title)
            .filter((v: any) => !!v) || [];

    const options: { value: string }[] =
        dynamicWeights.length > 0
            ? dynamicWeights.map((v: string) => ({ value: v }))
            : defaultOptions;

    const title = product?.title || "Ground Nuts Oil Pack 52g";
    const description =
        product?.description ||
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas nihil laboriosam voluptatem ab consectetur dolorum id, soluta sunt at culpa commodi totam quod natus qui!";

    const price = product?.priceFormatted || "$923.00";
    const mrp = "$1,999.00";

    const sku = product?.sku || "WH12";
    const stock =
        typeof product?.inventory_quantity === "number"
            ? product.inventory_quantity > 0
                ? "In stock"
                : "Out of stock"
            : "In stock";

    const handleActiveTab = (index: any) => {
        setActiveIndex(index)
    }

    const handleIncrement = () => {
        setQuantity(prevQty => prevQty + 1);
      };
    
      const handleDecrement = () => {
        setQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
      };
    return (
        <>
            <div className="bb-single-pro">
                <Row>
                    <Col sm={12} lg={5} className="col-12 mb-24">
                        <SingleProductSlider />
                    </Col>
                    <Col lg={7} className="col-12 mb-24">
                        <div className="bb-single-pro-contact">
                            <div className="bb-sub-title">
                                <h4>{title}</h4>
                            </div>
                            <div className="bb-single-rating">
                                <span className="bb-pro-rating">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-star-line"></i>
                                </span>
                                <span className="bb-read-review">
                                    |&nbsp;&nbsp;<Link href="#bb-spt-nav-review">992 Ratings</Link>
                                </span>
                            </div>
                            <p>{description}</p>
                            <div className="bb-single-price-wrap">
                                <div className="bb-single-price">
                                    <div className="price">
                                        <h5>{price} <span>-78%</span></h5>
                                    </div>
                                    <div className="mrp">
                                        <p>M.R.P. : <span>{mrp}</span></p>
                                    </div>
                                </div>
                                <div className="bb-single-price">
                                    <div className="sku">
                                        <h5>SKU#: {sku}</h5>
                                    </div>
                                    <div className="stock">
                                        <span>{stock}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bb-single-list">
                                <ul>
                                    <li><span>Closure :</span> Hook & Loop</li>
                                    <li><span>Sole :</span> Polyvinyl Chloride</li>
                                    <li><span>Width :</span> Medium</li>
                                    <li><span>Outer Material :</span> A-Grade Standard Quality</li>
                                </ul>
                            </div>
                            <div className="bb-single-pro-weight">
                                <div className="pro-title">
                                    <h4>Weight</h4>
                                </div>
                                <div className="bb-pro-variation-contant">
                                    <ul>
                                        {options.map((data, index) => (
                                            <li key={index} onClick={() => handleActiveTab(index)} className={activeIndex === index ? "active-variation" : ""}>
                                                <span>{data.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="bb-single-qty">
                                <div className="qty-plus-minus">
                                    <div
                                    onClick={handleDecrement}
                                        className='bb-qtybtn'
                                        style={{ margin: " 0 0 0 10px" }}
                                    >
                                        -
                                    </div>
                                    <input
                                        readOnly
                                        className="qty-input location-select"
                                        type="text"
                                        name="gi-qtybtn"
                                        value={quantity}
                                    />
                                    <div onClick={handleIncrement} className='bb-qtybtn'
                                        style={{ margin: " 0 10px 0 0" }}
                                    >
                                        +
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Link href="/cart" className="bb-btn-2">View Cart</Link>
                                </div>
                                <ul className="bb-pro-actions">
                                    <li className="bb-btn-group">
                                        <a onClick={(e) => e.preventDefault()} href="#">
                                            <i className="ri-heart-line"></i>
                                        </a>
                                    </li>
                                    <li className="bb-btn-group">
                                        <a onClick={(e) => e.preventDefault()} href="#" data-link-action="quickview" title="Quick view" data-bs-toggle="modal"
                                            data-bs-target="#bry_quickview_modal">
                                            <i className="ri-eye-line"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProductsDetails

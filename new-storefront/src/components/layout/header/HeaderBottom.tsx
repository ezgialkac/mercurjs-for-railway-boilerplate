import CategoryPopup from '@/components/category-popup/CategoryPopup';
import banner from '@/utility/header/benner';
import blog from '@/utility/header/blog';
import classic from '@/utility/header/classic';
import column from '@/utility/header/columns';
import list from '@/utility/header/list';
import pages from '@/utility/header/pages';
import productpage from '@/utility/header/productpage';
import Link from 'next/link';
import React, { useState } from 'react'
import { Row } from 'react-bootstrap';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

const HeaderBottom = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>('Surat');
    const svgProps: React.SVGProps<SVGSVGElement> = {
        enableBackground: "new 0 0 512 512",
        xmlns: "http://www.w3.org/2000/svg",
    };

    const handleMenuClick = (info: any) => {
        setSelectedItem(`${info.key}`);
        setVisible(false);
    };

    const handleVisibleChange = (flag: boolean) => {
        setVisible(flag);
    };

    const openCategoryPopup = () => {
        setIsPopupOpen(true);
    };

    const closeCategoryPopup = () => {
        setIsPopupOpen(false);
    };

    const menu = (
        <Menu className='select-options bb-dropdown-location' style={{ display: "block", right: "-91px", top: "5px", borderRadius: "10px" }} onClick={handleMenuClick}>
            <MenuItem key="Surat">Surat</MenuItem>
            <MenuItem key="Delhi">Delhi</MenuItem>
            <MenuItem key="Rajkot">Rajkot</MenuItem>
            <MenuItem key="Udaipur">Udaipur</MenuItem>
        </Menu>
    );

    return (
        <>
            <div className="bb-main-menu-desk">
                <div className="container">
                    <Row>
                        <div className='col-12'>
                            <div className="bb-inner-menu-desk">
                                <Link onClick={openCategoryPopup} href="" className="bb-header-btn bb-sidebar-toggle bb-category-toggle">
                                    <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z" />
                                    </svg>
                                </Link>
                                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="ri-menu-2-line"></i>
                                </button>
                                <div className="bb-main-menu" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/">Home</Link>
                                        </li>
                                        <li className="nav-item bb-main-dropdown">
                                            <Link className="nav-link bb-dropdown-item" href="">Categories</Link>
                                            <ul className="mega-menu">
                                                <li>
                                                    <ul className="mega-block">
                                                        <li className="menu_title"><Link href="">Classic</Link></li>
                                                        {classic.map((data, index) => (
                                                            <li key={index}>
                                                                <Link href={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <ul className="mega-block">
                                                        <li className="menu_title"><Link href="">Banner</Link></li>
                                                        {banner.map((data, index) => (
                                                            <li key={index}>
                                                                <Link href={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <ul className="mega-block">
                                                        <li className="menu_title"><Link href="">Columns</Link></li>
                                                        {column.map((data, index) => (
                                                            <li key={index}>
                                                                <Link href={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <ul className="mega-block">
                                                        <li className="menu_title"><Link href="">List</Link></li>
                                                        {list.map((data, index) => (
                                                            <li key={index}>
                                                                <Link href={data.href}>{data.name}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="nav-item bb-dropdown">
                                            <Link onClick={(e) => e.preventDefault()} className="nav-link bb-dropdown-item" href="">Products</Link>
                                            <ul className="bb-dropdown-menu">
                                                {productpage.map((data, index) => (
                                                    <li key={index} className="bb-mega-dropdown">
                                                        <Link className="bb-mega-item" href="">{data.name}</Link>
                                                        <ul className="bb-mega-menu">
                                                            {data.subname.map((subPage, subIndex) => (
                                                                <React.Fragment key={subIndex}>
                                                                    <li>
                                                                        <Link href={subPage.href}>
                                                                            {subPage.name}
                                                                        </Link>
                                                                    </li>
                                                                </React.Fragment>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                                <li>
                                                    <Link href="/product-full-width">Product full width</Link>
                                                </li>
                                                <li>
                                                    <Link href="/product-accordion-full-width">accordion full width</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="nav-item bb-dropdown">
                                            <Link className="nav-link bb-dropdown-item" href="#">Pages</Link>
                                            <ul className="bb-dropdown-menu">
                                                {pages.map((data, index) => (
                                                    <li key={index}>
                                                        <Link href={data.href}>{data.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="nav-item bb-dropdown">
                                            <Link className="nav-link bb-dropdown-item" href="#">Blog</Link>
                                            <ul className="bb-dropdown-menu">
                                                {blog.map((data, index) => (
                                                    <li key={index}>
                                                        <Link href={data.href}>{data.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/offer">
                                                <svg  {...svgProps} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 64 64" >
                                                    <g>
                                                        <path
                                                            d="M10 16v22c0 .3.1.6.2.8.3.6 6.5 13.8 21 20h.2c.2 0 .3.1.5.1s.3 0 .5-.1h.2c14.5-6.2 20.8-19.4 21-20 .1-.3.2-.5.2-.8V16c0-.9-.6-1.7-1.5-1.9-7.6-1.9-19.3-9.6-19.4-9.7-.1-.1-.2-.1-.4-.2-.1 0-.1 0-.2-.1h-.9c-.1 0-.2.1-.3.1-.1.1-.2.1-.4.2s-11.8 7.8-19.4 9.7c-.7.2-1.3 1-1.3 1.9zm4 1.5c6.7-2.1 15-7.2 18-9.1 3 1.9 11.3 7 18 9.1v20c-1.1 2.1-6.7 12.1-18 17.3-11.3-5.2-16.9-15.2-18-17.3z"
                                                            fill="#000000" opacity="1" data-original="#000000" >
                                                        </path>
                                                        <path
                                                            d="M28.6 38.4c.4.4.9.6 1.4.6s1-.2 1.4-.6l9.9-9.9c.8-.8.8-2 0-2.8s-2-.8-2.8 0L30 34.2l-4.5-4.5c-.8-.8-2-.8-2.8 0s-.8 2 0 2.8z"
                                                            fill="#000000" opacity="1" data-original="#000000" >
                                                        </path>
                                                    </g>
                                                </svg> {" "} Offers
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bb-dropdown-menu">
                                    <div className="inner-select">

                                        <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M511.614214 958.708971c-21.76163 0-41.744753-9.781784-54.865586-26.862811L222.50156 626.526383c-3.540639-4.044106-5.872754-7.978718-7.349385-10.461259-41.72838-58.515718-63.959707-127.685078-63.959707-199.699228 0.87288-193.650465 162.903184-351.075891 361.209691-351.075891 198.726064 0 360.40435 157.49194 360.40435 351.075891-0.839111 72.190159-23.070438 140.856052-64.345494 199.053522-1.962701 3.288906-4.312212 7.189749-7.735171 11.098779L566.479799 931.847184c-13.120832 17.080004-33.103956 26.861788-54.865585 26.861787zM273.525654 580.51956a33.707706 33.707706 0 0 1 2.63399 3.037173L511.278569 890.00931 747.068783 583.556733c0.435928-0.569982 0.889253-1.124614 1.358951-1.669013l2.51631-4.102434c0.285502-0.453325 0.587378-0.89744 0.889253-1.325182 33.507138-46.921659 51.577702-102.416578 52.248991-160.487158 0-155.294902-130.839931-281.95565-291.679105-281.95565-160.571069 0-291.780413 126.72931-292.484448 282.501073 0 57.450457 17.802458 112.811322 51.460022 159.933549l2.90312 4.580318c0.418532 0.73678-0.186242 0.032746-0.756223-0.512676z m476.059439 0.100284v0z m0.066515-0.058329c-0.016373 0.016373-0.033769 0.025583-0.033769 0.041956 0.001023-0.016373 0.017396-0.025583 0.033769-0.041956z m0.051166-0.041955a0.227174 0.227174 0 0 0-0.050142 0.041955c0.016373-0.016373 0.032746-0.033769 0.050142-0.041955z"
                                                fill="#444444" />
                                            <path
                                                d="M512 577.206094c-90.000803 0-163.222455-73.221652-163.222455-163.222455s73.221652-163.222455 163.222455-163.222455S675.222455 323.982836 675.222455 413.983639s-73.222675 163.222455-163.222455 163.222455z m0-240.538355c-42.634006 0-77.3159 34.68087-77.3159 77.3159s34.68087 77.3159 77.3159 77.3159 77.3159-34.681894 77.3159-77.3159-34.681894-77.3159-77.3159-77.3159z"
                                                fill="#00D8A0" />
                                        </svg>
                                        <div>
                                            <Dropdown
                                                trigger={['click']}
                                                overlay={menu}
                                                animation="slide-up"
                                                onVisibleChange={handleVisibleChange}
                                                visible={visible}
                                            >
                                                <div className='location'>
                                                    <div className="custom-select location-select">{selectedItem}</div>
                                                    <div className='custom-select-arrow ' style={{position: "absolute", left: "105px", top : "0"}}><i style={{ fontSize: "30px" }} className="ri-arrow-drop-down-line"></i></div>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
            <CategoryPopup isPopupOpen={isPopupOpen} closeCategoryPopup={closeCategoryPopup} />
        </>
    )
}

export default HeaderBottom

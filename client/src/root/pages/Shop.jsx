import axios from "axios";
import { useEffect, useState } from "react";
import { useSearch } from "/src/context/SearchContext";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";

export const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productLatest, setProductLatest] = useState([]);

    const { valueSearch, searchCategory, sortPrice, getAllProducts, sortDate } =
        useSearch();

    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    const settingsTwoRow = {
        infinite: true,
        slidesToShow: 1,
        rows: 1,
        slidesPerRow: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    const handleCategory = (value) => {
        searchCategory(value);
    };

    const getProduct = async () => {
        await axios
            .get("http://localhost:3002/api/product", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getCategory = async () => {
        await axios
            .get("http://localhost:3002/api/category", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setCategories(response.data);
                console.log(categories);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const sortDateQuantity = async () => {
        await axios
            .get(
                `http://localhost:3002/api/product/search?new=true&quantity=true`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    accept: "application/json",
                }
            )
            .then(function (response) {
                console.log(response.data);
                const data = response.data;
                setProductLatest(data);
                console.log(productLatest);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    useEffect(() => {
        getCategory();
        getProduct();
        sortDateQuantity();
    }, []);

    return (
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-5">
                        <div className="sidebar">
                            <div className="sidebar__item">
                                <h4>Danh Mục</h4>
                                <ul>
                                    {categories?.map((category, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    handleCategory(
                                                        category.name
                                                    );
                                                }}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="sidebar__item">
                                <h4>Price</h4>
                                <div className="price-range-wrap">
                                    <div
                                        className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                        data-min="10"
                                        data-max="540"
                                    >
                                        <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                                        <span
                                            tabIndex="0"
                                            className="ui-slider-handle ui-corner-all ui-state-default"
                                        ></span>
                                        <span
                                            tabIndex="0"
                                            className="ui-slider-handle ui-corner-all ui-state-default"
                                        ></span>
                                    </div>
                                    <div className="range-slider">
                                        <div className="price-input">
                                            <input
                                                type="text"
                                                id="minamount"
                                                value={0}
                                            />
                                            <input
                                                type="text"
                                                id="maxamount"
                                                value={0}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar__item">
                                <div className="latest-product__text">
                                    <h4>Sản Phẩm Mới</h4>
                                    <Slider
                                        className="latest-product__slider owl-carousel"
                                        {...settingsTwoRow}
                                    >
                                        <div className="latest-prdouct__slider__item">
                                            {productLatest?.map(
                                                (product, index) => (
                                                    <a
                                                        key={index}
                                                        href="#"
                                                        className="latest-product__item"
                                                    >
                                                        <div className="latest-product__item__pic">
                                                            <img
                                                                src={`http://localhost:3002/assets/${product.image}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="latest-product__item__text">
                                                            <h6>
                                                                {product.name}
                                                            </h6>
                                                            <span>
                                                                {new Intl.NumberFormat(
                                                                    "de-DE"
                                                                ).format(
                                                                    product.price
                                                                )}
                                                                đ
                                                            </span>
                                                        </div>
                                                    </a>
                                                )
                                            )}
                                        </div>
                                        <div className="latest-prdouct__slider__item">
                                            {productLatest?.map(
                                                (product, index) => (
                                                    <a
                                                        key={index}
                                                        href="#"
                                                        className="latest-product__item"
                                                    >
                                                        <div className="latest-product__item__pic">
                                                            <img
                                                                src={`http://localhost:3002/assets/${product.image}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="latest-product__item__text">
                                                            <h6>
                                                                {product.name}
                                                            </h6>
                                                            <span>
                                                                {new Intl.NumberFormat(
                                                                    "de-DE"
                                                                ).format(
                                                                    product.price
                                                                )}
                                                                đ
                                                            </span>
                                                        </div>
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-7">
                        <div className="product__discount">
                            <div className="section-title product__discount__title">
                                <h2>Sale Off</h2>
                            </div>
                            <div className="row">
                                <Slider
                                    className="product__discount__slider owl-carousel"
                                    {...settings}
                                >
                                    {products?.map((product, index) => {
                                        if (product.promotion !== 0) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="col-lg-4"
                                                >
                                                    <div className="product__discount__item">
                                                        <div className="product__discount__item__pic set-bg">
                                                            <img
                                                                src={`http://localhost:3002/assets/${product.image}`}
                                                                className="product__discount__item__pic set-bg"
                                                            />
                                                            <div className="product__discount__percent">
                                                                -
                                                                {
                                                                    product.promotion
                                                                }
                                                                %
                                                            </div>
                                                            <ul className="product__item__pic__hover">
                                                                <li>
                                                                    <a href="#">
                                                                        <i className="fa fa-shopping-cart"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="product__discount__item__text">
                                                            <span>
                                                                {
                                                                    product.categoryId
                                                                }
                                                            </span>
                                                            <h5>
                                                                <NavLink
                                                                    to={`/shop-details/${product._id}`}
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </NavLink>
                                                            </h5>
                                                            <div className="product__item__price">
                                                                {new Intl.NumberFormat(
                                                                    "de-DE"
                                                                ).format(
                                                                    product.price -
                                                                        (product.price /
                                                                            100) *
                                                                            product.promotion
                                                                )}
                                                                đ{" "}
                                                                <span>
                                                                    {new Intl.NumberFormat(
                                                                        "de-DE"
                                                                    ).format(
                                                                        product.price
                                                                    )}
                                                                    đ
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </Slider>
                            </div>
                        </div>
                        <div className="filter__item">
                            <div className="row">
                                <div className="col-lg-4 col-md-5">
                                    <div className="filter__sort">
                                        <span>Giá</span>
                                        <select
                                            onClick={(e) => {
                                                const value = e.target.value;
                                                if (value === "default") {
                                                    getAllProducts();
                                                } else {
                                                    sortPrice(value);
                                                }
                                            }}
                                        >
                                            <option value="default">
                                                Default
                                            </option>
                                            <option value="inc">
                                                Tăng Dần
                                            </option>
                                            <option value="dec">
                                                Giảm dần
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="filter__found">
                                        <h6>
                                            <span>{valueSearch?.length}</span>{" "}
                                            Products found
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="filter__sort">
                                        <button
                                            onClick={() => {
                                                sortDate();
                                            }}
                                        >
                                            Mới Nhất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {valueSearch?.map((product, index) => {
                                if (product.promotion !== 0) {
                                    return (
                                        <div
                                            key={index}
                                            className="col-lg-4 col-md-6 col-sm-6"
                                        >
                                            <div className="product__discount__item">
                                                <div className="product__discount__item__pic set-bg">
                                                    <img
                                                        src={`http://localhost:3002/assets/${product.image}`}
                                                        className="product__discount__item__pic set-bg"
                                                    />
                                                    <div className="product__discount__percent">
                                                        -{product.promotion}%
                                                    </div>
                                                    <ul className="product__item__pic__hover">
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-shopping-cart"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="product__discount__item__text">
                                                    <h5>
                                                        <NavLink
                                                            to={`/shop-details/${product._id}`}
                                                        >
                                                            {product.name}
                                                        </NavLink>
                                                    </h5>
                                                    <div className="product__item__price">
                                                        {new Intl.NumberFormat(
                                                            "de-DE"
                                                        ).format(
                                                            product.price -
                                                                (product.price /
                                                                    100) *
                                                                    product.promotion
                                                        )}
                                                        đ{" "}
                                                        <span>
                                                            {new Intl.NumberFormat(
                                                                "de-DE"
                                                            ).format(
                                                                product.price
                                                            )}
                                                            đ
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className="col-lg-4 col-md-6 col-sm-6"
                                        >
                                            <div className="product__item">
                                                <div
                                                    className="product__item__pic set-bg"
                                                    data-setbg="img/product/product-1.jpg"
                                                >
                                                    <img
                                                        src={`http://localhost:3002/assets/${product.image}`}
                                                    />
                                                    <ul className="product__item__pic__hover">
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-shopping-cart"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="product__item__text">
                                                    <h6>
                                                        <NavLink
                                                            to={`/shop-details/${product._id}`}
                                                        >
                                                            {product.name}
                                                        </NavLink>
                                                    </h6>
                                                    <h5>
                                                        {new Intl.NumberFormat(
                                                            "de-DE"
                                                        ).format(product.price)}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div className="product__pagination">
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#">
                                <i className="fa fa-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

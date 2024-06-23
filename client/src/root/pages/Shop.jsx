import axios from "axios";
import { useEffect, useState } from "react";
import { useSearch } from "/src/context/SearchContext";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { Pagination } from "@mui/material";

export const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productLatest, setProductLatest] = useState([]);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(9);

    const {
        valueSearch,
        searchCategory,
        filterPrice,
        sortPrice,
        getAllProducts,
        sortDate,
    } = useSearch();

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

    const getListProducts = async () => {
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
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentProducts = valueSearch.slice(
        indexOfFirstCard,
        indexOfLastCard
    );

    // Change page
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // console.log(cardsPerPage, movieCard.length, paginate);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getCategory();
        getListProducts();
        sortDateQuantity();
    }, [valueSearch]);

    return (
        <>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Shop</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
                                    <h4>Giá</h4>
                                    <div className="price-range-wrap">
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="Từ đ"
                                                    onChange={(e) => {
                                                        e.target.value =
                                                            e.target.value
                                                                .replace(
                                                                    /\b0+/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /[^0-9.]/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /(\..*?)\..*/g,
                                                                    "$1"
                                                                );
                                                        // .replace(
                                                        //     /([0-9]{0,6}(\.[0-9]{0,2})?).*/g,
                                                        //     "$1"
                                                        // );

                                                        setMinPrice(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <span>-</span>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="Đến đ"
                                                    onChange={(e) => {
                                                        e.target.value =
                                                            e.target.value
                                                                .replace(
                                                                    /\b0+/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /[^0-9.]/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /(\..*?)\..*/g,
                                                                    "$1"
                                                                );
                                                        // .replace(
                                                        //     /([0-9]{0,6}(\.[0-9]{0,2})?).*/g,
                                                        //     "$1"
                                                        // );
                                                        setMaxPrice(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <button
                                                onClick={() =>
                                                    filterPrice(
                                                        minPrice,
                                                        maxPrice
                                                    )
                                                }
                                                className="btn btn-sm btn-primary"
                                            >
                                                Áp Dụng
                                            </button>
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
                                                        <NavLink
                                                            to={`/shop-details/${product._id}`}
                                                            key={index}
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
                                                                    {
                                                                        product.name
                                                                    }
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
                                                        </NavLink>
                                                    )
                                                )}
                                            </div>
                                            <div className="latest-prdouct__slider__item">
                                                {productLatest?.map(
                                                    (product, index) => (
                                                        <NavLink
                                                            to={`/shop-details/${product._id}`}
                                                            key={index}
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
                                                                    {
                                                                        product.name
                                                                    }
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
                                                        </NavLink>
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
                                    <h2>Khuyến Mãi</h2>
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
                                                                        <NavLink
                                                                            to={`/shop-details/${product._id}`}
                                                                        >
                                                                            <i className="fa fa-shopping-cart"></i>
                                                                        </NavLink>
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
                                                    const value =
                                                        e.target.value;
                                                    if (value === "default") {
                                                        getAllProducts();
                                                    } else if (
                                                        value === "select"
                                                    ) {
                                                        return;
                                                    } else {
                                                        sortPrice(value);
                                                    }
                                                }}
                                            >
                                                <option value="select">
                                                    Select
                                                </option>
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
                                                Tìm thấy{" "}
                                                <span>
                                                    {valueSearch?.length}
                                                </span>
                                                sản phẩm
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
                                {currentProducts?.map((product, index) => {
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
                                                            -{product.promotion}
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
                                                                <NavLink
                                                                    to={`/shop-details/${product._id}`}
                                                                >
                                                                    <i className="fa fa-shopping-cart"></i>
                                                                </NavLink>
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
                                                            ).format(
                                                                product.price
                                                            )}
                                                            đ
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <Pagination
                                count={(valueSearch.length / 9 + 0.4).toFixed()}
                                page={currentPage}
                                onChange={handleChange}
                            />
                            {/* <div className="product__pagination">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">
                                    <i className="fa fa-long-arrow-right"></i>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

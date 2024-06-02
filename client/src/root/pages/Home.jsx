import axios from "axios";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [listProducts, setListProducts] = useState([]);

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
                setListProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    useEffect(() => {
        getListProducts();
    }, []);
    const option = {
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        animateOut: "slideOutUp",
        nav: false,
        dots: false,
        margin: 0,
        responsive: {
            1100: {
                items: 4,
            },
            724: {
                items: 1,
            },
            500: {
                items: 1,
            },
            370: {
                items: 1,
                innerWidth: "100%",
                outerWidth: "100%",
            },
        },
    };

    const option2 = {
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            1100: {
                items: 1,
            },
            724: {
                items: 1,
            },
            500: {
                items: 1,
            },
            370: {
                items: 1,
                innerWidth: "100%",
                outerWidth: "100%",
            },
        },
    };
    return (
        <div>
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <OwlCarousel
                            className="categories__slider owl-carousel owl-theme"
                            {...option}
                        >
                            <div className="col-lg-3">
                                <div
                                    className="categories__item set-bg item"
                                    data-setbg="../../public/assets/side-bg.jpeg"
                                >
                                    <img src="../../../public/assets/img/categories/cat-1.jpg"></img>
                                    <h5>
                                        <a href="#">Fresh Fruit</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div
                                    className="categories__item set-bg"
                                    data-setbg="./img/categories/cat-2.jpg"
                                >
                                    <img src="../../../public/assets/img/categories/cat-1.jpg"></img>
                                    <h5>
                                        <a href="#">Dried Fruit</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div
                                    className="categories__item set-bg"
                                    data-setbg="./img/categories/cat-3.jpg"
                                >
                                    <img src="../../../public/assets/img/categories/cat-1.jpg"></img>
                                    <h5>
                                        <a href="#">Vegetables</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div
                                    className="categories__item set-bg"
                                    data-setbg="./img/categories/cat-4.jpg"
                                >
                                    <img src="../../../public/assets/img/categories/cat-1.jpg"></img>
                                    <h5>
                                        <a href="#">drink fruits</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div
                                    className="categories__item set-bg"
                                    data-setbg="./img/categories/cat-5.jpg"
                                >
                                    <img src="../../../public/assets/img/categories/cat-1.jpg"></img>
                                    <h5>
                                        <a href="#">drink fruits</a>
                                    </h5>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </section>

            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Featured Product</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    <li className="active" data-filter="*">
                                        All
                                    </li>
                                    <li data-filter=".oranges">Oranges</li>
                                    <li data-filter=".fresh-meat">
                                        Fresh Meat
                                    </li>
                                    <li data-filter=".vegetables">
                                        Vegetables
                                    </li>
                                    <li data-filter=".fastfood">Fastfood</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {listProducts.map((product, index) => (
                            <div
                                key={index}
                                className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                            >
                                <div className="featured__item">
                                    <div className="featured__item__pic set-bg">
                                        <img
                                            src={`http://localhost:3002/assets/${product.image}`}
                                        />
                                        <ul className="featured__item__pic__hover">
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-heart"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-retweet"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-shopping-cart"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <h6>
                                            <NavLink
                                                to={`/shop-details/${product._id}`}
                                            >
                                                {product.name}
                                            </NavLink>
                                        </h6>
                                        <h5>{product.price}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-2.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-3.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood oranges">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-4.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-5.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fastfood">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-6.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-7.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood vegetables">
                            <div className="featured__item">
                                <div
                                    className="featured__item__pic set-bg"
                                    data-setbg="img/featured/feature-8.jpg"
                                >
                                    <ul className="featured__item__pic__hover">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-heart"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-retweet"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6>
                                        <a href="#">Crab Pool Security</a>
                                    </h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img
                                    src="../../../public/assets/img/banner/banner-1.jpg"
                                    alt=""
                                ></img>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img
                                    src="../../../public/assets/img/banner/banner-2.jpg"
                                    alt=""
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="latest-product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="latest-product__text">
                                <h4>Latest Products</h4>

                                <OwlCarousel
                                    className="latest-product__slider"
                                    {...option2}
                                >
                                    <div className="latest-prdouct__slider__item">
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-1.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$40.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$50.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-3.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$60.00</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="latest-prdouct__slider__item">
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-1.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-3.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="latest-product__text">
                                <h4>Top Rated Products</h4>
                                <OwlCarousel
                                    className="latest-product__slider owl-carousel"
                                    {...option2}
                                >
                                    <div className="latest-prdouct__slider__item">
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-1.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-3.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="latest-prdouct__slider__item">
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-1.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-3.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="latest-product__text">
                                <h4>Review Products</h4>
                                <OwlCarousel
                                    className="latest-product__slider owl-carousel"
                                    {...option2}
                                >
                                    <div className="latest-prdouct__slider__item">
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-1.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-3.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="latest-prdouct__slider__item">
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-1.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="latest-product__item"
                                        >
                                            <div className="latest-product__item__pic">
                                                <img
                                                    src="../../../public/assets/img/latest-product/lp-3.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="latest-product__item__text">
                                                <h6>Crab Pool Security</h6>
                                                <span>$30.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="from-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title from-blog__title">
                                <h2>From The Blog</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img
                                        src="../../../public/assets/img/blog/blog-1.jpg"
                                        alt=""
                                    ></img>
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o"></i>{" "}
                                            May 4,2019
                                        </li>
                                        <li>
                                            <i className="fa fa-comment-o"></i>{" "}
                                            5
                                        </li>
                                    </ul>
                                    <h5>
                                        <a href="#">
                                            Cooking tips make cooking simple
                                        </a>
                                    </h5>
                                    <p>
                                        Sed quia non numquam modi tempora indunt
                                        ut labore et dolore magnam aliquam
                                        quaerat{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img
                                        src="../../../public/assets/img/blog/blog-2.jpg"
                                        alt=""
                                    ></img>
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o"></i>{" "}
                                            May 4,2019
                                        </li>
                                        <li>
                                            <i className="fa fa-comment-o"></i>{" "}
                                            5
                                        </li>
                                    </ul>
                                    <h5>
                                        <a href="#">
                                            6 ways to prepare breakfast for 30
                                        </a>
                                    </h5>
                                    <p>
                                        Sed quia non numquam modi tempora indunt
                                        ut labore et dolore magnam aliquam
                                        quaerat{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div className="blog__item__pic">
                                    <img
                                        src="../../../public/assets/img/blog/blog-3.jpg"
                                        alt=""
                                    ></img>
                                </div>
                                <div className="blog__item__text">
                                    <ul>
                                        <li>
                                            <i className="fa fa-calendar-o"></i>{" "}
                                            May 4,2019
                                        </li>
                                        <li>
                                            <i className="fa fa-comment-o"></i>{" "}
                                            5
                                        </li>
                                    </ul>
                                    <h5>
                                        <a href="#">
                                            Visit the clean farm in the US
                                        </a>
                                    </h5>
                                    <p>
                                        Sed quia non numquam modi tempora indunt
                                        ut labore et dolore magnam aliquam
                                        quaerat{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

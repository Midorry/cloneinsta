import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

const Home = () => {
    const [listProducts, setListProducts] = useState([]);
    const [listProductsFilter, setListProductsFilter] = useState([]);
    const [categories, setCategories] = useState([]);
    const [news, setNews] = useState();
    const [selectedFilters, setSelectedFilters] = useState("Cá");

    const Loading = () => (
        <div className="post loading">
            <h5>Loading...</h5>
        </div>
    );

    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    const getNewsFilter = async () => {
        await axios
            .get("http://localhost:3002/api/news/filter?new=true&filter=true", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                console.log(response.data[0].createdAt);
                setNews(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
        // forceUpdate();
    };

    const getCategories = async () => {
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
                const data = response.data;
                // setListProductsFilter(response.data);
                searchCategory(selectedFilters);
                setListProducts(data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const searchCategory = async (value) => {
        await axios
            .get(`http://localhost:3002/api/product/search?category=${value}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setListProductsFilter(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const handleFilterButtonClick = (selectedCategory) => {
        setSelectedFilters(selectedCategory);
        searchCategory(selectedCategory);
        // if (selectedFilters.includes(selectedCategory)) {
        //   let filters = selectedFilters.filter((el) => el !== selectedCategory);
        //   setSelectedFilters(filters);
        // }
        // else {
        //   setSelectedFilters([...selectedFilters, selectedCategory]);
        // }
    };

    useEffect(() => {
        getListProducts();
        getCategories();
        getNewsFilter();
    }, []);

    return (
        <div>
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <Slider
                            className="categories__slider owl-carousel owl-theme"
                            {...settings}
                        >
                            {listProducts?.map((product, index) => (
                                <div key={index} className="col-lg-3">
                                    <div className="categories__item set-bg item">
                                        <img
                                            src={`http://localhost:3002/assets/${product.image}`}
                                        ></img>
                                        <h5>
                                            <a href="#">{product.categoryId}</a>
                                        </h5>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Sản Phẩm Nổi Bật</h2>
                            </div>
                            <div className="featured__controls">
                                <ul>
                                    {categories?.map((category, index) => (
                                        <li
                                            key={index}
                                            className={
                                                selectedFilters ===
                                                `${category.name}`
                                                    ? `active`
                                                    : ""
                                            }
                                            onClick={() =>
                                                handleFilterButtonClick(
                                                    category.name
                                                )
                                            }
                                        >
                                            {category.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {listProductsFilter?.map((product, index) => {
                            if (product.promotion !== 0) {
                                return (
                                    <LazyLoad
                                        placeholder={<Loading />}
                                        key={index}
                                        className={`col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat ${product.categoryId}`}
                                    >
                                        <div className="featured__item">
                                            <div className="featured__item__pic set-bg">
                                                <img
                                                    src={`http://localhost:3002/assets/${product.image}`}
                                                />
                                                <div className="featured__item__discount__percent">
                                                    -{product.promotion}%
                                                </div>
                                                <ul className="featured__item__pic__hover">
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
                                                <div className="featured__item__price">
                                                    {new Intl.NumberFormat(
                                                        "de-DE"
                                                    ).format(product.price)}
                                                    đ
                                                    <span>
                                                        {new Intl.NumberFormat(
                                                            "de-DE"
                                                        ).format(product.price)}
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </LazyLoad>
                                );
                            }
                            {
                                /* else {
                                return (
                                    <div
                                        key={index}
                                        className={`col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat ${product.categoryId}`}
                                    >
                                        <div className="featured__item">
                                            <div className="featured__item__pic set-bg">
                                                <img
                                                    src={`http://localhost:3002/assets/${product.image}`}
                                                />
                                                <ul className="featured__item__pic__hover">
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
                                                <h5>
                                                    {new Intl.NumberFormat(
                                                        "de-DE"
                                                    ).format(product.price)}
                                                    đ
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } */
                            }
                        })}
                    </div>
                </div>
            </section>

            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img
                                    src="../../../public/assets/img/8250928.jpg"
                                    alt=""
                                ></img>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img
                                    src="../../../public/assets/img/43549873.jpg"
                                    alt=""
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="from-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title from-blog__title">
                                <h2>Tin Tức Mới</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {news?.map((n, index) => (
                            <div
                                key={index}
                                className="col-lg-4 col-md-4 col-sm-6"
                            >
                                <div className="blog__item">
                                    <div className="blog__item__pic">
                                        <img
                                            src={`http://localhost:3002/assets/${n?.image}`}
                                            alt=""
                                        ></img>
                                    </div>
                                    <div className="blog__item__text">
                                        <ul>
                                            <li>
                                                <i className="fa fa-calendar-o"></i>{" "}
                                                {new Date(
                                                    n.createdAt
                                                ).toDateString()}
                                            </li>
                                        </ul>
                                        <h5>
                                            <NavLink
                                                className="blog__title"
                                                to={`/news-detail/${n._id}`}
                                            >
                                                {n.title}
                                            </NavLink>
                                        </h5>
                                        <p className="blog__desc">{n.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

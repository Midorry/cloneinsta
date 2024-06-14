import axios from "axios";
import $ from "jquery";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import ProfileMenu from "./ProfileMenu";
const Header = () => {
    const [cartItems, setCartItems] = useState();
    const [categories, setCategories] = useState([]);
    const [inputs, setInputs] = useState("");
    const [view, setView] = useState(false);
    // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    let total = 0;

    const navigate = useNavigate();

    const { isAuthenticated, userData } = useAuth();
    const { cart, cartId } = useCart();
    const { searchInput } = useSearch();

    console.log(userData);

    let location = useLocation();
    let classHero = "";
    if (location.pathname === "/home") {
        classHero = "hero";
    } else {
        // eslint-disable-next-line no-unused-vars
        classHero = "hero hero-normal";
    }
    const handleOnClick = () => {
        $(".hero__categories ul").slideToggle(400);
    };

    const handleOnChange = (value) => {
        setInputs(value);
        // searchInput(value);
    };

    const handleSearch = (value) => {
        searchInput(value);
        if (location.pathname !== "/shop") {
            navigate("/shop");
        }
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

    const getCart = async () => {
        await axios
            .get(`http://localhost:3002/api/cart/find/${cartId}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setCartItems(response.data.products);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
        // forceUpdate();
    };

    cartItems?.map((product) => {
        total = total + product.quantity * product.price;
    });

    useEffect(() => {
        getCart();
        getCategories();
    }, []);
    return (
        <div>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li>
                                            <i className="fa fa-envelope"></i>{" "}
                                            hello@colorlib.com
                                        </li>
                                        <li>
                                            Free Shipping for all Order of $99
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-pinterest-p"></i>
                                        </a>
                                    </div>
                                    <div
                                        onClick={() => setView(!view)}
                                        className="header__top__right__auth"
                                    >
                                        {isAuthenticated ? (
                                            <img
                                                src={`http://localhost:3002/assets/${userData?.picturePath}`}
                                                className="header__top__right__avatar"
                                            ></img>
                                        ) : (
                                            <i className="fa fa-user"></i>
                                        )}
                                    </div>
                                    {view ? <ProfileMenu></ProfileMenu> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <a href="./index.html">
                                    <img src="img/logo.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li>
                                        <NavLink to="/home">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/shop">Shop</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/">Pages</NavLink>
                                        <ul className="header__menu__dropdown">
                                            <li>
                                                <NavLink to="./shop-details">
                                                    Shop Details
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/shopping-cart">
                                                    Shoping Cart
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/checkout">
                                                    Check Out
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/blog-details.html">
                                                    Blog Details
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <NavLink to="/news">Blog</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="./contact.html">
                                            Contact
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    <li>
                                        <NavLink
                                            to={
                                                isAuthenticated
                                                    ? "/shopping-cart"
                                                    : "/"
                                            }
                                        >
                                            <i className="fa fa-shopping-bag"></i>{" "}
                                            <span>{cart.products?.length}</span>
                                        </NavLink>
                                    </li>
                                </ul>
                                <div className="header__cart__price">
                                    item:{" "}
                                    <span>
                                        {new Intl.NumberFormat("de-DE").format(
                                            total
                                        )}
                                        đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>

            <section className={`${classHero}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div
                                    className="hero__categories__all"
                                    onClick={handleOnClick}
                                >
                                    <i className="fa fa-bars"></i>
                                    <span>Danh Mục</span>
                                </div>
                                <ul>
                                    {categories?.map((category, index) => (
                                        <li key={index}>
                                            <a href="#">{category.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <input
                                        type="text"
                                        placeholder="What do yo u need?"
                                        value={inputs}
                                        onChange={(e) =>
                                            handleOnChange(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => handleSearch(inputs)}
                                        className="site-btn"
                                    >
                                        SEARCH
                                    </button>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>support 24/7 time</span>
                                    </div>
                                </div>
                            </div>
                            {location.pathname === "/home" ? (
                                <div className="hero__item set-bg">
                                    <img src="../../../public/assets/img/28143798.jpg"></img>
                                    <div className="hero__text">
                                        <span>FRESH & TASTY</span>
                                        <h2>
                                            Sea Food <br />
                                            100% Fresh
                                        </h2>
                                        <a href="#" className="primary-btn">
                                            SHOP NOW
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                            {/* <div
                                className="hero__item set-bg"
                                style={{
                                    backgroundImage: `url(../../../public/assets/img/hero/banner.jpg")`,
                                }}
                                data-setbg="../../../public/assets/img/hero/banner.jpg"
                            >
                                <img
                                    style={{
                                        position: "absolute",
                                        content: "",
                                        right: 0,
                                    }}
                                    src="../../../public/assets/img/hero/banner.jpg"
                                ></img>
                                <div className="hero__text">
                                    <span>FRUIT FRESH</span>
                                    <h2>
                                        Vegetable <br />
                                        100% Organic
                                    </h2>
                                    <p>Free Pickup and Delivery Available</p>
                                    <a href="#" className="primary-btn">
                                        SHOP NOW
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;

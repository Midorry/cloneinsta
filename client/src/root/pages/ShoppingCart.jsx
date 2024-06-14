import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "/src/context/CartContext";
import { NavLink } from "react-router-dom";

export const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState();
    const [categories, setCategories] = useState([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    let total = 0;

    const notify = () => toast("Delete Product Success!");

    const { cart, cartId, setCart, setHaveCart } = useCart();
    const removeCart = async (cartProductId) => {
        let listProduct = [...cart.products];

        console.log(listProduct);
        console.log([...cart.products]);
        console.log(cartProductId);
        listProduct.map((product, index) => {
            if (product._id === cartProductId) {
                console.log(index);

                console.log(listProduct);
                listProduct.splice(index, 1);
                console.log(listProduct);
            }
        });
        await axios
            .put(
                `http://localhost:3002/api/cart/${cartId}`,
                {
                    userId: cart.userId,
                    products: [
                        ...listProduct,
                        // {
                        //     productId: product._id,
                        //     promotion: product.promotion,
                        //     price: product.price,
                        //     quantity: value,
                        // },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                const userId = response.data.userId;
                const products = response.data.products;
                localStorage.setItem(
                    "user_cart",
                    JSON.stringify({
                        userId: userId,
                        products: products,
                        cartId: cartId,
                    })
                );
                console.log(response);
                setCart((prev) => ({ ...prev, products }));
                setHaveCart(true);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
        forceUpdate();
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

    const getCart = async () => {
        await axios
            .get("http://localhost:3002/api/cart/", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data[0]);
                setCartItems(response.data[0].products);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    cartItems?.map((product) => {
        total = total + product.quantity * product.price;
    });

    useEffect(() => {
        getCart();
        getCategory();
    }, [ignored]);

    return (
        <div>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Shop Cart</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">
                                                Products
                                            </th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems?.map((product, index) => (
                                            <tr key={index}>
                                                <td className="shoping__cart__item">
                                                    <img
                                                        src={`http://localhost:3002/assets/${product.productImage}`}
                                                        alt=""
                                                    />
                                                    <h5>
                                                        {product.productName}
                                                    </h5>
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {new Intl.NumberFormat(
                                                        "de-DE"
                                                    ).format(product.price)}
                                                    đ
                                                </td>
                                                <td className="shoping__cart__quantity">
                                                    <div className="quantity">
                                                        {product.quantity}
                                                    </div>
                                                </td>
                                                {/* <td className="shoping__cart__quantity">
                                                    <div className="quantity">
                                                        <div className="pro-qty">
                                                            <span
                                                                className="dec qtybtn1"
                                                                onClick={() => {
                                                                    product.quantity -= 1;
                                                                }}
                                                            >
                                                                -
                                                            </span>
                                                            <input
                                                                className="value1"
                                                                type="input"
                                                                value={
                                                                    product.quantity
                                                                }
                                                            />
                                                            <span
                                                                className="inc qtybtn1"
                                                                onClick={() => {
                                                                    product.quantity += 1;
                                                                }}
                                                            >
                                                                +
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td> */}
                                                <td className="shoping__cart__total">
                                                    {new Intl.NumberFormat(
                                                        "de-DE"
                                                    ).format(
                                                        product.quantity *
                                                            product.price
                                                    )}
                                                    đ
                                                </td>
                                                <td className="shoping__cart__item__close">
                                                    <button
                                                        onClick={() => {
                                                            removeCart(
                                                                product._id
                                                            );
                                                            notify();
                                                        }}
                                                        className="icon_close"
                                                    ></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <NavLink
                                    to="/shop"
                                    className="primary-btn cart-btn"
                                >
                                    CONTINUE SHOPPING
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>
                                    <li>
                                        Total{" "}
                                        <span>
                                            {new Intl.NumberFormat(
                                                "de-DE"
                                            ).format(total)}
                                            đ
                                        </span>
                                    </li>
                                </ul>
                                <NavLink to="/checkout" className="primary-btn">
                                    PROCEED TO CHECKOUT
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            ></ToastContainer>
        </div>
    );
};

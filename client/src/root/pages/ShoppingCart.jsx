import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "/src/context/CartContext";
import { NavLink } from "react-router-dom";

export const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState();
    // const [product, setProduct] = useState();
    const [categories, setCategories] = useState([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    let currentQuantity = 0;

    const { products, cartId } = JSON.parse(localStorage.getItem("user_cart"));
    let total = 0;

    const notify = () => toast("Xóa sản phẩm thành công!");

    const { cart, setCart, setHaveCart } = useCart();

    const getProduct = async (id, quantity) => {
        await axios
            .get(`http://localhost:3002/api/product/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                currentQuantity = response.data.quantity;
                updateProduct(id, currentQuantity, quantity);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const updateProduct = async (id, curQuantity, quantity) => {
        // getProduct(id);
        console.log(quantity);
        await axios
            .put(`http://localhost:3002/api/product/update/${id}`, {
                quantity: curQuantity + quantity,
            })
            .then((response) => {
                console.log(response.data.quantity);
            });
    };

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
                    products: [...listProduct],
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
        console.log(cartId);
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
                                                Sản phẩm
                                            </th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Tổng</th>
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
                                                            getProduct(
                                                                product.productId,
                                                                product.quantity
                                                            );
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
                                    TIẾP TỤC MUA SẮM
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__checkout">
                                <h5>Tổng giỏ hàng</h5>
                                <ul>
                                    <li>
                                        Tổng{" "}
                                        <span>
                                            {new Intl.NumberFormat(
                                                "de-DE"
                                            ).format(total)}
                                            đ
                                        </span>
                                    </li>
                                </ul>
                                <NavLink to="/checkout" className="primary-btn">
                                    TIẾN HÀNH ĐẶT HÀNG
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

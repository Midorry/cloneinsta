import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [haveCart, setHaveCart] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState("");
    const storedData = JSON.parse(localStorage.getItem("user_cart"));

    useEffect(() => {
        if (storedData) {
            const { products, cartId } = storedData;
            setCartId(cartId);
            setCart((prev) => ({ ...prev, products }));
        }
        setHaveCart(window.localStorage.getItem("haveCart"));
    }, []);

    console.log(cart);
    console.log(cart[0]?.productId);

    const getCart = async (userId) => {
        await axios
            .get(`http://localhost:3002/api/cart/get?userId=${userId}`)
            .then(function (response) {
                const getUserId = response.data[0].userId;
                const products = response.data[0].products;
                const cartId = response.data[0]._id;
                console.log(userId);
                console.log(getUserId);
                if (getUserId === userId) {
                    localStorage.setItem("haveCart", true);
                    setHaveCart(true);
                    // console.log();
                } else {
                    localStorage.setItem("haveCart", false);
                    setHaveCart(false);
                }
                localStorage.setItem(
                    "user_cart",
                    JSON.stringify({
                        userId: getUserId,
                        products: products,
                        cartId: cartId,
                    })
                );
                console.log(response);
                setCart((prev) => ({ ...prev, products }));
                setCartId(response.data._id);
                setHaveCart(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const createCart = async (userData, product, value) => {
        await axios
            .post(
                "http://localhost:3002/api/cart/",
                {
                    userId: userData._id,
                    products: [
                        {
                            productId: product._id,
                            productName: product.name,
                            productImage: product.image,
                            promotion: product.promotion,
                            price: product.price,
                            quantity: value,
                        },
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
                const cartId = response.data._id;
                localStorage.setItem("haveCart", true);
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
                setCartId(response.data._id);
                setHaveCart(true);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    // useEffect(() => {
    //     createCart();
    // }, []);

    const addCart = async (userData, product, value) => {
        console.log(cart);
        let sameProduct = false;
        for (let i = 0; i < cart?.products?.length; i++) {
            console.log(product._id);
            if (product._id == cart.products[i].productId) {
                console.log(cart.products[i].quantity);
                cart.products[i].quantity += 1;
                sameProduct = true;
                console.log(sameProduct);
            }
        }
        const listProduct = [...cart.products];

        console.log(listProduct);
        console.log([...cart.products]);
        console.log(cartId);
        if (sameProduct) {
            await axios
                .put(
                    `http://localhost:3002/api/cart/${cartId}`,
                    {
                        userId: userData._id,
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
                    sameProduct = false;
                    console.log(response);
                    setCart((prev) => ({ ...prev, products }));
                    setHaveCart(true);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    console.log(error.response);
                    console.log(error);
                });
        } else {
            await axios
                .put(
                    `http://localhost:3002/api/cart/${cartId}`,
                    {
                        userId: userData._id,
                        products: [
                            ...listProduct,
                            {
                                productId: product._id,
                                productName: product.name,
                                productImage: product.image,
                                promotion: product.promotion,
                                price: product.price,
                                quantity: value,
                            },
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
                    console.log(response);
                    localStorage.setItem(
                        "user_cart",
                        JSON.stringify({
                            userId: userId,
                            products: products,
                            cartId: cartId,
                        })
                    );
                    setCart((prev) => ({ ...prev, products }));
                    setHaveCart(true);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    console.log(error.response);
                    console.log(error);
                });
        }
    };

    const removeCart = async (cartProductId) => {
        let listProduct = [...cart.products];

        console.log(listProduct);
        console.log([...cart.products]);
        console.log(cartProductId);
        // for(let i = 0; i < listProduct.length; i++) {

        // }
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
    };

    const clearCart = () => {
        setCart([]);
        setCartId("");
        localStorage.removeItem("user_cart");
        localStorage.removeItem("haveCart");
    };

    const value = {
        haveCart,
        cart,
        createCart,
        getCart,
        addCart,
        removeCart,
        clearCart,
        setCart,
        setHaveCart,
        cartId,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;

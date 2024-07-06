import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [haveCart, setHaveCart] = useState(false);
    const [cart, setCart] = useState([]);
    // const [cartId, setCartId] = useState("");
    let currentCartId = useRef("");
    const storedData = JSON.parse(localStorage.getItem("user_cart"));

    useEffect(() => {
        if (storedData) {
            const { products, cartId } = storedData;
            currentCartId.current = cartId;
            console.log(currentCartId.current);
            setCart((prev) => ({ ...prev, products }));
        }
        setHaveCart(window.localStorage.getItem("haveCart"));
    }, []);

    console.log(cart);
    console.log(currentCartId.current);

    const getCart = async (userId) => {
        await axios
            .get(`http://localhost:3002/api/cart/get?userId=${userId}`)
            .then(function (response) {
                const getUserId = response.data[0].userId;
                const products = response.data[0].products;
                const cartId = response.data[0]._id;
                console.log(response);
                console.log(userId);
                console.log(getUserId);
                if (getUserId === userId) {
                    localStorage.setItem("haveCart", true);
                    setHaveCart(true);
                    console.log(haveCart);
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
                setCart((prev) => ({ ...prev, products }));
                currentCartId.current = cartId;
                setHaveCart(false);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const createNewCart = async (userData) => {
        await axios
            .post(
                "http://localhost:3002/api/cart/",
                {
                    userId: userData._id,
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
                currentCartId.current = response.data._id;
                setHaveCart(true);
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
                currentCartId.current = response.data._id;
                setHaveCart(true);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const addCart = async (userData, product, value, cartId) => {
        const listProduct = [...cart.products];
        let sameProduct = false;
        for (let i = 0; i < listProduct?.length; i++) {
            console.log(product._id);
            if (product._id == listProduct[i].productId) {
                console.log(listProduct[i].quantity);
                listProduct[i].quantity += 1;
                sameProduct = true;
                console.log(sameProduct);
            }
        }

        console.log(listProduct);
        console.log([...cart.products]);
        console.log(cartId);
        if (sameProduct) {
            await axios
                .put(
                    `http://localhost:3002/api/cart/${cartId}`,
                    {
                        userId: userData._id,
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
                    sameProduct = false;
                    console.log(response);
                    console.log(product._id, product.quantity);
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
                `http://localhost:3002/api/cart/${currentCartId.current}`,
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
                        cartId: currentCartId.current,
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
        currentCartId.current = "";
        setHaveCart(false);
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
        createNewCart,
        currentCartId,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;

import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addCart = (productId) => {
        setCart((prev) => ({ ...prev, productId: productId }));
    };

    const removeCart = (productId) => {
        setCart((prev) => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        addCart,
        removeCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;

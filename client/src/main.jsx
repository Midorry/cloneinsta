import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";

import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/font-awesome.min.css";
import "../public/assets/css/elegant-icons.css";
import "../public/assets/css/nice-select.css";
import "../public/assets/css/jquery-ui.min.css";
import "../public/assets/css/owl.carousel.min.css";
import "../public/assets/css/slicknav.min.css";
import "../public/assets/css/style.css";
import "./assets/css/admin.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProvider from "./context/CartContext.jsx";
import SearchProvider from "./context/SearchContext.jsx";
// import "../public/assets/sass/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <SearchProvider>
                <CartProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </CartProvider>
            </SearchProvider>
        </AuthProvider>
    </React.StrictMode>
);

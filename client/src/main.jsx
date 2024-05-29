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
import "./assets/css/style.css";
// import "../public/assets/sass/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

import { Route, Routes } from "react-router-dom";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import AuthLayout from "./auth/AuthLayout";
import Home from "./root/pages/Home";
import { ShopDetails } from "./root/pages/ShopDetails";
import { RootLayout } from "./components/RootLayout";
import $ from "jquery";

import "jquery-ui/dist/jquery-ui";
import { ShoppingCart } from "./root/pages/ShoppingCart";
import { Shop } from "./root/pages/Shop";
import AdminLayout from "./components/AdminLayout";
import User from "./root/admin/User";
import Dashboard from "./root/admin/Dashboard";
import ListProduct from "./root/admin/ListProduct";
import AddProduct from "./root/admin/AddProduct";
import UpdateProduct from "./root/admin/UpdateProduct";
import Category from "./root/admin/Category";
import UpdateUser from "./root/admin/UpdateUser";
import AddUser from "./root/admin/AddUser";
import AddNews from "./root/admin/AddNews";
import News from "./root/pages/News";
import NewsDetail from "./root/pages/NewsDetail";
import Checkout from "./root/pages/CheckOut";
import Order from "./root/admin/Order";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
    $(window).on("load", function () {
        $(".loader").fadeOut();
        $("#preloder").delay(100).fadeOut("slow");
    });
    return (
        <main>
            <div id="preloder">
                <div className="loader"></div>
            </div>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<SignInForm />} />
                    <Route path="/sign-up" element={<SignUpForm />} />
                </Route>

                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route path="/shop-details/:id" element={<ShopDetails />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                    <Route path="/home" index element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news-detail/:id" element={<NewsDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/admin" index element={<Dashboard />} />
                    <Route path="/list-product" element={<ListProduct />} />
                    <Route path="/category" element={<Category />} />

                    <Route
                        path="/update-product/:id"
                        element={<UpdateProduct />}
                    />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/list-user" element={<User />} />
                    <Route path="/update-user/:id" element={<UpdateUser />} />
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/add-news" element={<AddNews />} />
                    <Route path="/order" element={<Order />} />
                </Route>
            </Routes>
            <ScrollToTop />
        </main>
    );
};

export default App;

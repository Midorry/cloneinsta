import { Route, Routes } from "react-router-dom";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import AuthLayout from "./auth/AuthLayout";
import Home from "./root/pages/Home";
import { ShopDetails } from "./root/pages/ShopDetails";
import { RootLayout } from "./components/RootLayout";

import "jquery-ui/dist/jquery-ui";
import { ShoppingCart } from "./root/pages/ShoppingCart";
import { Shop } from "./root/pages/Shop";
import AdminLayout from "./components/AdminLayout";
import Users from "./root/admin/Users";
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
import Order from "./root/admin/Order";
import ScrollToTop from "./components/ScrollToTop";
import Checkout from "./root/pages/Checkout";
import SignInAdmin from "./auth/SignInAdmin";
import Contact from "./root/pages/Contact";
import User from "./root/pages/User";

const App = () => {
    return (
        <main>
            <Routes>
                <Route path="/login-admin" index element={<SignInAdmin />} />
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
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/user" element={<User />} />
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
                    <Route path="/list-user" element={<Users />} />
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

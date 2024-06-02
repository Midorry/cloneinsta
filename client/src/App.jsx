import { Route, Routes } from "react-router-dom";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import AuthLayout from "./auth/AuthLayout";
import Home from "./root/pages/Home";
import { ShopDetails } from "./root/pages/ShopDetails";
import { RootLayout } from "./components/RootLayout";
import $ from "jquery";

import "jquery-ui/dist/jquery-ui";
import mixitup from "mixitup";
import { ShoppingCart } from "./root/pages/ShoppingCart";
import { Shop } from "./root/pages/Shop";
import AdminLayout from "./components/AdminLayout";
import User from "./root/admin/User";
import Dashboard from "./root/admin/Dashboard";
import ListProduct from "./root/admin/ListProduct";
import AddProduct from "./root/admin/AddProduct";
import UpdateProduct from "./root/admin/UpdateProduct";

const App = () => {
    $(window).on("load", function () {
        $(".loader").fadeOut();
        $("#preloder").delay(100).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $(".featured__controls li").on("click", function () {
            $(".featured__controls li").removeClass("active");
            $(this).addClass("active");
        });
        if ($(".featured__filter").length > 0) {
            var containerEl = document.querySelector(".featured__filter");
            // eslint-disable-next-line no-unused-vars
            var mixer = mixitup(containerEl);
        }
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
                    <Route path="/home" index element={<Home />} />
                    <Route path="/shop-details/:id" element={<ShopDetails />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                    <Route path="/shop" element={<Shop />} />
                    {/* <Route path="/explore" element={<Explore />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/all-users" element={<AllUsers />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:id" element={<EditPost />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/profile/:id/*" element={<Profile />} />
                    <Route
                        path="/update-profile/:id"
                        element={<UpdateProfile />}
                    /> */}
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/admin" index element={<Dashboard />} />
                    <Route path="/list-product" element={<ListProduct />} />
                    <Route
                        path="/update-product/:id"
                        element={<UpdateProduct />}
                    />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/admin/user" element={<User />} />
                </Route>
            </Routes>
        </main>
    );
};

export default App;

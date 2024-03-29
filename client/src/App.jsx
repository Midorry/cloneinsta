import { Route, Routes } from "react-router-dom";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import AuthLayout from "./auth/AuthLayout";
import Home from "./root/pages/Home";

const App = () => {
    return (
        <main>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignInForm />} />
                    <Route path="/sign-up" element={<SignUpForm />} />
                </Route>
                <Route path="/" element={<Home />} />

                {/* private routes */}
                {/* <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/all-users" element={<AllUsers />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:id" element={<EditPost />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/profile/:id/*" element={<Profile />} />
                    <Route
                        path="/update-profile/:id"
                        element={<UpdateProfile />}
                    />
                </Route> */}
            </Routes>
        </main>
    );
};

export default App;

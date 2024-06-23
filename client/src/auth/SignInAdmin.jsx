import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const SignInAdmin = () => {
    const { loginAdmin } = useAuth();
    const navigate = useNavigate();
    const initialLogin = { email: "", password: "" };

    const { isAuthenticatedAdmin } = useAuth();
    console.log(isAuthenticatedAdmin);
    if (isAuthenticatedAdmin) {
        navigate("/admin");
    } else {
        navigate("/login-admin");
    }

    const validationLogin = yup.object({
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
    });

    return (
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center min-h-svh">
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <Formik
                        initialValues={initialLogin}
                        validationSchema={validationLogin}
                        onSubmit={async (values, onSubmitProps) => {
                            const email = values.email;
                            const password = values.password;
                            console.log(email, password);

                            await axios
                                .post(
                                    "http://localhost:3002/api/user/login",
                                    { email, password },
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                )
                                .then(function (response) {
                                    console.log(response);
                                    loginAdmin(
                                        response.data.token,
                                        response.data.user
                                    );
                                    navigate("/admin");
                                })
                                .catch(function (error) {
                                    onSubmitProps.setErrors({
                                        email: "Invalid email or password",
                                    });
                                    toast(error.response.data.msg);
                                    console.log(error.response.data);
                                    console.log(error.response);
                                    console.log(error);
                                });
                        }}
                    >
                        {({
                            handleSubmit,
                            handleBlur,
                            values,
                            handleChange,
                            errors,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-light rounded p-4 p-sm-5 my-4 mx-3"
                            >
                                <div className="form-floating mb-3">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                                    />
                                    {errors.email ? (
                                        <div className="text-red-500">
                                            {errors.email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="form-floating mb-4">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                    />
                                    {errors.password ? (
                                        <div className="text-red-500">
                                            {errors.password}
                                        </div>
                                    ) : null}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-400 h-10 rounded-md"
                                    >
                                        Submit
                                    </button>

                                    <p className="pt-2">
                                        Do you have an account? Sign up
                                        <a
                                            className="text-blue-500"
                                            href="/sign-up"
                                        >
                                            Here!
                                        </a>
                                    </p>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
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

export default SignInAdmin;

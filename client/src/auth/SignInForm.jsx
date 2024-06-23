import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const SignInForm = () => {
    const { login } = useAuth();
    const { getCart } = useCart();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (success) navigate("/");
    }, [success]);
    const navigate = useNavigate();
    const initialLogin = { email: "", password: "" };

    const validationLogin = yup.object({
        email: yup
            .string()
            .email("Email không hợp lệ")
            .required("Vui lòng nhập trường này"),
        password: yup.string().required("Vui lòng nhập trường này"),
    });

    return (
        <>
            <h2 className="w-1/2 m-auto py-3 font-bold text-blue-400 text-center">
                ĐĂNG NHẬP
            </h2>
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
                            window.localStorage.setItem("isLogged", true);
                            console.log(response);
                            login(response.data.token, response.data.user);
                            getCart(response.data.user._id);
                            navigate("/home");
                        })
                        .catch(function (error) {
                            onSubmitProps.setErrors({
                                email: "Invalid email or password",
                            });
                            console.log(error.response.data);
                            console.log(error.response);
                            console.log(error);
                        });
                    setSuccess(true);
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
                        className="m-auto lg:w-1/2 xl:w-1/2 sm:px-20 md:w-full md:px-20 lg:px-0 xl:px-0"
                    >
                        <label htmlFor="email">Email</label>
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
                            <div className="text-red-500">{errors.email}</div>
                        ) : null}

                        <label htmlFor="password">Mật khẩu</label>
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

                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-400 h-10 rounded-md"
                            >
                                Đăng nhập
                            </button>

                            <p className="pt-2">
                                Bạn không có tài khoản? Đăng ký
                                <a className="text-blue-500" href="/sign-up">
                                    {" "}
                                    Tại đây!
                                </a>
                            </p>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SignInForm;

import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

const SignInForm = () => {
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (success) navigate("/");
    }, [success]);
    const navigate = useNavigate();
    // const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } =
    //     useContext(AuthContext);

    // const handleOnClick = () => {
    //     setIsLoggedIn(!isLoggedIn);
    //     if (isLoggedIn) {
    //         setAuthUser("test name");
    //     } else {
    //         console.log("You are not logged in");
    //     }
    //     // navigate("/")
    // };
    const initialLogin = { email: "", password: "" };

    const validationLogin = yup.object({
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
    });

    return (
        <Formik
            initialValues={initialLogin}
            validationSchema={validationLogin}
            onSubmit={async (values) => {
                const email = values.email;
                const password = values.password;
                console.log(email, password);
                const response = await axios
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
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                        console.log(error.response);
                        console.log(error);
                    });
                // const accessToken = response?.data?.token;
                setSuccess(true);
            }}
        >
            {({ handleSubmit, handleBlur, values, handleChange, errors }) => (
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
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
                        <div className="text-red-500">{errors.email}</div>
                    ) : null}

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
                        <div className="text-red-500">{errors.password}</div>
                    ) : null}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-400 h-10 rounded-md"
                        >
                            Submit
                        </button>

                        <p className="pt-2">
                            Do you have an account? Sign up
                            <a className="text-blue-500" href="/sign-up">
                                Here!
                            </a>
                        </p>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default SignInForm;

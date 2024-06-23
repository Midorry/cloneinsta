import { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";
import { useCart } from "/src/context/CartContext";

const Checkout = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const { userData } = useAuth();
    const { cart, cartId, clearCart, createNewCart } = useCart();

    let total = 0;

    cart.products?.map((product) => {
        total = total + product.quantity * product.price;
    });

    console.log(cart);
    console.log(userData._id, userData);

    useEffect(() => {
        // updateProduct();
    }, []);

    console.log(cart);

    const initialRegister = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        payments: "",
        address: userData?.address,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        payments: yup.string().required("required"),
        address: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        phoneNumber: yup.string().required("required"),
    });

    return (
        <>
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="checkout spad">
                <div className="container">
                    <div className="checkout__form">
                        <h4>Chi Tiết Thanh Toán</h4>
                        <div className="flex">
                            <Formik
                                enableReinitialize="true"
                                initialValues={initialRegister}
                                validationSchema={validationRegister}
                                onSubmit={async (values) => {
                                    const formData = new FormData();
                                    console.log(
                                        values.payments,
                                        values.email,
                                        values.address,
                                        cartId,
                                        userData._id,
                                        total
                                    );
                                    formData.append("userId", userData._id);
                                    formData.append("cartId", cartId);
                                    formData.append(
                                        "payments",
                                        values.payments
                                    );
                                    formData.append("address", values.address);
                                    formData.append("email", values.email);
                                    formData.append("total", total);
                                    await axios
                                        .post(
                                            "http://localhost:3002/api/order",
                                            // formData,
                                            {
                                                userId: userData._id,
                                                cartId: cartId,
                                                payments: values.payments,
                                                address: values.address,
                                                email: values.email,
                                                total: total,
                                            }
                                        )
                                        .then(function (response) {
                                            console.log(response);
                                            setIsSuccess(true);

                                            clearCart();
                                        })
                                        .catch(function (error) {
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
                                        className="w-1/2 m-auto"
                                    >
                                        <div className="">
                                            <div className="inline-block w-1/2 pr-4">
                                                <label
                                                    htmlFor="firstName"
                                                    className="block w-1/2"
                                                >
                                                    Họ
                                                </label>
                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.firstName}
                                                    className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                                                />
                                                {errors.firstName ? (
                                                    <div className="text-red-500">
                                                        {errors.firstName}
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="inline-block w-1/2">
                                                <label
                                                    htmlFor="lastName"
                                                    className="block w-1/2"
                                                >
                                                    Tên
                                                </label>
                                                <input
                                                    id="lastName"
                                                    name="lastName"
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastName}
                                                    className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                                                />
                                                {errors.lastName ? (
                                                    <div className="text-red-500">
                                                        {errors.lastName}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
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

                                        <label htmlFor="address">Địa chỉ</label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                        />
                                        {errors.address ? (
                                            <div className="text-red-500">
                                                {errors.address}
                                            </div>
                                        ) : null}

                                        <label htmlFor="address">
                                            Số Điện Thoại
                                        </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                        />
                                        {errors.phoneNumber ? (
                                            <div className="text-red-500">
                                                {errors.phoneNumber}
                                            </div>
                                        ) : null}

                                        <div id="checkbox-group">
                                            Phương thức thanh toán
                                        </div>
                                        <div
                                            role="group"
                                            aria-labelledby="checkbox-group"
                                            className="flex justify-between"
                                        >
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="payments"
                                                    id="payments"
                                                    value="Thanh toán khi nhận hàng"
                                                />
                                                Thanh toán khi nhận hàng
                                            </label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="payments"
                                                    id="payments"
                                                    value="Thanh toán bằng VNPay"
                                                />
                                                Thanh toán bằng Momo
                                            </label>
                                        </div>
                                        {errors.payments ? (
                                            <div className="text-red-500">
                                                {errors.payments}
                                            </div>
                                        ) : null}

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-400 h-10 rounded-md"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                            <div className="w-1/2 ml-14">
                                <div className="checkout__order">
                                    <h4>Đơn Hàng Của Bạn</h4>
                                    <div className="checkout__order__products">
                                        Sản Phẩm <span>Tổng</span>
                                    </div>
                                    <ul>
                                        {cart.products?.map(
                                            (product, index) => (
                                                <li key={index}>
                                                    <img
                                                        className="h-16 w-16 object-cover inline mr-2"
                                                        src={`http://localhost:3002/assets/${product.productImage}`}
                                                    ></img>
                                                    {product.productName} x{" "}
                                                    {product.quantity}
                                                    <span>
                                                        {new Intl.NumberFormat(
                                                            "de-DE"
                                                        ).format(
                                                            product.quantity *
                                                                product.price
                                                        )}
                                                        đ
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div className="checkout__order__total">
                                        Tổng tiền{" "}
                                        <span>
                                            {new Intl.NumberFormat(
                                                "de-DE"
                                            ).format(total)}
                                            đ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isSuccess ? (
                    <>
                        <div className="checkout__inform-layout"></div>
                        <div className="checkout__inform-content">
                            <h3>Đặt hàng thành công</h3>
                            <NavLink
                                onClick={() => createNewCart(userData)}
                                to="/home"
                            >
                                Tiếp tục mua sắm
                            </NavLink>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </section>
        </>
    );
};

export default Checkout;

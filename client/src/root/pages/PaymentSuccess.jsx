import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const PaymentSuccess = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderId = searchParams?.get("apptransid")?.split("_")[1];
    console.log(orderId);
    const updateOrder = async () => {
        await axios
            .put(
                `http://localhost:3002/api/order/update/${orderId}`,
                {
                    status: "paid",
                    invoiceDate: new Date(),
                },
                {
                    withCredentials: false,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        updateOrder();
    }, []);
    return (
        <div className="container flex items-center justify-center h-[410px]">
            <div className="w-max text-center bg-[#F3F6F9] rounded mb-8 p-4">
                <h2 className="text-red-500 mb-2">THANH TOÁN THÀNH CÔNG</h2>
                <h4 className="mb-2">
                    Cảm ơn bạn đã mua sắm sản phẩm của chúng tôi
                </h4>
                <NavLink to="/shop">Tiếp tục mua sắm</NavLink>
            </div>
        </div>
    );
};

export default PaymentSuccess;

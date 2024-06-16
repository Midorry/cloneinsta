import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "/src/context/AuthContext";

const User = () => {
    const [listOrders, setListOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [cart, setCart] = useState([]);
    const [view, setView] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);

    const { userData } = useAuth();

    console.log(userData);

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const handleOnClick = async (id) => {
        await axios.put(`http://localhost:3002/api/order/update/${id}`, {
            status: "cancel",
        });
    };

    const handleStatus = (status) => {
        if (status == "success")
            return (
                <div className=" cursor-default text-center bg-green-200 w-20 border-2 border-solid border-green-500 text-green-500 rounded">
                    Thành Công
                </div>
            );
        else if (status == "cancel")
            return (
                <div className=" cursor-default text-center bg-red-200 w-20 border-2 border-solid border-red-600 text-red-600 rounded">
                    Đã Hủy
                </div>
            );
        else
            return (
                <div className=" cursor-default text-center bg-orange-200 w-20 border-2 border-solid border-orange-600 text-orange-600 rounded">
                    Đang xử lý
                </div>
            );
    };

    const handleStatusChange = (status) => {
        console.log(status);
        if (status == "success") {
            return <div className="text-red-500 font-bold">HOÀN THÀNH</div>;
        } else if (status == "pending") {
            return (
                <button
                    onClick={() => handleOnClick(order._id)}
                    className="btn btn-sm btn-primary mt-3 mr-3"
                >
                    HỦY ĐƠN
                </button>
            );
        } else if (status == "cancel") {
            return <div className="text-red-500 font-bold">ĐÃ HỦY</div>;
        } else {
            return <div className="text-red-500 font-bold">ĐANG GIAO HÀNG</div>;
        }
    };

    const getCart = async (id) => {
        await axios
            .get(`http://localhost:3002/api/cart/find/${id}`)
            .then(function (response) {
                console.log(response);
                setCart(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getOrder = async (id) => {
        await axios
            .get(`http://localhost:3002/api/order/${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setOrder(response.data);
                getCart(response.data.cartId);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getListOrder = async () => {
        await axios
            .get(`http://localhost:3002/api/order/user/${userData?._id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListOrders(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    useEffect(() => {
        getListOrder();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-5">User</div>
                <div className="col-lg-8 col-md-7">
                    <div className="bg-light text-center rounded p-4">
                        <TableContainer className="table-responsive">
                            <Table className="table text-start align-middle table-bordered table-hover mb-0">
                                <TableHead>
                                    <TableRow className="text-dark">
                                        <TableCell scope="col">
                                            Payments
                                        </TableCell>
                                        <TableCell scope="col">
                                            Address
                                        </TableCell>
                                        <TableCell scope="col">
                                            DateOrder
                                        </TableCell>
                                        <TableCell scope="col">
                                            Total Price
                                        </TableCell>
                                        <TableCell scope="col">
                                            Status
                                        </TableCell>
                                        <TableCell scope="col">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listOrders &&
                                        listOrders
                                            .slice(
                                                page * rowPerPage,
                                                page * rowPerPage + rowPerPage
                                            )
                                            ?.map((order, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {order.payments}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.address}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            order.dateOrder
                                                        ).toUTCString()}
                                                    </TableCell>

                                                    <TableCell>
                                                        {new Intl.NumberFormat(
                                                            "de-DE"
                                                        ).format(order.total)}
                                                        đ
                                                    </TableCell>
                                                    <TableCell>
                                                        {handleStatus(
                                                            order.status
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <button
                                                            onClick={() => {
                                                                setView(!view);
                                                                getOrder(
                                                                    order._id
                                                                );
                                                            }}
                                                            className="btn btn-sm btn-primary w-20"
                                                        >
                                                            Chi Tiết
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            rowsPerPage={rowPerPage}
                            page={page}
                            count={listOrders.length}
                            component="div"
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleRowsPerPage}
                        ></TablePagination>
                    </div>
                    {view ? (
                        <div className="order__item">
                            <div className="order__item_background"></div>
                            <div className="order__item_wrap">
                                <div className="w-full">
                                    <div className="list__order">
                                        <h6>Chi Tiết Đơn Hàng</h6>
                                        <TableContainer className="table-responsive mb-3">
                                            <Table className="table text-start align-middle table-bordered table-hover mb-0">
                                                <TableHead>
                                                    <TableRow className="text-dark">
                                                        <TableCell scope="col">
                                                            Image
                                                        </TableCell>
                                                        <TableCell scope="col">
                                                            Product Name
                                                        </TableCell>
                                                        <TableCell scope="col">
                                                            Quantity
                                                        </TableCell>
                                                        <TableCell scope="col">
                                                            Price
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {cart?.products?.map(
                                                        (product, index) => (
                                                            <TableRow
                                                                key={index}
                                                            >
                                                                <TableCell>
                                                                    <img
                                                                        className="h-6 w-6 object-cover inline mr-2"
                                                                        src={`http://localhost:3002/assets/${product.productImage}`}
                                                                    ></img>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        product.productName
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {new Intl.NumberFormat(
                                                                        "de-DE"
                                                                    ).format(
                                                                        product.quantity *
                                                                            product.price
                                                                    )}
                                                                    đ
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <div className="list__order__total">
                                            Tổng tiền{" "}
                                            <span>
                                                {new Intl.NumberFormat(
                                                    "de-DE"
                                                ).format(order?.total)}
                                                đ
                                            </span>
                                        </div>
                                        <h6>Phương Thức Thanh Toán </h6>
                                        <span>{order.payments}</span>
                                    </div>
                                    {handleStatusChange(order.status)}
                                </div>
                                <button
                                    className="order__item_close"
                                    onClick={() => {
                                        setView(!view);
                                        setIsDelete(!isDelete);
                                    }}
                                >
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;

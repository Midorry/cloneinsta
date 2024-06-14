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

const Order = () => {
    const [listOrders, setListOrders] = useState([]);
    const [user, setUser] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [view, setView] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);

    // const { cart } = useCart();
    console.log(cart);

    const getCart = async (id) => {
        await axios
            .get(`http://localhost:3002/api/cart/find/${id}`)
            .then(function (response) {
                console.log(response);
                setCart(response.data);
                getUser(response.data.userId);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getUser = async (id) => {
        await axios
            .get(`http://localhost:3002/api/user/${id}`)
            .then(function (response) {
                console.log(response);
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const handleOnClick = async (id) => {
        await axios.put(`http://localhost:3002/api/order/update/${id}`, {
            isInvoice: false,
        });
    };

    const getListOrder = async () => {
        await axios
            .get(`http://localhost:3002/api/order`, {
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

    useEffect(() => {
        getListOrder();
    }, [isDelete]);

    return (
        <div className="container-fluid pt-4 px-4 relative">
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">
                        <TableHead>
                            <TableRow className="text-dark">
                                <TableCell scope="col">OrderId</TableCell>
                                <TableCell scope="col">CartId</TableCell>
                                <TableCell scope="col">Payments</TableCell>
                                <TableCell scope="col">Address</TableCell>
                                <TableCell scope="col">DateOrder</TableCell>
                                <TableCell scope="col">Total Price</TableCell>
                                <TableCell scope="col">Status</TableCell>
                                <TableCell scope="col">Action</TableCell>
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
                                            <TableCell>{order._id}</TableCell>
                                            <TableCell>
                                                {order.cartId}
                                            </TableCell>
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
                                                {order.isInvoice ? (
                                                    <div className=" cursor-default text-center bg-green-200 w-24 border-2 border-solid border-green-500 text-green-500 rounded">
                                                        Thành Công
                                                    </div>
                                                ) : (
                                                    <div className=" cursor-default text-center bg-red-200 w-24 border-2 border-solid border-red-600 text-red-600 rounded">
                                                        Đã Hủy
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => {
                                                        setView(!view);
                                                        getOrder(order._id);
                                                    }}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Detail
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
                                <div className="list__order-user">
                                    <h6>Thông Tin Khách Hàng</h6>
                                    <span>
                                        Họ và Tên: {user.firstName}{" "}
                                        {user.lastName}
                                    </span>
                                    <span>
                                        Số điện thoại: {user.phoneNumber}
                                    </span>
                                    <span>Địa chỉ: {user.address}</span>
                                </div>
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
                                            {cart.products?.map(
                                                (product, index) => (
                                                    <TableRow key={index}>
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
                                                            {product.quantity}
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
                                        {new Intl.NumberFormat("de-DE").format(
                                            order?.total
                                        )}
                                        đ
                                    </span>
                                </div>
                                <h6>Phương Thức Thanh Toán </h6>
                                <span>{order.payments}</span>
                            </div>
                            <button
                                onClick={() => handleOnClick(order._id)}
                                className="btn btn-sm btn-primary mt-3"
                            >
                                Hủy Đơn
                            </button>
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
    );
};

export default Order;

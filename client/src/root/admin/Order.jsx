import {
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
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
    const [inputs, setInputs] = useState();
    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);

    // const { cart } = useCart();
    // console.log(cart);

    const handleStatus = (status) => {
        if (status == "success")
            return (
                <div className=" cursor-default text-center bg-green-200 w-28 border-2 border-solid border-green-500 text-green-500 rounded">
                    Thành Công
                </div>
            );
        else if (status == "cancel")
            return (
                <div className=" cursor-default text-center bg-red-200 w-28 border-2 border-solid border-red-600 text-red-600 rounded">
                    Đã Hủy
                </div>
            );
        else if (status == "delivering")
            return (
                <div className=" cursor-default text-center bg-yellow-100 w-28 border-2 border-solid border-yellow-500 text-yellow-500 rounded">
                    Đang Giao Hàng
                </div>
            );
        else if (status == "paid")
            return (
                <div className=" cursor-default text-center mb-1 bg-yellow-100 w-28 border-2 border-solid border-yellow-500 text-yellow-500 rounded">
                    Đã Thanh Toán
                </div>
            );
        else if (status == "delivering paid")
            return (
                <>
                    <div className=" cursor-default text-center mb-1 bg-yellow-100 w-28 border-2 border-solid border-yellow-500 text-yellow-500 rounded">
                        Đã Thanh Toán
                    </div>
                    <div className=" cursor-default text-center bg-yellow-100 w-28 border-2 border-solid border-yellow-500 text-yellow-500 rounded">
                        Đang Giao Hàng
                    </div>
                </>
            );
        else
            return (
                <div className=" cursor-default text-center bg-orange-200 w-28 border-2 border-solid border-orange-600 text-orange-600 rounded">
                    Đang xử lý
                </div>
            );
    };

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

    const handleOnClick = async (id, status) => {
        await axios
            .put(`http://localhost:3002/api/order/update/${id}`, {
                status: status,
                invoiceDate: new Date(),
            })
            .then((response) => {
                console.log(response.data);
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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await axios
            .get(`http://localhost:3002/api/order/${inputs}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListOrders([response.data]);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const filterOrder = async (value) => {
        await axios
            .get(`http://localhost:3002/api/order/filter?status=${value}`, {
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
    }, [isDelete]);

    return (
        <div className="container-fluid pt-4 px-4 relative">
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex justify-between items-end">
                            <form
                                className="mr-8 h-12"
                                onSubmit={handleOnSubmit}
                            >
                                <div className="flex justify-between items-end">
                                    <Input
                                        className="!h-12"
                                        placeholder="Search by OrderId…"
                                        variant="plain"
                                        value={inputs}
                                        onChange={(e) =>
                                            setInputs(e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        className="btn btn-sm btn-primary ml-4"
                                        type="submit"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            <FormControl
                                className="!min-w-36"
                                variant="standard"
                            >
                                <InputLabel id="payment">
                                    Filter Status
                                </InputLabel>
                                <Select
                                    labelId="payment"
                                    id="padding"
                                    label="Payment"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        console.log(value);
                                        if (value === "default") {
                                            getListOrder();
                                        } else if (value === "success") {
                                            filterOrder(value);
                                        } else if (value === "cancel") {
                                            filterOrder(value);
                                        } else if (value === "delivering") {
                                            filterOrder(value);
                                        } else if (value === "pending") {
                                            filterOrder(value);
                                        } else if (value === "paid") {
                                            filterOrder(value);
                                        } else {
                                            filterOrder(value);
                                        }
                                    }}
                                >
                                    <MenuItem value="default">Default</MenuItem>
                                    <MenuItem value="success">
                                        Thành Công
                                    </MenuItem>
                                    <MenuItem value="cancel">Đã Hủy</MenuItem>
                                    <MenuItem value="delivering">
                                        Đang Giao Hàng
                                    </MenuItem>
                                    <MenuItem value="pending">
                                        Đang Xử Lý
                                    </MenuItem>
                                    <MenuItem value="paid">
                                        Đã Thanh Toán
                                    </MenuItem>
                                    <MenuItem value="delivering paid">
                                        Đã Thanh Toán Và <br></br> Đang Vận
                                        Chuyển
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <div>
                                <button
                                    className="btn btn-sm btn-primary ml-4"
                                    onClick={() => {
                                        getListOrder();
                                        setInputs("");
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">
                        <TableHead>
                            <TableRow className="text-dark">
                                <TableCell scope="col">OrderId</TableCell>
                                {/* <TableCell scope="col">userId</TableCell> */}
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
                                            {/* <TableCell>
                                                {order.userId}
                                            </TableCell> */}
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
                                                ).toLocaleString("en-US", {
                                                    timeZoneName: "short",
                                                })}
                                            </TableCell>

                                            <TableCell>
                                                {new Intl.NumberFormat(
                                                    "de-DE"
                                                ).format(order.total)}
                                                đ
                                            </TableCell>
                                            <TableCell>
                                                {handleStatus(order.status)}
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
                                            {cart?.products?.map(
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
                                disabled={
                                    order.status == "cancel" ? true : false
                                }
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Bạn có chắc chắn muốn hủy đơn hàng này?"
                                        ) == true
                                    ) {
                                        handleOnClick(order._id, "cancel");
                                    }
                                }}
                                className="btn btn-sm btn-primary mt-3 mr-3"
                            >
                                Hủy Đơn
                            </button>
                            <button
                                disabled={
                                    order.status == "delivering" ||
                                    order.status == "success" ||
                                    order.status == "delivering paid" ||
                                    order.status == "paid"
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Bạn có chắc chắn muốn nhận đơn hàng này?"
                                        ) == true
                                    ) {
                                        handleOnClick(order._id, "delivering");
                                    }
                                }}
                                className="btn btn-sm btn-primary mt-3 mr-3"
                            >
                                Nhận Đơn
                            </button>
                            <button
                                disabled={
                                    order.status == "delivering paid" ||
                                    order.status == "success" ||
                                    order.status == "pending" ||
                                    order.status == "delivering"
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Bạn có chắc chắn muốn giao đơn hàng này (đơn hàng đã được thanh toán)?"
                                        ) == true
                                    ) {
                                        handleOnClick(
                                            order._id,
                                            "delivering paid"
                                        );
                                    }
                                }}
                                className="btn btn-sm btn-primary mt-3 mr-3"
                            >
                                Giao hàng
                            </button>
                            <button
                                disabled={
                                    order.status == "success" ? true : false
                                }
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Bạn có chắc chắn đơn hàng này đã hoàn thành?"
                                        ) == true
                                    ) {
                                        handleOnClick(order._id, "success");
                                    }
                                }}
                                className="btn btn-sm btn-primary mt-3"
                            >
                                Hoàn Thành
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

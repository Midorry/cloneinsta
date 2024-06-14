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
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProduct = () => {
    const [listProducts, setListProducts] = useState([]);
    const [page, setPageChange] = useState(0);
    const [isDelete, setIsDelete] = useState(false);
    const [rowPerPage, rowPerPageChange] = useState(5);
    const notify = () => toast("Delete Product Success!");

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const getListProduct = async () => {
        await axios
            .get("http://localhost:3002/api/product", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getListProduct();
    }, [isDelete]);
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">
                        <TableHead>
                            <TableRow className="text-dark">
                                <TableCell scope="col">Product Name</TableCell>
                                <TableCell scope="col">Category</TableCell>
                                <TableCell scope="col">Quantity</TableCell>
                                <TableCell scope="col">Description</TableCell>
                                <TableCell scope="col">Price</TableCell>
                                <TableCell scope="col">Image</TableCell>
                                <TableCell scope="col">Promotion</TableCell>
                                <TableCell scope="col">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listProducts &&
                                listProducts
                                    .slice(
                                        page * rowPerPage,
                                        page * rowPerPage + rowPerPage
                                    )
                                    ?.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {product.name}
                                            </TableCell>
                                            <TableCell>
                                                {product.categoryId}
                                            </TableCell>
                                            <TableCell>
                                                {product.quantity}
                                            </TableCell>
                                            <TableCell>
                                                <div className="table-desc">
                                                    {product.desc}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat(
                                                    "de-DE"
                                                ).format(product.price)}
                                                đ
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    className="table-image"
                                                    src={`http://localhost:3002/assets/${product.image}`}
                                                ></img>
                                            </TableCell>
                                            <TableCell>
                                                {product.promotion}
                                            </TableCell>
                                            <TableCell>
                                                <NavLink
                                                    to={`/update-product/${product._id}`}
                                                    className="btn btn-sm btn-primary w-16 my-2"
                                                >
                                                    Update
                                                </NavLink>
                                                <button
                                                    className="btn btn-sm btn-primary w-16"
                                                    onClick={async () =>
                                                        await axios
                                                            .delete(
                                                                `http://localhost:3002/api/product/delete/${product._id}`
                                                            )
                                                            .then(function (
                                                                response
                                                            ) {
                                                                setIsDelete(
                                                                    !isDelete
                                                                );
                                                                notify();
                                                                console.log(
                                                                    response
                                                                );
                                                                // window.location.reload();
                                                            })
                                                    }
                                                >
                                                    Delete
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
                    count={listProducts.length}
                    component="div"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleRowsPerPage}
                ></TablePagination>
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

export default ListProduct;

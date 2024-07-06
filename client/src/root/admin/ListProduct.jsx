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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const ListProduct = () => {
    const [listProducts, setListProducts] = useState([]);
    const [page, setPageChange] = useState(0);
    const [isDelete, setIsDelete] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [productId, setProductId] = useState();
    const [inputs, setInputs] = useState();
    const [rowPerPage, rowPerPageChange] = useState(5);
    const notify = () => toast("Delete Product Success!");

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);
        await axios
            .get(`http://localhost:3002/api/product/search?name=${inputs}`, {
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

    const sortPrice = async (value) => {
        await axios
            .get(`http://localhost:3002/api/product/search?price=${value}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response.data);
                setListProducts(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
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
    }, [isDelete, isAdd, isUpdate]);
    return (
        <div className="container-fluid pt-4 px-4 relative">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        setIsAdd(!isAdd);
                    }}
                    className="btn btn-sm btn-primary"
                >
                    Add Product
                </button>
            </div>
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex justify-between items-end">
                            <form
                                className="mr-8 h-12"
                                onSubmit={handleOnSubmit}
                            >
                                <div className="flex justify-between items-end">
                                    <Input
                                        className="!h-12"
                                        placeholder="Search..."
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
                                <InputLabel id="price">Filter Price</InputLabel>
                                <Select
                                    labelId="price"
                                    id="padding"
                                    label="Price"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        console.log(value);
                                        if (value === "inc") {
                                            sortPrice(value);
                                        } else if (value === "dec") {
                                            sortPrice(value);
                                        } else {
                                            getListProduct();
                                        }
                                    }}
                                >
                                    <MenuItem value="default">Default</MenuItem>
                                    <MenuItem value="inc">Tăng</MenuItem>
                                    <MenuItem value="dec">Giảm</MenuItem>
                                </Select>
                            </FormControl>
                            <div>
                                <button
                                    className="btn btn-sm btn-primary ml-4"
                                    onClick={() => {
                                        getListProduct();
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
                                                <button
                                                    to={`/update-product/${product._id}`}
                                                    onClick={() => {
                                                        setIsUpdate(!isUpdate);
                                                        setProductId(
                                                            product._id
                                                        );
                                                    }}
                                                    className="btn btn-sm btn-primary w-16 my-2"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-primary w-16"
                                                    onClick={async () => {
                                                        if (
                                                            confirm(
                                                                "Bạn có chắc chắn muốn xóa sản phẩm này?"
                                                            ) == true
                                                        ) {
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
                                                                });
                                                        }
                                                    }}
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
            {isAdd ? <AddProduct setIsAdd={setIsAdd} isAdd={isAdd} /> : null}
            {isUpdate ? (
                <UpdateProduct
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                    id={productId}
                />
            ) : null}
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

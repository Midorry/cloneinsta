import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const Category = () => {
    const [listCategories, setListCategories] = useState([]);
    const [view, setView] = useState(false);
    const [isDelete, setIsDelete] = useState();
    const [categoryId, setCategoryId] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const [isAdd, setIsAdd] = useState();
    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);
    const [value, setValue] = useState();

    const notifyAdd = () => toast("Add Category Success!");
    const notifyUpdate = () => toast("Update Category Success!");
    const notifyDelete = () => toast("Delete Category Success!");

    const handleOnClick = async () => {
        await axios
            .post(`http://localhost:3002/api/category/add`, {
                name: value,
            })
            .then(function (response) {
                setIsAdd(isAdd + 1);
                notifyAdd();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const handleUpdate = async (categoryId) => {
        await axios
            .put(`http://localhost:3002/api/category/update/${categoryId}`, {
                name: value,
            })
            .then(function (response) {
                notifyUpdate();
                console.log(response);
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

    const getListCategories = async () => {
        await axios
            .get(`http://localhost:3002/api/category`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListCategories(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getListCategories();
    }, [isAdd, isDelete, isUpdate]);

    return (
        <div className="container-fluid pt-4 px-4 relative">
            <div className="flex justify-end">
                <button
                    onClick={() => {
                        setView(!view);
                    }}
                    className="btn btn-sm btn-primary mb-4"
                >
                    Thêm mới danh mục
                </button>
            </div>
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">
                        <TableHead>
                            <TableRow className="text-dark">
                                <TableCell scope="col">CategoryId</TableCell>
                                <TableCell scope="col">Category</TableCell>
                                <TableCell scope="col">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listCategories &&
                                listCategories
                                    .slice(
                                        page * rowPerPage,
                                        page * rowPerPage + rowPerPage
                                    )
                                    ?.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {category._id}
                                            </TableCell>
                                            <TableCell>
                                                {category.name}
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => {
                                                        setIsUpdate(!isUpdate);
                                                        setValue(category.name);
                                                        setCategoryId(
                                                            category._id
                                                        );
                                                    }}
                                                    className="btn btn-sm btn-primary w-16 m-2"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-primary w-16"
                                                    onClick={async () =>
                                                        await axios
                                                            .delete(
                                                                `http://localhost:3002/api/category/delete/${category._id}`
                                                            )
                                                            .then(function (
                                                                response
                                                            ) {
                                                                notifyDelete();
                                                                setIsDelete(
                                                                    isDelete + 1
                                                                );
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
                    count={listCategories.length}
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
            {view ? (
                <div className="form__category">
                    <div className="form__category_background"></div>
                    <div className="form__category_wrap">
                        <span>Tên</span>
                        <input
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                        />
                        <button
                            onClick={handleOnClick}
                            className="btn btn-sm btn-primary"
                        >
                            Thêm
                        </button>
                        <button
                            className="form__category_close"
                            onClick={() => setView(!view)}
                        >
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {isUpdate ? (
                <div className="form__category">
                    <div className="form__category_background"></div>
                    <div className="form__category_wrap">
                        <span>Tên</span>
                        <input
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            value={value}
                        />
                        <button
                            onClick={() => handleUpdate(categoryId)}
                            className="btn btn-sm btn-primary"
                        >
                            Cập nhật
                        </button>
                        <button
                            className="form__category_close"
                            onClick={() => setIsUpdate(!isUpdate)}
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

export default Category;

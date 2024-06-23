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
import { NavLink } from "react-router-dom";

function ListNews() {
    const [listNews, setListNews] = useState([]);
    const [isDelete, setIsDelete] = useState();

    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);

    const notifyDelete = () => toast("Delete News Success!");

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const getListNews = async () => {
        await axios
            .get(`http://localhost:3002/api/news`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListNews(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getListNews();
    }, [isDelete]);

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">
                        <TableHead>
                            <TableRow className="text-dark">
                                <TableCell scope="col">Title</TableCell>
                                <TableCell scope="col">Description</TableCell>
                                <TableCell scope="col">Image</TableCell>
                                <TableCell scope="col">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listNews &&
                                listNews
                                    .slice(
                                        page * rowPerPage,
                                        page * rowPerPage + rowPerPage
                                    )
                                    ?.map((news, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="table-desc">
                                                    {news.title}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="table-desc">
                                                    {news.desc}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    className="table-image"
                                                    src={`http://localhost:3002/assets/${news.image}`}
                                                ></img>
                                            </TableCell>
                                            <TableCell>
                                                <NavLink
                                                    to={`/update-news/${news._id}`}
                                                    className="btn btn-sm btn-primary w-16 my-2"
                                                >
                                                    Update
                                                </NavLink>
                                                <button
                                                    className="btn btn-sm btn-primary w-16"
                                                    onClick={async () =>
                                                        await axios
                                                            .delete(
                                                                `http://localhost:3002/api/news/delete/${news._id}`
                                                            )
                                                            .then(function (
                                                                response
                                                            ) {
                                                                setIsDelete(
                                                                    !isDelete
                                                                );
                                                                notifyDelete();
                                                                console.log(
                                                                    response
                                                                );
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
                    count={listNews.length}
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
}

export default ListNews;

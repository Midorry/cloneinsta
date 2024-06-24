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

function Users() {
    const [listUsers, setListUsers] = useState([]);
    const [isDelete, setIsDelete] = useState();

    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);

    const notifyDelete = () => toast("Delete User Success!");

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const getListUser = async () => {
        await axios
            .get(`http://localhost:3002/api/user`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setListUsers(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getListUser();
    }, [isDelete]);

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
                <TableContainer className="table-responsive">
                    <Table className="table text-start align-middle table-bordered table-hover mb-0">
                        <TableHead>
                            <TableRow className="text-dark">
                                <TableCell scope="col">First Name</TableCell>
                                <TableCell scope="col">Last Name</TableCell>
                                <TableCell scope="col">Email</TableCell>
                                <TableCell scope="col">Address</TableCell>
                                <TableCell scope="col">Avatar</TableCell>
                                <TableCell scope="col">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listUsers &&
                                listUsers
                                    .slice(
                                        page * rowPerPage,
                                        page * rowPerPage + rowPerPage
                                    )
                                    ?.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {user.firstName}
                                            </TableCell>
                                            <TableCell>
                                                {user.lastName}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.address}
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    className="table-image"
                                                    src={`http://localhost:3002/assets/${user.picturePath}`}
                                                ></img>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <NavLink
                                                        to={`/update-user/${user._id}`}
                                                        className="btn btn-sm btn-primary w-16"
                                                    >
                                                        Update
                                                    </NavLink>
                                                    <button
                                                        className="btn btn-sm btn-primary w-16"
                                                        onClick={async () =>
                                                            await axios
                                                                .delete(
                                                                    `http://localhost:3002/api/user/delete/${user._id}`
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
                                                                    // window.location.reload();
                                                                })
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
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
                    count={listUsers.length}
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

export default Users;

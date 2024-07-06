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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

function Users() {
    const [listUsers, setListUsers] = useState([]);
    const [isDelete, setIsDelete] = useState();
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [page, setPageChange] = useState(0);
    const [userId, setUserId] = useState();
    const [inputs, setInputs] = useState();
    const [rowPerPage, rowPerPageChange] = useState(5);

    const notifyDelete = () => toast("Delete User Success!");

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await axios
            .get(`http://localhost:3002/api/user/filter?email=${inputs}`, {
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

    const sortRole = async (value) => {
        await axios
            .get(`http://localhost:3002/api/user/filter?isAdmin=${value}`, {
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
                    Add User
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
                                        placeholder="Search by email..."
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
                                <InputLabel id="role">Filter Role</InputLabel>
                                <Select
                                    labelId="role"
                                    id="padding"
                                    label="Role"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        console.log(value);
                                        if (value === "true") {
                                            sortRole(value);
                                        } else if (value === "false") {
                                            sortRole(value);
                                        } else {
                                            getListUser();
                                        }
                                    }}
                                >
                                    <MenuItem value="default">Default</MenuItem>
                                    <MenuItem value="true">Admin</MenuItem>
                                    <MenuItem value="false">Customer</MenuItem>
                                </Select>
                            </FormControl>
                            <div>
                                <button
                                    className="btn btn-sm btn-primary ml-4"
                                    onClick={() => {
                                        getListUser();
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
                                <TableCell scope="col">First Name</TableCell>
                                <TableCell scope="col">Last Name</TableCell>
                                <TableCell scope="col">Email</TableCell>
                                <TableCell scope="col">Address</TableCell>
                                <TableCell scope="col">Role</TableCell>
                                <TableCell scope="col">Phone Number</TableCell>
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
                                                {user.isAdmin
                                                    ? "Admin"
                                                    : "Customer"}
                                            </TableCell>
                                            <TableCell>
                                                {user.phoneNumber}
                                            </TableCell>
                                            <TableCell>
                                                <img
                                                    className="table-image"
                                                    src={`http://localhost:3002/assets/${user.picturePath}`}
                                                ></img>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-center">
                                                    <button
                                                        onClick={() => {
                                                            setUserId(user._id);
                                                            setIsUpdate(
                                                                !isUpdate
                                                            );
                                                        }}
                                                        className="btn btn-sm btn-primary w-16"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-primary w-16"
                                                        onClick={async () => {
                                                            if (
                                                                confirm(
                                                                    "Bạn có chắc chắn muốn xóa người dùng này không?"
                                                                )
                                                            ) {
                                                                await axios
                                                                    .delete(
                                                                        `http://localhost:3002/api/user/delete/${user._id}`
                                                                    )
                                                                    .then(
                                                                        function (
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
                                                                        }
                                                                    );
                                                            }
                                                        }}
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
            {isAdd ? <AddUser setIsAdd={setIsAdd} isAdd={isAdd} /> : null}
            {isUpdate ? (
                <UpdateUser
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                    id={userId}
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
}

export default Users;

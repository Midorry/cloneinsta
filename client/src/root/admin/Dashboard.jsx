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
// import "../../../../server/public/assets";

const Dashboard = () => {
    const [listProducts, setListProducts] = useState([]);
    // const [rows, rowChange] = useState([]);
    const [page, setPageChange] = useState(0);
    const [rowPerPage, rowPerPageChange] = useState(5);

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

    const handleChangePage = (event, newpage) => {
        setPageChange(newpage);
    };
    const handleRowsPerPage = (event) => {
        rowPerPageChange(+event.target.value);
        setPageChange(0);
    };

    useEffect(() => {
        getListProduct();
    }, []);
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
                <div className="table-responsive">
                    <TableContainer>
                        <Table className="table text-start align-middle table-bordered table-hover mb-0">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="col">
                                        Product Name
                                    </TableCell>
                                    <TableCell scope="col">Category</TableCell>
                                    <TableCell scope="col">Quantity</TableCell>
                                    <TableCell scope="col">
                                        Description
                                    </TableCell>
                                    <TableCell scope="col">Price</TableCell>
                                    <TableCell scope="col">Image</TableCell>
                                    <TableCell scope="col">Promotion</TableCell>
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
                                                    {product.price}
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
            </div>
        </div>
    );
};

export default Dashboard;

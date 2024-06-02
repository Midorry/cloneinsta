import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListProduct = () => {
    const [listProducts, setListProducts] = useState([]);
    const notify = () => toast("Delete Product Success!");

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
    }, []);
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
                <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-dark">
                                <th scope="col">Product Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Promotion</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProducts?.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.categoryId}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div className="table-desc">
                                            {product.desc}
                                        </div>
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat("de-DE").format(
                                            product.price
                                        )}
                                        đ
                                    </td>
                                    <td>
                                        <img
                                            className="table-image"
                                            src={`http://localhost:3002/assets/${product.image}`}
                                        ></img>
                                    </td>
                                    <td>{product.promotion}</td>
                                    <td>
                                        <NavLink
                                            to={`/update-product/${product._id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Update
                                        </NavLink>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={async () =>
                                                await axios
                                                    .delete(
                                                        `http://localhost:3002/api/product/delete/${product._id}`
                                                    )
                                                    .then(function (response) {
                                                        notify();
                                                        console.log(response);
                                                        // window.location.reload();
                                                    })
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

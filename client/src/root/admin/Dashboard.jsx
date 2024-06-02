import axios from "axios";
import { useEffect, useState } from "react";
// import "../../../../server/public/assets";

const Dashboard = () => {
    const [listProducts, setListProducts] = useState([]);

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
                                    <td>{product.price}</td>
                                    <td>
                                        <img
                                            className="table-image"
                                            src={`http://localhost:3002/assets/${product.image}`}
                                        ></img>
                                    </td>
                                    <td>{product.promotion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

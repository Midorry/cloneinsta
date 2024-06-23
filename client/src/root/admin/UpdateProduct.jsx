import { Field, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
// import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const notify = () => toast("Update Product Success!");
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);

    const id = useParams();
    console.log(id);

    const getProduct = async () => {
        await axios
            .get(`http://localhost:3002/api/product/${id.id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setProduct(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };

    const getCategory = async () => {
        await axios
            .get("http://localhost:3002/api/category", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setCategories(response.data);
                console.log(product);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getCategory();
        getProduct();
    }, []);

    // console.log(categories);
    // const [isSuccess, setIsSuccess] = useState(false);
    // const navigate = useNavigate();
    // let isImage = false;
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();

    const removeFile = (file) => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const thumbs = files.map((file) => {
        // isImage = true;
        return (
            <div key={file.name}>
                <div>
                    <img src={file.preview} alt={file.name} />
                </div>
                <button onClick={removeFile(file)}>Remove File</button>
            </div>
        );
    });

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    // useEffect(() => {
    //     if (isSuccess) navigate("/");
    // }, [isSuccess]);
    console.log(product.name);
    const initialProduct = {
        categoryId: product.categoryId,
        name: product.name,
        quantity: product.quantity,
        desc: product.desc,
        price: product.price,
        image: product.image,
        promotion: product.promotion,
    };

    const validationProduct = yup.object({
        categoryId: yup.string().required("Vui lòng điền trường này"),
        name: yup.string().required("Vui lòng điền trường này"),
        quantity: yup.number().required("Vui lòng điền trường này"),
        desc: yup.string().required("Vui lòng điền trường này"),
        price: yup.number().required("Vui lòng điền trường này"),
        image: yup.string().required("Vui lòng điền trường này"),
        promotion: yup.number().required("Vui lòng điền trường này"),
    });

    const handleUpload = async () => {
        if (file == undefined) {
            setFile(product.image);
        }
        const data = new FormData();
        console.log(file);
        data.append("image", file);
        await axios
            .post("http://localhost:3002/upload", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    const handleOnSubmit = async (values) => {
        // const data = new FormData();
        // console.log(file);
        // data.append("image", file);
        // await axios
        //     .post("http://localhost:3002/upload", data)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
        // const formData = new FormData();
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ", " + key[1]);
        // }
        if (file == undefined) {
            setFile(product.image);
        }

        await axios
            .put(`http://localhost:3002/api/product/update/${product._id}`, {
                categoryId: values.categoryId,
                name: values.name,
                quantity: values.quantity,
                desc: values.desc,
                price: values.price,
                image: file.name,
                promotion: values.promotion,
            })
            .then(function (response) {
                notify();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    return (
        <Formik
            enableReinitialize="true"
            initialValues={initialProduct}
            validationSchema={validationProduct}
            onSubmit={handleOnSubmit}
        >
            {({
                handleSubmit,
                handleBlur,
                values,
                handleChange,
                errors,
                resetForm,
            }) => (
                <div className="m-4 pb-4">
                    <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                        <h3 className="my-3 text-center">CẬP NHẬT SẢN PHẨM</h3>
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                        />
                        {errors.name ? (
                            <div className="text-red-500">{errors.name}</div>
                        ) : null}

                        <label htmlFor="quantity">Số lượng</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quantity}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                        />
                        {errors.quantity ? (
                            <div className="text-red-500">
                                {errors.quantity}
                            </div>
                        ) : null}
                        {/* <Dropzone
                            acceptedFiles="image/*"
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                setFieldValue("image", acceptedFiles[0]);
                                setFiles(
                                    acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                        })
                                    )
                                );
                            }}
                        >
                            {({ getRootProps, getInputProps, open }) => (
                                <div
                                    {...getRootProps({
                                        className: "dropzone",
                                    })}
                                    onClick={(e) => e.stopPropagation}
                                >
                                    <label htmlFor="image">New Image</label>
                                    <input
                                        name="image"
                                        {...getInputProps()}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setFile(e.target.files[0]);
                                        }}
                                    />
                                    <p>
                                        Drag drop some files here, or click to
                                        select files
                                    </p>
                                    {isImage ? (
                                        <></>
                                    ) : (
                                        <div>
                                            <button
                                                type="button"
                                                onClick={open}
                                                className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-14 mb-3 p-2"
                                            >
                                                Open File Dialog
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dropzone> */}
                        <label htmlFor="image">New Image</label>
                        <input
                            name="image"
                            type="file"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                        <label htmlFor="oldImage">Old Image</label>
                        <img
                            src={`http://localhost:3002/assets/${product.image}`}
                            alt=""
                        />
                        <aside>{thumbs}</aside>

                        <label htmlFor="categoryId">Danh mục</label>
                        <Field
                            as="select"
                            name="categoryId"
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                            aria-label=".form-select-sm example"
                        >
                            <option name="Category">Select Category</option>
                            {categories.map((category) => (
                                <option name="Category" key={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>

                        <label htmlFor="desc">Mô tả</label>
                        <textarea
                            id="desc"
                            name="desc"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.desc}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-20 mb-3 outline-none p-2"
                        />
                        {errors.desc ? (
                            <div className="text-red-500">{errors.desc}</div>
                        ) : null}

                        <label htmlFor="price">Giá</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                        />
                        {errors.price ? (
                            <div className="text-red-500">{errors.price}</div>
                        ) : null}

                        <label htmlFor="promotion">Khuyến mãi</label>
                        <input
                            id="promotion"
                            name="promotion"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.promotion}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                        />
                        {errors.promotion ? (
                            <div className="text-red-500">
                                {errors.promotion}
                            </div>
                        ) : null}

                        <div>
                            <button
                                onClick={handleUpload}
                                type="submit"
                                className="w-1/2 pr-2 bg-blue-400 text-white h-10 rounded-md"
                            >
                                Cập nhật
                            </button>
                            <button
                                onClick={resetForm}
                                className="w-1/2 bg-blue-400 text-white h-10 rounded-md"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
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
            )}
        </Formik>
    );
};

export default UpdateProduct;

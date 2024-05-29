import { Field, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";

const HomeAdmin = () => {
    const [categories, setCategories] = useState([]);
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
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getCategory();
    }, []);

    // console.log(categories);
    // const [isSuccess, setIsSuccess] = useState(false);
    // const navigate = useNavigate();
    let isImage = false;
    const [files, setFiles] = useState([]);

    const removeFile = (file) => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const thumbs = files.map((file) => {
        isImage = true;
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

    const initialProduct = {
        categoryId: "",
        name: "",
        quantity: "",
        desc: "",
        price: "",
        image: "",
        promotion: "",
    };

    const validationProduct = yup.object({
        categoryId: yup.string().required("Required"),
        name: yup.string().required("Required"),
        quantity: yup.number().required("Required"),
        desc: yup.string().required("Required"),
        price: yup.number().required("Required"),
        image: yup.string().required("Required"),
        promotion: yup.number().required("Required"),
    });

    const handleOnSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("image", values.image.name);
        // const categoryId = values.categoryId;
        // const name = values.name;
        // const quantity = values.quantity;
        // const desc = values.desc;
        // const price = values.price;
        // const image = values.image.name;
        // const promotion = values.promotion;
        await axios
            .post(
                "http://localhost:3002/api/product/add",
                formData,
                // {
                //     categoryId: categoryId,
                //     name: name,
                //     quantity: quantity,
                //     desc: desc,
                //     price: price,
                //     image: image,
                //     promotion: promotion,
                // },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    accept: "application/json",
                }
            )
            .then(function (response) {
                console.log(response);
                // setIsSuccess(true);
            })
            .catch(function (error) {
                onSubmitProps.setErrors({
                    email: "Email already exists",
                });
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    return (
        <Formik
            initialValues={initialProduct}
            validationSchema={validationProduct}
            onSubmit={handleOnSubmit}
        >
            {({
                setFieldValue,
                handleSubmit,
                handleBlur,
                values,
                handleChange,
                errors,
            }) => (
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                    <label htmlFor="name">Product Name</label>
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

                    <label htmlFor="quantity">Quantity</label>
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
                        <div className="text-red-500">{errors.quantity}</div>
                    ) : null}
                    <Dropzone
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
                                <label htmlFor="picturePath">Image</label>
                                <input {...getInputProps()} />
                                {/* {errors.picture ? (
                                <div className="text-red-500">{errors.picture}</div>
                            ) : null} */}
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
                    </Dropzone>
                    <aside>{thumbs}</aside>

                    <label htmlFor="categoryId">Category</label>
                    <Field
                        as="select"
                        name="categoryId"
                        className="form-select form-select-sm mb-3"
                        aria-label=".form-select-sm example"
                    >
                        <option name="Category">Select Category</option>
                        {categories.map((category) => (
                            <option name="Category" key={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Field>

                    <label htmlFor="desc">Description</label>
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

                    <label htmlFor="price">Price</label>
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

                    <label htmlFor="promotion">Promotion</label>
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
                        <div className="text-red-500">{errors.promotion}</div>
                    ) : null}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-400 h-10 rounded-md"
                        >
                            Create
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default HomeAdmin;

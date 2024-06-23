import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Dropzone from "react-dropzone";

const AddNews = () => {
    const notify = () => toast("Create News Success!");

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

    const initialNews = {
        title: "",
        desc: "",
        image: "",
    };

    const validationNews = yup.object({
        title: yup.string().required("Vui lòng điền trường này"),
        desc: yup.string().required("Vui lòng điền trường này"),
        image: yup.string().required("Vui lòng điền trường này"),
    });

    const handleOnSubmit = async (values) => {
        console.log(values.desc);
        const formData = new FormData();
        // for (let value in values) {
        //     formData.append(value, values[value]);
        // }
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        formData.append("image", values.image.name);
        await axios
            .post("http://localhost:3002/api/news/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
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
            initialValues={initialNews}
            validationSchema={validationNews}
            onSubmit={handleOnSubmit}
        >
            {({
                setFieldValue,
                handleSubmit,
                handleBlur,
                values,
                handleChange,
                errors,
                resetForm,
            }) => (
                <div className="m-4 pb-4">
                    <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                        <h3 className="my-3 text-center">THÊM TIN TỨC</h3>
                        <label htmlFor="name">Tiêu đề</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                        />
                        {errors.title ? (
                            <div className="text-red-500">{errors.title}</div>
                        ) : null}

                        <label htmlFor="quantity">Nội dung</label>
                        <textarea
                            id="desc"
                            name="desc"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.desc}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-52 mb-3 outline-none p-2"
                        />
                        {errors.desc ? (
                            <div className="text-red-500">{errors.desc}</div>
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
                                    <label htmlFor="image">Ảnh</label>
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

                        <div>
                            <button
                                type="submit"
                                className="w-1/2 pr-2 bg-blue-400 text-white h-10 rounded-md"
                            >
                                Tạo
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
export default AddNews;

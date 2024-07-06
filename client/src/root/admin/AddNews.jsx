import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Dropzone from "react-dropzone";

const AddNews = (props) => {
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

    const initialNews = {
        title: "",
        desc: "",
        image: "",
    };

    const validationNews = yup.object({
        title: yup.string().required("Vui lòng điền trường này"),
        desc: yup.string().required("Vui lòng điền trường này"),
        image: yup.mixed().required("Vui lòng nhập ảnh"),
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
                <>
                    <div className="absolute top-0 left-0 w-full bg-black h-screen opacity-20"></div>
                    <div className="m-4 p-4 absolute top-0 left-1/4 bg-white w-max rounded min-w-[500px]">
                        <button
                            onClick={() => {
                                props.setIsAdd(!props.isAdd);
                            }}
                            className="btn btn-sm btn-primary !bg-white !leading-none !border-red-500 !text-red-500 absolute right-0 top-0"
                        >
                            x
                        </button>
                        <form onSubmit={handleSubmit} className="w-full m-auto">
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
                                <div className="text-red-500">
                                    {errors.title}
                                </div>
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
                                <div className="text-red-500">
                                    {errors.desc}
                                </div>
                            ) : null}
                            <Dropzone
                                acceptedFiles="image/*"
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                    setFieldValue("image", acceptedFiles[0]);
                                    setFiles(
                                        acceptedFiles.map((file) =>
                                            Object.assign(file, {
                                                preview:
                                                    URL.createObjectURL(file),
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
                                        {errors.image ? (
                                            <div className="text-red-500">
                                                {errors.image}
                                            </div>
                                        ) : null}
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

                            <div className="flex">
                                <button
                                    type="submit"
                                    className="w-1/2 mr-2 bg-blue-400 text-white h-10 rounded-md"
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
                </>
            )}
        </Formik>
    );
};
export default AddNews;

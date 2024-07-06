import { Field, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddUser = (props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
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

    useEffect(() => {
        if (isSuccess) navigate("/list-user");
    }, [isSuccess]);

    const initialRegister = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        isAdmin: false,
        phoneNumber: "",
        picture: "",
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("Vui lòng điền trường này"),
        lastName: yup.string().required("Vui lòng điền trường này"),
        email: yup
            .string()
            .email("Email không hợp lệ!")
            .required("Vui lòng điền trường này"),
        password: yup.string().required("Vui lòng điền trường này"),
        address: yup.string().required("Vui lòng điền trường này"),
        isAdmin: yup.bool().required("Vui lòng điền trường này"),
        phoneNumber: yup.string().required("Vui lòng điền trường này"),
        picture: yup.mixed().required("Vui lòng thêm ảnh đại diện"),
    });
    return (
        <>
            <Formik
                initialValues={initialRegister}
                validationSchema={validationRegister}
                onSubmit={async (values, onSubmitProps) => {
                    const formData = new FormData();
                    for (let value in values) {
                        formData.append(value, values[value]);
                    }
                    console.log(values);
                    formData.append("picturePath", values.picture.name);
                    await axios
                        .post(
                            "http://localhost:3002/api/user/register",
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                                accept: "application/json",
                            }
                        )
                        .then(function (response) {
                            console.log(response);
                            setIsSuccess(true);
                            toast("Add User Successfully");
                        })
                        .catch(function (error) {
                            onSubmitProps.setErrors({
                                email: "Email đã tồn tại",
                            });
                            console.log(error.response.data);
                            console.log(error.response);
                            console.log(error);
                        });
                }}
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
                        <div className="m-4 p-4 absolute -top-5 left-1/4 bg-white w-max rounded">
                            <button
                                onClick={() => {
                                    props.setIsAdd(!props.isAdd);
                                }}
                                className="btn btn-sm btn-primary !bg-white !leading-none !border-red-500 !text-red-500 absolute right-0 top-0"
                            >
                                x
                            </button>
                            <form
                                onSubmit={handleSubmit}
                                className="w-full m-auto"
                            >
                                <h3 className="my-3 text-center">
                                    THÊM MỚI NGƯỜI DÙNG
                                </h3>
                                <div className="flex justify-between">
                                    <div className="pr-2">
                                        <label htmlFor="firstName">Họ</label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                                        />
                                        {errors.firstName ? (
                                            <div className="text-red-500">
                                                {errors.firstName}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName">Tên</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                                        />
                                        {errors.lastName ? (
                                            <div className="text-red-500">
                                                {errors.lastName}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <Dropzone
                                    acceptedFiles="image/*"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        setFieldValue(
                                            "picture",
                                            acceptedFiles[0]
                                        );
                                        setFiles(
                                            acceptedFiles.map((file) =>
                                                Object.assign(file, {
                                                    preview:
                                                        URL.createObjectURL(
                                                            file
                                                        ),
                                                })
                                            )
                                        );
                                    }}

                                    //  onDrop={(acceptedFiles) => {
                                    //                 setFieldValue("picture", acceptedFiles[0]);
                                    //             }}
                                >
                                    {({
                                        getRootProps,
                                        getInputProps,
                                        open,
                                    }) => (
                                        <div
                                            {...getRootProps({
                                                className: "dropzone",
                                            })}
                                            onClick={(e) => e.stopPropagation}
                                        >
                                            <label htmlFor="picturePath">
                                                Avatar
                                            </label>
                                            <input {...getInputProps()} />
                                            {errors.picture ? (
                                                <div className="text-red-500">
                                                    {errors.picture}
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

                                <div className="flex justify-between">
                                    <div className="pr-2">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                                        />
                                        {errors.email ? (
                                            <div className="text-red-500">
                                                {errors.email}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                        />
                                        {errors.password ? (
                                            <div className="text-red-500">
                                                {errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="pr-2">
                                        <label htmlFor="address">Địa chỉ</label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.address}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                        />
                                        {errors.address ? (
                                            <div className="text-red-500">
                                                {errors.address}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="w-1/2">
                                        <label htmlFor="isAdmin">Admin</label>
                                        <Field
                                            as="select"
                                            name="isAdmin"
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                            aria-label=".form-select-sm example"
                                        >
                                            <option name="admin" value={false}>
                                                No
                                            </option>
                                            <option name="admin" value={true}>
                                                Yes
                                            </option>
                                        </Field>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div>
                                        <label htmlFor="address">
                                            Số điện thoại
                                        </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber}
                                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                                        />
                                        {errors.phoneNumber ? (
                                            <div className="text-red-500">
                                                {errors.phoneNumber}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="flex">
                                    <button
                                        type="submit"
                                        className="w-1/2 bg-blue-400 mr-2 text-white h-10 rounded-md"
                                    >
                                        Thêm
                                    </button>
                                    <button
                                        onClick={resetForm}
                                        className="w-1/2 bg-blue-400 text-white h-10 rounded-md"
                                    >
                                        Reset Form
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </Formik>
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
        </>
    );
};

export default AddUser;

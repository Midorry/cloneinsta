import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    let isImage = false;
    const [files, setFiles] = useState([]);
    // const { getRootProps, getInputProps, open } = useDropzone({
    //     accept: {
    //         "image/*": [],
    //     },
    //     onDrop: (acceptedFiles) => {
    //         setFiles(
    //             acceptedFiles.map((file) =>
    //                 Object.assign(file, {
    //                     preview: URL.createObjectURL(file),
    //                 })
    //             )
    //         );
    //     },
    // });

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
        if (isSuccess) navigate("/");
    }, [isSuccess]);

    const initialRegister = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypePassword: "",
        address: "",
        phoneNumber: "",
        picture: "",
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("Vui lòng điền trường này"),
        lastName: yup.string().required("Vui lòng điền trường này"),
        email: yup
            .string()
            .email("Email không hợp lệ!")
            .required("Vui lòng điền Email của bạn."),
        password: yup
            .string()
            .required("Vui lòng nhập mật khẩu.")
            .min(8, "Mật khẩu quá ngắn."),
        retypePassword: yup
            .string()
            .required("Vui lòng nhập lại mật khẩu.")
            .oneOf(
                [yup.ref("password")],
                "Mật khẩu nhập lại không trùng khớp."
            ),
        address: yup.string().required("Vui lòng điền trường này"),
        phoneNumber: yup.string().required("Vui lòng điền trường này"),
        picture: yup.string().required("Vui lòng thêm ảnh đại diện"),
    });
    return (
        <>
            <h2 className="lg:w-1/2 xl:w-1/2 md:w-full m-auto py-3 font-bold text-blue-400 text-center">
                ĐĂNG KÝ
            </h2>
            <Formik
                initialValues={initialRegister}
                validationSchema={validationRegister}
                onSubmit={async (values, onSubmitProps) => {
                    const formData = new FormData();
                    // for (let value in values) {
                    //     formData.append(value, values[value]);
                    // }
                    formData.append("firstName", values.firstName);
                    formData.append("lastName", values.lastName);
                    formData.append("email", values.email);
                    formData.append("password", values.password);
                    formData.append("address", values.address);
                    formData.append("picturePath", values.picture.name);
                    // const firstName = values.firstName;
                    // const lastName = values.lastName;
                    // const email = values.email;
                    // const password = values.password;
                    // const address = values.address;
                    // const picturePath = values.picture.name;
                    await axios
                        .post(
                            "http://localhost:3002/api/user/register",
                            formData,
                            // {
                            //     firstName,
                            //     lastName,
                            //     email,
                            //     password,
                            //     address,
                            //     picturePath,
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
                            setIsSuccess(true);
                        })
                        .catch(function (error) {
                            onSubmitProps.setErrors({
                                email: "Email đã được sử dụng.",
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
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="m-auto lg:w-1/2 xl:w-1/2 sm:px-20 md:w-full md:px-20 lg:px-0 xl:px-0"
                    >
                        <div className="">
                            <div className="inline-block w-1/2 pr-1">
                                <label
                                    htmlFor="firstName"
                                    className="block w-1/2"
                                >
                                    Họ
                                </label>
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

                            <div className="inline-block w-1/2">
                                <label
                                    htmlFor="lastName"
                                    className="block w-1/2"
                                >
                                    Tên
                                </label>
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
                                setFieldValue("picture", acceptedFiles[0]);
                                setFiles(
                                    acceptedFiles.map((file) =>
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                        })
                                    )
                                );
                            }}

                            //  onDrop={(acceptedFiles) => {
                            //                 setFieldValue("picture", acceptedFiles[0]);
                            //             }}
                        >
                            {({ getRootProps, getInputProps, open }) => (
                                <div
                                    {...getRootProps({
                                        className: "dropzone",
                                    })}
                                    onClick={(e) => e.stopPropagation}
                                >
                                    <label htmlFor="picturePath">Avatar</label>
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
                            <div className="text-red-500">{errors.email}</div>
                        ) : null}

                        <label htmlFor="password">Mật khẩu</label>
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

                        <label htmlFor="password">Nhập lại mật khẩu</label>
                        <input
                            id="retypePassword"
                            name="retypePassword"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.retypePassword}
                            className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-4 outline-none p-2"
                        />
                        {errors.retypePassword ? (
                            <div className="text-red-500">
                                {errors.retypePassword}
                            </div>
                        ) : null}

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
                            <div className="text-red-500">{errors.address}</div>
                        ) : null}

                        <label htmlFor="address">Số điện thoại</label>
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

                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-400 h-10 rounded-md"
                            >
                                Đăng ký
                            </button>

                            <p className="pt-2">
                                Bạn đã có tài khoản? Đăng nhập
                                <a className="text-blue-500" href="/">
                                    {" "}
                                    Tại đây!
                                </a>
                            </p>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SignUpForm;

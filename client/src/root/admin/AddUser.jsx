import { Field, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
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
        if (isSuccess) navigate("/list-user");
    }, [isSuccess]);

    const initialRegister = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        isAdmin: false,
        picture: "",
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
        address: yup.string().required("required"),
        isAdmin: yup.bool().required("required"),
        picture: yup.string().required("required"),
    });
    return (
        <Formik
            initialValues={initialRegister}
            validationSchema={validationRegister}
            onSubmit={async (values, onSubmitProps) => {
                const formData = new FormData();
                for (let value in values) {
                    formData.append(value, values[value]);
                }
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
                            email: "Email already exists",
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
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                    <label htmlFor="firstName">First Name</label>
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
                        <div className="text-red-500">{errors.firstName}</div>
                    ) : null}

                    <label htmlFor="lastName">Last Name</label>
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
                        <div className="text-red-500">{errors.lastName}</div>
                    ) : null}
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

                    <label htmlFor="email">Email Address</label>
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

                    <label htmlFor="password">Password</label>
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
                        <div className="text-red-500">{errors.password}</div>
                    ) : null}

                    <label htmlFor="address">Address</label>
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

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-400 h-10 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default AddUser;

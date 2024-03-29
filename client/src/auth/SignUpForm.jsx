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
        if (isSuccess) navigate("/sign-in");
    }, [isSuccess]);

    const initialRegister = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picture: "",
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
        picture: yup.string().required("required"),
    });
    return (
        <Formik
            initialValues={initialRegister}
            validationSchema={validationRegister}
            onSubmit={async (values) => {
                const firstName = values.firstName;
                const lastName = values.lastName;
                const email = values.email;
                const password = values.password;
                const picturePath = values.picture.name;
                await axios
                    .post(
                        "http://localhost:3002/api/user/register",
                        {
                            firstName,
                            lastName,
                            email,
                            password,
                            picturePath,
                        },
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            accept: "application/json",
                        }
                    )
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                    });
                setIsSuccess(true);
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

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-400 h-10 rounded-md"
                        >
                            Submit
                        </button>

                        <p className="pt-2">
                            Do you have an account? Sign up
                            <a className="text-blue-500" href="/sign-in">
                                Here!
                            </a>
                        </p>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default SignUpForm;

import { Field, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();

    const id = useParams();
    console.log(id);

    const removeFile = (file) => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const thumbs = files.map((file) => {
        return (
            <div key={file.name}>
                <div>
                    <img src={file.preview} alt={file.name} />
                </div>
                <button onClick={removeFile(file)}>Remove File</button>
            </div>
        );
    });

    const getUser = async () => {
        await axios
            .get(`http://localhost:3002/api/user/${id.id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getUser();
    }, []);

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

    console.log(user);

    const initialRegister = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // password: user.password,
        address: user.address,
        isAdmin: false,
        picture: user.picturePath,
    };

    const validationRegister = yup.object({
        firstName: yup.string().required("Vui lòng điền trường này"),
        lastName: yup.string().required("Vui lòng điền trường này"),
        email: yup
            .string()
            .email("Email không hợp lệ!")
            .required("Vui lòng điền trường này"),
        // password: yup.string().required("Vui lòng điền trường này"),
        address: yup.string().required("Vui lòng điền trường này"),
        isAdmin: yup.bool().required("Vui lòng điền trường này"),
        picture: yup.string().required("Vui lòng điền trường này"),
    });

    const handleUpload = async () => {
        if (file == undefined) {
            setFile(user.picturePath);
        }
        const data = new FormData();
        console.log(file);
        data.append("image", file);
        await axios
            .post("http://localhost:3002/upload", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <Formik
            enableReinitialize="true"
            initialValues={initialRegister}
            validationSchema={validationRegister}
            onSubmit={async (values, onSubmitProps) => {
                if (file == undefined) {
                    setFile(user.picturePath);
                }
                // const formData = new FormData();
                // for (let value in values) {
                //     formData.append(value, values[value]);
                // }
                // formData.append("picturePath", file);
                await axios
                    .put(
                        `http://localhost:3002/api/user/update/${user._id}`,
                        // formData,
                        {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                            // password,
                            address: values.address,
                            isAdmin: values.isAdmin,
                            picturePath: file.name,
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
            {({ handleSubmit, handleBlur, values, handleChange, errors }) => (
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                    <h3 className="my-3 text-center">CẬP NHẬT NGƯỜI DÙNG</h3>
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
                        <div className="text-red-500">{errors.firstName}</div>
                    ) : null}

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
                        <div className="text-red-500">{errors.lastName}</div>
                    ) : null}
                    <label htmlFor="image">New Avatar</label>
                    <input
                        name="image"
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    <label htmlFor="oldImage">Old Avatar</label>
                    <img
                        src={`http://localhost:3002/assets/${user.picturePath}`}
                        alt=""
                    />
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
                            onClick={() => {
                                handleUpload();
                            }}
                            type="submit"
                            className="w-full bg-blue-400 text-white my-2 h-10 rounded-md"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default UpdateUser;

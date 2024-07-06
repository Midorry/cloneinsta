import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const UpdateNews = (props) => {
    const [news, setNews] = useState([]);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();
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

    console.log(props.id);

    const getNews = async () => {
        await axios
            .get(`http://localhost:3002/api/news/${props.id}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                accept: "application/json",
            })
            .then(function (response) {
                console.log(response);
                setNews(response.data);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response);
                console.log(error);
            });
    };
    useEffect(() => {
        getNews();
    }, []);

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    console.log(news);

    const initialRegister = {
        title: news.title,
        desc: news.desc,
        image: news.image,
    };

    const validationRegister = yup.object({
        title: yup.string().required("Vui lòng điền trường này"),
        desc: yup.string().required("Vui lòng điền trường này"),
        image: yup.string().required("Vui lòng điền trường này"),
    });

    const handleUpload = async () => {
        if (file == undefined) {
            setFile(news.image);
            const data = new FormData();
            console.log(file);
            data.append("image", file);
            await axios
                .post("http://localhost:3002/upload", data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } else {
            const data = new FormData();
            data.append("image", file);
            await axios
                .post("http://localhost:3002/upload", data)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    };
    return (
        <Formik
            enableReinitialize="true"
            initialValues={initialRegister}
            validationSchema={validationRegister}
            onSubmit={async (values) => {
                if (file == undefined) {
                    setFile(news.image);
                }
                const formData = new FormData();
                for (let value in values) {
                    formData.append(value, values[value]);
                }
                formData.append("image", file);
                await axios
                    .put(
                        `http://localhost:3002/api/news/update/${news._id}`,
                        // formData
                        {
                            title: values.title,
                            desc: values.desc,
                            image: file.name,
                        }
                    )
                    .then(function (response) {
                        console.log(response);
                        toast("Update News Success");
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                        console.log(error.response);
                        console.log(error);
                    });
            }}
        >
            {({ handleSubmit, handleBlur, values, handleChange, errors }) => (
                <>
                    <div className="absolute top-0 left-0 w-full bg-black h-screen opacity-20"></div>
                    <div className="m-4 p-4 absolute -top-5 left-[10%] bg-white w-max rounded">
                        <button
                            onClick={() => {
                                props.setIsUpdate(!props.isUpdate);
                            }}
                            className="btn btn-sm btn-primary !bg-white !leading-none !border-red-500 !text-red-500 absolute right-0 top-0"
                        >
                            x
                        </button>
                        <form onSubmit={handleSubmit} className="w-full m-auto">
                            <h3 className="my-3 text-center">
                                CẬP NHẬT TIN TỨC
                            </h3>
                            <label htmlFor="firstName">Tiêu đề</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                className="border-gray-400 border-solid block w-full bg-gray-300 rounded-md h-10 mb-3 outline-none p-2"
                            />
                            {errors.title ? (
                                <div className="text-red-500">
                                    {errors.title}
                                </div>
                            ) : null}

                            <label htmlFor="lastName">Nội dung</label>
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
                            <div className="flex justify-between">
                                <div className="pr-2">
                                    <label htmlFor="image">New Image</label>
                                    <input
                                        name="image"
                                        type="file"
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="oldImage">Old Image</label>
                                    <img
                                        className="w-full h-[200px] object-cover"
                                        src={`http://localhost:3002/assets/${news.image}`}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <aside>{thumbs}</aside>

                            <div>
                                <button
                                    onClick={() => {
                                        handleUpload();
                                    }}
                                    type="submit"
                                    className="w-full bg-blue-400 text-white h-10 my-3 rounded-md"
                                >
                                    Cập nhật
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

export default UpdateNews;

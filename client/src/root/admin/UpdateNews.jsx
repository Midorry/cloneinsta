import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNews = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [news, setNews] = useState([]);
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
            .get(`http://localhost:3002/api/news/${id.id}`, {
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
        if (isSuccess) navigate("/list-news");
    }, [isSuccess]);

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
        console.log(news.image);
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
            console.log(file);
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
                        setIsSuccess(true);
                    })
                    .catch(function (error) {
                        console.log(error.response.data);
                        console.log(error.response);
                        console.log(error);
                    });
            }}
        >
            {({ handleSubmit, handleBlur, values, handleChange, errors }) => (
                <form onSubmit={handleSubmit} className="w-1/2 m-auto">
                    <h3 className="my-3 text-center">CẬP NHẬT TIN TỨC</h3>
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
                        <div className="text-red-500">{errors.title}</div>
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
                        <div className="text-red-500">{errors.desc}</div>
                    ) : null}
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
                        src={`http://localhost:3002/assets/${news.image}`}
                        alt=""
                    />
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
            )}
        </Formik>
    );
};

export default UpdateNews;

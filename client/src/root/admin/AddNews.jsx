import { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";

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

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent({ format: "text" }));
        }
    };

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
        title: yup.string().required("Required"),
        // desc: yup.string().required("Required"),
        image: yup.string().required("Required"),
    });

    const handleOnSubmit = async (values) => {
        console.log(values.desc);
        const formData = new FormData();
        // for (let value in values) {
        //     formData.append(value, values[value]);
        // }
        formData.append("title", values.title);
        formData.append(
            "desc",
            editorRef.current.getContent({ format: "text" })
        );
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
                        <h3 className="mb-3">ADD NEWS</h3>
                        <label htmlFor="name">Title</label>
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

                        <label htmlFor="quantity">Description</label>
                        <Editor
                            id="desc"
                            name="desc"
                            value={editorRef.current}
                            apiKey="t2xwu53hggtwh2tq8xokws03q20xwoy9gnrkyp7ahqjzl3dj"
                            onInit={(_evt, editor) =>
                                (editorRef.current = editor)
                            }
                            initialValue="This is the initial content of the editor."
                            init={{
                                selector: "textarea",
                                forced_root_block: "",
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "codesample",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help" +
                                    "codesample code",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <button onClick={log}>Log editor content</button>
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
                                    <label htmlFor="image">Image</label>
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
                                className="w-1/2 pr-2 bg-blue-400 h-10 rounded-md"
                            >
                                Create
                            </button>
                            <button
                                onClick={resetForm}
                                className="w-1/2 bg-blue-400 h-10 rounded-md"
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

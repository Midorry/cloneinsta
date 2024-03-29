import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default request;

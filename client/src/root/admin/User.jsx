import axios from "axios";
import { useState } from "react";

const User = () => {
    const [file, setFile] = useState();
    const handleUpload = async () => {
        const data = new FormData();
        console.log(file);
        data.append("image", file);
        await axios
            .post("http://localhost:3002/upload", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <input
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default User;

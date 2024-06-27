import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);
export default News;

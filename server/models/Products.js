import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        code: {
            type: String,
        },
        desc: {
            type: String,
        },
        categories: {
            type: String,
        },
        origin: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
        promotion: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Products = mongoose.model("Products", ProductsSchema);
export default Products;

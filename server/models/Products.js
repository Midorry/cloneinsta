import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
    {
        categoryId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        },
        desc: {
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

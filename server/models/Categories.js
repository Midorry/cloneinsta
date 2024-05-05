import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },
    { timestamps: true }
);

const Categories = mongoose.model("InvoiceDetail", CategoriesSchema);
export default Categories;

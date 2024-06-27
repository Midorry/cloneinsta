import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const Categories = mongoose.model("Categories", CategoriesSchema);
export default Categories;

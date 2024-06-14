import express from "express";
import {
    addCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from "../controller/CategoriesController.js";

const router = express.Router();

router.post("/add", addCategory);

router.put("/update/:id", updateCategory);

router.delete("/delete/:id", deleteCategory);

router.get("/", getAllCategories);

export default router;

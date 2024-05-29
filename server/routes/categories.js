import express from "express";
import {
    addCategory,
    getAllCategories,
} from "../controller/CategoriesController.js";

const router = express.Router();

router.post("/add", addCategory);

router.get("/", getAllCategories);

export default router;

import express from "express";
import {
    addProduct,
    getAllProducts,
    updateProduct,
} from "../controller/ProductsController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.put("/:id/products", updateProduct);

export default router;

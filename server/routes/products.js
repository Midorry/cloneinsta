import express from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from "../controller/ProductsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

export default router;

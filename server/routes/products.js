import express from "express";
import {
    deleteProduct,
    filterPrice,
    getAllProducts,
    getProduct,
    search,
    updateProduct,
} from "../controller/ProductsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", search);
// router.get("/filter", filterProduct);
router.get("/price", filterPrice);
router.get("/:id", getProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

export default router;

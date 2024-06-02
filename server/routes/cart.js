import express from "express";
import {
    allCart,
    createCart,
    deleteCart,
    updateCart,
} from "../controller/CartController.js";

const router = express.Router();

router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
router.get("/", allCart);
export default router;

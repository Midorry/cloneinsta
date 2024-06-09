import express from "express";
import {
    allCart,
    createCart,
    deleteCart,
    getCart,
    getUserCart,
    updateCart,
} from "../controller/CartController.js";

const router = express.Router();

router.post("/", createCart);
router.get("/get", getCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
router.get("/", allCart);
router.get("/find/:id", getUserCart);
export default router;

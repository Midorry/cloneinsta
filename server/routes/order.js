import express from "express";
import {
    getAllOrders,
    getOrder,
    momoPayment,
    newOrder,
    updateOrder,
} from "../controller/OrderController.js";

const router = express.Router();

router.post("/", newOrder);
router.post("/payment", momoPayment);
router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.put("/update/:id", updateOrder);

export default router;

import express from "express";
import {
    getAllOrders,
    getOrder,
    getOrderUser,
    momoPayment,
    newOrder,
    updateOrder,
} from "../controller/OrderController.js";

const router = express.Router();

router.post("/", newOrder);
router.get("/", getAllOrders);
router.post("/payment", momoPayment);
router.get("/user/:id", getOrderUser);
router.get("/:id", getOrder);
router.put("/update/:id", updateOrder);

export default router;

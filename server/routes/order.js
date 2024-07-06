import express from "express";
import {
    filterOrder,
    getAllOrders,
    getOrder,
    getOrderUser,
    // vnpPayment,
    newOrder,
    updateOrder,
} from "../controller/OrderController.js";

const router = express.Router();

router.post("/", newOrder);
router.get("/", getAllOrders);
// router.post("/payment", vnpPayment);
router.get("/filter", filterOrder);
router.get("/user/:id", getOrderUser);
router.get("/:id", getOrder);
router.put("/update/:id", updateOrder);

export default router;

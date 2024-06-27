import mongoose from "mongoose";

var date = new Date();

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        cartId: {
            type: String,
            required: true,
        },
        payments: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        dateOrder: {
            type: Date,
            default: date,
        },
        status: {
            type: String,
            default: "pending",
        },
        invoiceDate: {
            type: Date,
            default: date,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;

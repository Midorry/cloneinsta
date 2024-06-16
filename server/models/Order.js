import mongoose from "mongoose";

var date = new Date();

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        cartId: {
            type: String,
            // required: true,
        },
        payments: {
            type: String,
        },
        address: {
            type: String,
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
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;

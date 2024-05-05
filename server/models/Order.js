import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        cartId: {
            type: String,
            required: true,
        },
        payments: {
            type: String,
        },
        address: {
            type: String,
        },
        dateOrder: {
            type: Date,
        },
        invoiceNumber: {
            type: Boolean,
            default: null,
        },
        invoiceDate: {
            type: Date,
        },
        total: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;

import mongoose from "mongoose";

var date = new Date();

const OrderSchema = new mongoose.Schema(
    {
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
        isInvoice: {
            type: Boolean,
            default: true,
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

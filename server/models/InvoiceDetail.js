import mongoose from "mongoose";

const InvoiceDetailSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        orderId: {
            type: String,
        },
        productsId: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
        },
        total: {
            type: Number,
        },
    },
    { timestamps: true }
);

const InvoiceDetail = mongoose.model("InvoiceDetail", InvoiceDetailSchema);
export default InvoiceDetail;

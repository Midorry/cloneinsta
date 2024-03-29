import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        orderId: {
            type: String,
        },
        address: {
            type: String,
        },
        payments: {
            type: String,
        },
        dateOrder: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;

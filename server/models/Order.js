import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        cartId: {
            type: String,
        },
        userId: {
            type: String,
        },
        payments: {
            type: Object,
        },
        products: {
            type: Array,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;

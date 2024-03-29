import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        products: {
            type: Array,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;

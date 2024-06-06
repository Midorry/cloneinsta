import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: { type: String },
                productName: { type: String },
                productImage: { type: String, default: "" },
                promotion: { type: Number, default: 0 },
                price: { type: Number, default: 0 },
                quantity: { type: Number, default: 1 },
            },
        ],
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;

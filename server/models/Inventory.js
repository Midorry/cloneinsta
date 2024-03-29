import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        reservation: {
            type: Array,
        },
    },
    { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;

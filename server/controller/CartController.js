import Cart from "../models/Cart.js";

//CREATE

export const createCart = async (req, res) => {
    const { userId, products } = req.body;
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getCart = async (req, res) => {
    const userId = req.query.userId;
    try {
        if (userId) {
            const products = await Cart.find({
                userId: {
                    $regex: userId,
                    $options: "i",
                },
            }).sort({ createdAt: -1 });
            res.status(200).json(products);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//UPDATE
export const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

//DELETE
export const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET USER CART
export const getUserCart = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const cart = await Cart.findById(id);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

// //GET ALL

export const allCart = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
};

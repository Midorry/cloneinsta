import Products from "../models/Products.js";

export const addProduct = async (req, res, next) => {
    try {
        const { categoryId, name, quantity, desc, price, image, promotion } =
            req.body;

        const newProduct = new Products({
            categoryId,
            name,
            quantity,
            desc,
            price,
            image,
            promotion,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const post = await Products.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Products.findById(id);

        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

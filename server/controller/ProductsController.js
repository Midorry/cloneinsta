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

export const getProduct = async (req, res) => {
    const product = req.params.id;
    if (product) {
        try {
            const prod = await Products.findById(product);
            res.status(200).json(prod);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { categoryId, name, quantity, desc, price, image, promotion } =
            req.body;

        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            {
                categoryId,
                name,
                quantity,
                desc,
                price,
                image,
                promotion,
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    const product = await Products.findById(req.params.id);
    // try {
    //     await Products.findByIdAndDelete(req.params.id);
    //     res.status(200).json("Product has been deleted...");
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
    if (product) {
        await product.deleteOne();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
};

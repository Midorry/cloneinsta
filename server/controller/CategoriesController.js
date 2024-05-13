import Categories from "../models/Categories.js";

export const addCategory = async (req, res, next) => {
    try {
        const name = req.body;
        const newCategory = new Categories(name);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const post = await Categories.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

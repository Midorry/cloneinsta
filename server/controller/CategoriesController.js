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

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteCategory = async (req, res) => {
    const category = await Categories.findById(req.params.id);
    // try {
    //     await Products.findByIdAndDelete(req.params.id);
    //     res.status(200).json("Product has been deleted...");
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }
    if (category) {
        await category.deleteOne();
        res.json({ message: "Category removed" });
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
};

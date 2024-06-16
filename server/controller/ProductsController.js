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
    // const category = req.query.category;
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Logic Filter Products

export const filterProduct = async (req, res) => {
    const filters = req.query;
    const products = await Products.find();
    const filteredProducts = products.filter((product) => {
        let isValid = true;
        for (let key in filters) {
            console.log(key, product[key], filters[key]);
            isValid = isValid && product[key] == filters[key];
        }
        return isValid;
    });
    res.status(200).json(filteredProducts);
};

export const filterPrice = async (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    const products = await Products.find();
    const filteredProducts = products.filter((product) => {
        let isValid = true;
        for (let i = 0; i < products.length; i++) {
            isValid = isValid && product.price > min && product.price < max;
        }
        return isValid;
    });
    res.status(200).json(filteredProducts);
};

export const search = async (req, res) => {
    const name = req.query.name;
    const category = req.query.category;
    const sortDate = req.query.new;
    const sortQuantity = req.query.quantity;
    const sortPrice = req.query.price;
    try {
        if (name) {
            const products = await Products.find({
                name: {
                    $regex: name,
                    $options: "i",
                },
            });
            res.status(200).json(products);
        } else if (sortDate && sortQuantity) {
            const products = await Products.find()
                .sort({ createdAt: -1 })
                .limit(3);
            res.status(200).json(products);
        } else if (sortDate) {
            const products = await Products.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } else if (sortPrice === "inc") {
            const products = await Products.find().sort({ price: 1 });
            // .limit(6);
            res.status(200).json(products);
        } else if (sortPrice === "dec") {
            const products = await Products.find().sort({ price: -1 });
            // .limit(6);
            res.status(200).json(products);
        } else {
            const products = await Products.find({
                categoryId: {
                    $regex: category,
                    $options: "i",
                },
            });
            res.status(200).json(products);
        }
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
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
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

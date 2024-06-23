import News from "../models/News.js";

export const addNews = async (req, res, next) => {
    try {
        const { title, desc, image } = req.body;

        const news = new News({
            title,
            desc,
            image,
        });
        const savedNews = await news.save();
        res.status(201).json(savedNews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateNews = async (req, res) => {
    try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedNews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news) {
            await news.deleteOne();
            res.json({ message: "News removed" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getNews = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (id) {
            const news = await News.findById(id);
            res.status(201).json(news);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllNews = async (req, res, next) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getNewsLatest = async (req, res, next) => {
    try {
        const isNews = req.query.new;
        if (isNews) {
            const news = await News.find().sort({ createAt: -1 }).limit(3);
            res.status(201).json(news);
        } else {
            const news = await News.find();
            res.status(201).json(news);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getNewsFilter = async (req, res, next) => {
    try {
        const isNews = req.query.new;
        const isFilter = req.query.filter;
        if (isNews && isFilter) {
            const news = await News.find().sort({ createAt: -1 }).limit(3);
            res.status(201).json(news);
        } else {
            const news = await News.find();
            res.status(201).json(news);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

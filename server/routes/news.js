import express from "express";
import {
    deleteNews,
    getAllNews,
    getNews,
    getNewsFilter,
    getNewsLatest,
    updateNews,
} from "../controller/NewsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/recent", getNewsLatest);
router.get("/filter", getNewsFilter);
router.get("/:id", getNews);
router.put("/update/:id", updateNews);
router.delete("/delete/:id", deleteNews);
export default router;

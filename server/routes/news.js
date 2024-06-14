import express from "express";
import {
    getAllNews,
    getNews,
    getNewsFilter,
    getNewsLatest,
} from "../controller/NewsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/recent", getNewsLatest);
router.get("/filter", getNewsFilter);
router.get("/:id", getNews);
export default router;

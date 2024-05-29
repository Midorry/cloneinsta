import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose, { mongo } from "mongoose";
import { register } from "./controller/AuthController.js";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";
import { addProduct } from "./controller/ProductsController.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: "public/assets",
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

/* ROUTES WITH FILES */
app.post("/api/user/register", upload.single("picture"), register);
app.post("/api/product/add", upload.single("image"), addProduct);
app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file);
});

// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/api/user", authRouter);
app.use("/api/product", productsRouter);
app.use("/api/category", categoriesRouter);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect("mongodb://127.0.0.1/seafood_web")
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));

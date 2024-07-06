import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import moment from "moment";
import QueryString from "qs";
import { md5 } from "js-md5";
import * as crypto from "crypto";
import axios from "axios";
import CryptoJS from "crypto-js";

import { fileURLToPath } from "url";
import mongoose, { mongo } from "mongoose";
import { register } from "./controller/AuthController.js";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import newsRouter from "./routes/news.js";
import orderRouter from "./routes/order.js";
import { addProduct } from "./controller/ProductsController.js";
import { addNews } from "./controller/NewsController.js";

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
// app.post("/api/product/update/:id", upload.single("image"), updateProduct);
app.post("/api/news/add", upload.single("image"), addNews);
app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file);
});

/* ROUTES */
app.use("/api/user", authRouter);
app.use("/api/product", productsRouter);
app.use("/api/category", categoriesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/news", newsRouter);
app.use("/api/order", orderRouter);

// APP INFO, STK TEST: 4111 1111 1111 1111
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

/**
 * methed: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/create
 * Real	POST	https://openapi.zalopay.vn/v2/create
 * description: tạo đơn hàng, thanh toán
 */
app.post("/payment", async (req, res) => {
    const embed_data = {
        //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
        redirecturl: "http://localhost:5173/payment_success",
    };

    const items = [];
    // const transID = Math.floor(Math.random() * 1000000);
    const { orderId, amount } = req.body;

    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format("YYMMDD")}_${orderId}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: amount,
        //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
        //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
        callback_url: "https://b074-1-53-37-194.ngrok-free.app/callback",
        description: `ZaloPayDemo - Payment for the order #${orderId}`,
        bank_code: "",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, {
            params: order,
        });

        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error);
    }
});

/**
 * method: POST
 * description: callback để Zalopay Server call đến khi thanh toán thành công.
 * Khi và chỉ khi ZaloPay đã thu tiền khách hàng thành công thì mới gọi API này để thông báo kết quả.
 */
app.post("/callback", (req, res) => {
    let result = {};
    console.log(req.body);
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log("mac =", mac);

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        } else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng ở đây
            let dataJson = JSON.parse(dataStr, config.key2);
            const orderId = dataJson["app_trans_id"].split("_")[1];
            console.log(
                "update order's status = success where app_trans_id =",
                dataJson["app_trans_id"]
            );

            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (ex) {
        console.log("lỗi:::" + ex.message);
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
});

/**
 * method: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/query
 * Real	POST	https://openapi.zalopay.vn/v2/query
 * description:
 * Khi user thanh toán thành công,
 * ZaloPay sẽ gọi callback (notify) tới merchant để merchant cập nhật trạng thái
 * đơn hàng Thành Công trên hệ thống. Trong thực tế callback có thể bị miss do lỗi Network timeout,
 * Merchant Service Unavailable/Internal Error...
 * nên Merchant cần hiện thực việc chủ động gọi API truy vấn trạng thái đơn hàng.
 */

app.post("/check-status-order", async (req, res) => {
    const { app_trans_id } = req.body;

    let postData = {
        app_id: config.app_id,
        app_trans_id, // Input your app_trans_id
    };

    let data =
        postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
        method: "post",
        url: "https://sb-openapi.zalopay.vn/v2/query",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(postData),
    };

    try {
        const result = await axios(postConfig);
        console.log(result.data);
        return res.status(200).json(result.data);
        /**
     * kết quả mẫu
      {
        "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
        "return_message": "",
        "sub_return_code": 1,
        "sub_return_message": "",
        "is_processing": false,
        "amount": 50000,
        "zp_trans_id": 240331000000175,
        "server_time": 1711857138483,
        "discount_amount": 0
      }
    */
    } catch (error) {
        console.log("lỗi");
        console.log(error);
    }
});

app.post("/create_payment_url", (req, res) => {
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        req.socket.remoteAddress ||
        req.socket.socket.remoteAddress;

    // let config = require("config");

    let tmnCode = "9Q204T9B";
    let secretKey = "2B331V75K3D0GQ3MI978R7246R45KWF3";
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "http://localhost:5173/home";
    let orderId = moment(date).format("DDHHmmss");
    // let { orderId, amount } = req.body;
    let amount = 100000;
    let bankCode = "NCB";

    let locale = req.body.language;
    if (locale === null || locale === "") {
        locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_IpAddr"] = "127.0.0.1";
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_OrderInfo"] = "test";
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_Version"] = "2.1.0";
    // vnp_Params["vnp_SecureHashType"] = "SHA512";
    // if (bankCode !== null && bankCode !== "") {
    //     vnp_Params["vnp_BankCode"] = bankCode;
    // }

    vnp_Params = sortObject(vnp_Params);

    // const redirectUrl = new URL(
    //     resolveUrlString(
    //         "https://sandbox.vnpayment.vn",
    //         "paymentv2/vpcpay.html"
    //     )
    // );

    let signData = QueryString.stringify(vnp_Params, { encode: false });
    // Object.entries(vnp_Params)
    //     .sort(([key1], [key2]) =>
    //         key1.toString().localeCompare(key2.toString())
    //     )
    //     .forEach(([key, value]) => {
    //         if (
    //             !value ||
    //             value === "" ||
    //             value === undefined ||
    //             value === null
    //         ) {
    //             return;
    //         }

    //         redirectUrl.searchParams.append(key, value.toString());
    //     });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
    // let signed = hmac
    //     .update(
    //         new Buffer.from(redirectUrl.search.slice(1).toString(), "utf-8")
    //     )
    //     .digest("hex");
    // redirectUrl.searchParams.append("vnp_SecureHash", signed);
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });

    res.send(JSON.stringify(vnpUrl));
    // res.redirect(vnpUrl);
});

app.get("/vnpay_return", function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    // let config = require("config");
    let tmnCode = "9Q204T9B";
    let secretKey = "2B331V75K3D0GQ3MI978R7246R45KWF3";

    // let querystring = require("qs");
    let signData = QueryString.stringify(vnp_Params, { encode: false });
    // let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
        res.render("success", { code: "97" });
    }
});

app.get("/vnpay_ipn", function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    let orderId = vnp_Params["vnp_TxnRef"];
    let rspCode = vnp_Params["vnp_ResponseCode"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    // let config = require("config");
    let secretKey = "2B331V75K3D0GQ3MI978R7246R45KWF3";
    let signData = QueryString.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

    let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
        //kiểm tra checksum
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == "0") {
                    //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if (rspCode == "00") {
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        // updateOrderPayment(orderId, "success");
                        res.status(200).json({
                            RspCode: "00",
                            Message: "Success",
                        });
                    } else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        // updateOrderPayment(orderId, "success")
                        res.status(200).json({
                            RspCode: "00",
                            Message: "Success",
                        });
                    }
                } else {
                    res.status(200).json({
                        RspCode: "02",
                        Message:
                            "This order has been updated to the payment status",
                    });
                }
            } else {
                res.status(200).json({
                    RspCode: "04",
                    Message: "Amount invalid",
                });
            }
        } else {
            res.status(200).json({ RspCode: "01", Message: "Order not found" });
        }
    } else {
        res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
    }
});

app.post("/querydr", function (req, res, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    let date = new Date();

    // let config = require("config");
    // let crypto = require("crypto");

    let vnp_TmnCode = "9Q204T9B";
    let secretKey = "2B331V75K3D0GQ3MI978R7246R45KWF3";
    let vnp_Api =
        "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;

    let vnp_RequestId = moment(date).format("HHmmss");
    let vnp_Version = "2.1.0";
    let vnp_Command = "querydr";
    let vnp_OrderInfo = "Truy van GD ma:" + vnp_TxnRef;

    let vnp_IpAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let currCode = "VND";
    let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

    let data =
        vnp_RequestId +
        "|" +
        vnp_Version +
        "|" +
        vnp_Command +
        "|" +
        vnp_TmnCode +
        "|" +
        vnp_TxnRef +
        "|" +
        vnp_TransactionDate +
        "|" +
        vnp_CreateDate +
        "|" +
        "127.0.0.1" +
        "|" +
        vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac
        .update(new Buffer.from(data, "utf-8"))
        .digest("hex");

    let dataObj = {
        vnp_RequestId: vnp_RequestId,
        vnp_Version: vnp_Version,
        vnp_Command: vnp_Command,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TxnRef: vnp_TxnRef,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_TransactionDate: vnp_TransactionDate,
        vnp_CreateDate: vnp_CreateDate,
        vnp_IpAddr: "127.0.0.1",
        vnp_SecureHash: vnp_SecureHash,
    };
    // /merchant_webapi/api/transaction
    request(
        {
            url: vnp_Api,
            method: "POST",
            json: true,
            body: dataObj,
        },
        function (error, response, body) {
            console.log(response);
        }
    );
});

function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}

function resolveUrlString(host, path) {
    host = host.trim();
    path = path.trim();
    while (host.endsWith("/") || host.endsWith("\\")) {
        host = host.slice(0, -1);
    }
    while (path.startsWith("/") || path.startsWith("\\")) {
        path = path.slice(1);
    }
    return `${host}/${path}`;
}

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect("mongodb://127.0.0.1/seafood_web")
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

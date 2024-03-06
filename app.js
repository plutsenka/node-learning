const express = require("express");
const moment = require("moment");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const { API_BASE_URL } = process.env;
const { API_KEY } = process.env;
const { PORT } = process.env;

const START_DATE = moment().format("YYYY-MM-DD");
const END_DATE = moment().add(7, "days").format("YYYY-MM-DD");
const API_SERVICE_URL = `${API_BASE_URL}?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

app.use(
    "/meteors",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/meteors": "",
        },
    })
);

app.listen(PORT, () => {
    console.log(`Starting Proxy at port ${PORT}`);
});
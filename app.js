import createError from "http-errors";
import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";
import swaggerInstall from "./swagger/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// 使用 `body-parser` 中间件来解析 JSON 格式的请求体。
app.use(bodyParser.json());
// 错误处理
app.use(function (err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
});

swaggerInstall(app);

app.use("/", indexRouter);

// 404
app.use(function (req, res, next) {
  next(createError(404));
});

const port = process.env.port || "3000";
app.listen(port, (ev) => console.log(`server start on ${port}`));

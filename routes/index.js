import express from "express";
import {
  deleteById,
  findById,
  findMany,
  insert,
  statistics,
  update,
} from "../controllers/index.js";

const router = express.Router();

/**
 * @openapi
 * /:
 *   post:
 *     summary: 添加图片信息
 *     parameters:
 *       - name: title
 *         description: 图片标题
 *         type: string
 *         in: body
 *         required: true
 *       - name: author
 *         description: 图片版权拥有者
 *         type: string
 *         in: body
 *         required: true
 *       - name: created_at
 *         description: 图片上传日期
 *         type: string
 *         in: body
 *         required: true
 *       - name: price
 *         description: 图片价格，单位：美元
 *         type: integer
 *         in: body
 *         required: true
 *       - name: license_type
 *         description: 图片授权类型（例如：`Exclusive`、`Non-exclusive`）
 *         type: string
 *         in: body
 *         required: true
 *     responses:
 *       '200':
 *         description: 返回添加成功的信息
 *       '404':
 *         description: 404 Not Found
 *       '500':
 *         description: 500 Internal Server Error
 *
 */
router.post("/", async function (req, res, next) {
  try {
    const result = await insert(req.body);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /:
 *   get:
 *     summary: 获取所有图片信息
 *     responses:
 *       '200':
 *         description: 返回数据库中所有图片的信息，包括 `id`、`title`、`author`、`created_at`、`price` 和 `license_type`
 *       '404':
 *         description: 404 Not Found
 *       '500':
 *         description: 500 Internal Server Error
 */
router.get("/", async function (req, res, next) {
  try {
    const result = await findMany();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /statistics:
 *   get:
 *     summary: 获取图片统计信息
 *     responses:
 *       '200':
 *         description: 图片的 **平均价格(avg)**、 **最高价格(max)** 和 **最低价格(min)**
 *       '404':
 *         description: 404 Not Found
 *       '500':
 *         description: 500 Internal Server Error
 */
router.get("/statistics", async function (req, res, next) {
  try {
    const result = await statistics();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /:id:
 *   get:
 *     summary: 获取单个图片信息
 *     parameters:
 *       - name: id
 *         description: 图片id
 *         type: string
 *         in: path
 *         required: true
 *     responses:
 *       '200':
 *         description: 返回单个图片的详细信息
 *       '404':
 *         description: 404 Not Found
 *       '500':
 *         description: 500 Internal Server Error
 */
router.get("/:id", async function (req, res, next) {
  try {
    const result = await findById(req.params.id);
    if (result?.length) {
      res.send(result?.[0]);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /:id:
 *   put:
 *     summary: 更新图片信息
 *     parameters:
 *       - name: id
 *         description: 图片id
 *         type: string
 *         in: path
 *         required: true
 *
 *       - name: title
 *         description: 图片标题
 *         type: string
 *         in: body
 *         required: false
 *       - name: author
 *         description: 图片版权拥有者
 *         type: string
 *         in: body
 *         required: false
 *       - name: created_at
 *         description: 图片上传日期
 *         type: string
 *         in: body
 *         required: false
 *       - name: price
 *         description: 图片价格，单位：美元
 *         type: integer
 *         in: body
 *         required: false
 *       - name: license_type
 *         description: 图片授权类型（例如：`Exclusive`、`Non-exclusive`）
 *         type: string
 *         in: body
 *         required: false
 *     responses:
 *       '200':
 *         description: 返回更新后的图片
 *       '404':
 *         description: 404 Not Found
 *       '500':
 *         description: 500 Internal Server Error
 */
router.put("/:id", async function (req, res, next) {
  try {
    const result = await update(req.params.id, req.body);
    //  如果图片不存在，返回 404 错误
    if (result?.affectedRows === 0) return next();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /:id:
 *   delete:
 *     summary: 删除图片信息
 *     parameters:
 *       - name: id
 *         description: 图片id
 *         type: string
 *         in: path
 *         required: true
 *     responses:
 *       '200':
 *         description: 返回删除成功信息
 *       '404':
 *         description: 404 Not Found
 *       '500':
 *         description: 500 Internal Server Error
 */
router.delete("/:id", async function (req, res, next) {
  try {
    const result = await deleteById(req.params.id);
    //  如果图片不存在，返回 404 错误
    if (result?.affectedRows === 0) return next();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

export default router;

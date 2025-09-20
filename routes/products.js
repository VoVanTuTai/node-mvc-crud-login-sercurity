const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

// 📌 Danh sách sản phẩm
router.get("/", async (req, res) => {
  const products = await Product.find().populate("supplier");
  res.render("products/index", { products });
});

// 📌 Form thêm sản phẩm
router.get("/add", async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("products/form", { product: null, suppliers });
});

// 📌 Xử lý thêm sản phẩm
router.post("/add", async (req, res) => {
  try {
    await Product.create(req.body);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi thêm sản phẩm!");
  }
});

// 📌 Form sửa sản phẩm
router.get("/edit/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render("products/form", { product, suppliers });
});

// 📌 Xử lý sửa sản phẩm
router.post("/edit/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi cập nhật sản phẩm!");
  }
});

// 📌 Xóa sản phẩm
router.get("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi xóa sản phẩm!");
  }
});

module.exports = router;

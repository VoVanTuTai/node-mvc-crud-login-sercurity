const express = require("express");
const router = express.Router();
const Supplier = require("../models/Supplier");

// 📌 Danh sách nhà cung cấp
router.get("/", async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers/index", { suppliers });
});

// 📌 Form thêm nhà cung cấp
router.get("/add", (req, res) => {
  res.render("suppliers/form", { supplier: null });
});

// 📌 Xử lý thêm
router.post("/add", async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect("/suppliers");
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi thêm nhà cung cấp!");
  }
});

// 📌 Form sửa
router.get("/edit/:id", async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render("suppliers/form", { supplier });
});

// 📌 Xử lý sửa
router.post("/edit/:id", async (req, res) => {
  try {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/suppliers");
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi cập nhật nhà cung cấp!");
  }
});

// 📌 Xóa
router.get("/delete/:id", async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
  } catch (err) {
    console.error(err);
    res.send("Lỗi khi xóa nhà cung cấp!");
  }
});

module.exports = router;

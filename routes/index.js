const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

router.get("/", async (req, res) => {
  const { search, supplier } = req.query;
  let query = {};
  if (search) query.name = new RegExp(search, "i");
  if (supplier) query.supplierId = supplier;

  const products = await Product.find(query).populate("supplierId");
  const suppliers = await Supplier.find();

  res.render("index", { products, suppliers, user: req.session.user });
});

module.exports = router;   // <- quan trọng

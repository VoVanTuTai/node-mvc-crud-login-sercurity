const mongoose = require("mongoose");
const Product = require("./models/Product");
const Supplier = require("./models/Supplier");

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Xóa dữ liệu cũ (nếu có)
    await Product.deleteMany({});
    await Supplier.deleteMany({});

    // Tạo Suppliers
    const suppliers = await Supplier.insertMany([
      { name: "Dell", address: "Hà Nội", phone: "0123456789" },
      { name: "Asus", address: "TP. Hồ Chí Minh", phone: "0987654321" },
      { name: "HP", address: "Đà Nẵng", phone: "0911222333" }
    ]);

    // Tạo Products
    await Product.insertMany([
      { name: "Laptop Dell XPS 13", price: 30000000, quantity: 5, supplier: suppliers[0]._id },
      { name: "Màn hình Dell 24\"", price: 5000000, quantity: 10, supplier: suppliers[0]._id },
      { name: "Laptop Asus ROG Strix", price: 35000000, quantity: 7, supplier: suppliers[1]._id },
      { name: "Mainboard Asus Prime", price: 4000000, quantity: 15, supplier: suppliers[1]._id },
      { name: "Laptop HP Envy", price: 28000000, quantity: 8, supplier: suppliers[2]._id },
      { name: "Máy in HP LaserJet", price: 6000000, quantity: 12, supplier: suppliers[2]._id }
    ]);

    console.log("🌱 Seed dữ liệu mẫu thành công!");
    process.exit();
  })
  .catch(err => console.error("❌ Lỗi kết nối:", err));

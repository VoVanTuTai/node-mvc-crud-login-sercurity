const mongoose = require("mongoose");
const Product = require("./models/Product");
const Supplier = require("./models/Supplier");

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(async () => {
    console.log("✅ Connected");

    const supplier = await Supplier.create({
      name: "Dell",
      address: "Hà Nội",
      phone: "0123456789"
    });

    await Product.create([
      { name: "Laptop Dell XPS", price: 30000, quantity: 5, supplier: supplier._id },
      { name: "Màn hình Dell 24\"", price: 5000, quantity: 10, supplier: supplier._id }
    ]);

    console.log("🌱 Seed dữ liệu xong!");
    process.exit();
  })
  .catch(err => console.error(err));

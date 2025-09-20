 
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// ====== Kết nối MongoDB ======
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ====== Cấu hình session ======
app.use(session({
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 giờ
}));

// ====== Middleware ======
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; 
    next();
  });
  
// ====== Routes ======
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const supplierRoutes = require("./routes/suppliers");
const productRoutes = require("./routes/products");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// ====== Server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});

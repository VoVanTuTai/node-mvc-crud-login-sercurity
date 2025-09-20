const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");

// 📌 Trang đăng ký
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.send("Lỗi đăng ký!");
  }
});

// 📌 Trang đăng nhập
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.send("Sai tài khoản hoặc mật khẩu!");

    req.session.user = user;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Lỗi đăng nhập!");
  }
});

// 📌 Đăng xuất
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

// 📌 Quên mật khẩu
router.get("/forgot", (req, res) => {
  res.render("auth/forgot");
});

router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send("Không tìm thấy email!");

    // Sinh password mới tạm thời
    const newPassword = crypto.randomBytes(4).toString("hex");
    user.password = newPassword;
    await user.save();

    // Thực tế sẽ gửi mail, ở đây mình in ra console
    console.log(`🔑 Mật khẩu mới của ${email}: ${newPassword}`);

    res.send("Mật khẩu mới đã được reset. Vui lòng kiểm tra console!");
  } catch (err) {
    console.error(err);
    res.send("Lỗi reset mật khẩu!");
  }
});

module.exports = router;

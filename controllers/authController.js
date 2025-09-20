const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Hiển thị form login
exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};

// Xử lý login
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    return res.redirect("/");
  }
  res.render("login", { error: "Sai tài khoản hoặc mật khẩu" });
};

// Hiển thị form register
exports.getRegister = (req, res) => {
  res.render("register", { error: null });
};

// Xử lý đăng ký
exports.postRegister = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render("register", { error: "Tên đăng nhập đã tồn tại" });
    }

    const user = new User({ username, password, email, phone });
    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Lỗi đăng ký, vui lòng thử lại" });
  }
};

// Hiển thị form quên mật khẩu
exports.getForgot = (req, res) => {
  res.render("forgot", { message: null });
};

// Xử lý quên mật khẩu (tạo token reset)
exports.postForgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.render("forgot", { message: "Không tìm thấy email" });
  }

  // Tạo reset token bằng crypto thay cho uuid
  const resetToken = crypto.randomBytes(20).toString("hex");

  // (Bạn có thể lưu resetToken này vào DB kèm thời gian hết hạn)
  console.log("Reset token cho", email, ":", resetToken);

  res.render("forgot", { message: "Mã khôi phục đã được tạo (xem console)" });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
};

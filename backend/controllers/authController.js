const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đủ thông tin.' });
  }

  try {
    const user = await User.login(email, password); // Kiểm tra email và mật khẩu
    if (!user) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: 'Đăng nhập thành công',
      token,
      name: user.name,   // Trả về tên người dùng
      email: user.email, // Trả về email người dùng
      avatar: user.avatar || 'https://default-avatar-url.png',  // Trả về avatar (nếu có)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại' });
  }
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đủ thông tin.' });
  }

  try {
    const existingUser = await User.login(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại, vui lòng chọn email khác.' });
    }

    const result = await User.register(name, email, password);
    res.status(201).json({ message: 'Đăng ký thành công', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại' });
  }
};

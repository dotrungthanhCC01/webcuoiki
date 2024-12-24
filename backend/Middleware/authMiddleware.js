const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Giả sử có mô hình User

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Lấy token từ header Authorization
  }

  if (!token) {
    return res.status(401).json({ message: 'Không có token, không được phép truy cập.' });
  }

  try {
    // Giải mã token và lấy userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Giả sử token chứa trường id của người dùng
    next(); // Chuyển tới route tiếp theo
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ.' });
  }
};

module.exports = { protect };

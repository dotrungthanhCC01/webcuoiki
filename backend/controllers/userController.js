const User = require('../models/userModel');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
};

// POST create a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }
  try {
    const newUser = await User.register(name, email, password);
    res.status(201).json({ message: 'Tạo người dùng thành công.', userId: newUser.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
};

// PUT update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await User.update(id, { name, email, password });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }
    res.json({ message: 'Cập nhật thành công.', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
};

// DELETE a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }
    res.json({ message: 'Xóa người dùng thành công.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại.' });
  }
};

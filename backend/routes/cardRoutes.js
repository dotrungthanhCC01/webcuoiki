const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware'); // Middleware bảo vệ route
const {
  getAllCards,
  getCardById,  // Kiểm tra lại việc nhập hàm này
  createCard,
  updateCard,
  deleteCard,
} = require('../controllers/cardController');

// Lấy danh sách tất cả thiệp (của người dùng hiện tại)
router.get('/', protect, getAllCards);

// Lấy chi tiết thiệp theo ID
router.get('/:id', protect, getCardById);

// Tạo thiệp mới
router.post('/', protect, createCard);

// Cập nhật thiệp
router.put('/:id', protect, updateCard);

// Xóa thiệp
router.delete('/:id', protect, deleteCard);

module.exports = router;

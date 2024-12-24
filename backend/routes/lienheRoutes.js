const express = require('express');
const { saveLienHe, getLienHe, deleteLienHe } = require('../controllers/lienheController');

const router = express.Router();

// Định nghĩa route lưu góp ý
router.post('/', saveLienHe);

// Định nghĩa route lấy tất cả góp ý
router.get('/', getLienHe);

// Định nghĩa route xóa góp ý theo ID
router.delete('/:id', deleteLienHe);

module.exports = router;

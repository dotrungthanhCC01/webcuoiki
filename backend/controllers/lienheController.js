const db = require('../configs/db');

// Lưu góp ý
const saveLienHe = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
  }

  const sql = 'INSERT INTO lienhe (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Lỗi lưu góp ý:', err);
      return res.status(500).json({ message: 'Có lỗi xảy ra khi lưu góp ý.' });
    }
    res.status(200).json({ message: 'Góp ý của bạn đã được gửi thành công!' });
  });
};

// Lấy tất cả góp ý
const getLienHe = (req, res) => {
  const sql = 'SELECT * FROM lienhe';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Lỗi lấy dữ liệu góp ý:', err);
      return res.status(500).json({ message: 'Có lỗi xảy ra khi lấy dữ liệu.' });
    }
    res.status(200).json(result);
  });
};

// Xóa góp ý theo ID
const deleteLienHe = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Vui lòng cung cấp ID của góp ý cần xóa.' });
  }

  const sql = 'DELETE FROM lienhe WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Lỗi xóa góp ý:', err);
      return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa góp ý.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Góp ý không tìm thấy.' });
    }
    res.status(200).json({ message: 'Góp ý đã được xóa thành công.' });
  });
};

module.exports = { saveLienHe, getLienHe, deleteLienHe };

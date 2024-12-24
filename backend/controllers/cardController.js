const db = require("../configs/db")

// Lấy tất cả thiệp của người dùng
exports.getAllCards = (req, res) => {
  const userId = req.userId;
  const query = 'SELECT * FROM cards WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Lỗi khi lấy danh sách thiệp:', err);
          return res.status(500).json({ message: 'Lỗi khi lấy danh sách thiệp.', error: err.message });
      }
      res.status(200).json({ message: 'Lấy danh sách thiệp thành công.', cards: results });
  });
};

// Lấy thiệp theo ID
exports.getCardById = (req, res) => {
  const cardId = req.params.id;
  const userId = req.userId;
  const query = 'SELECT * FROM cards WHERE id = ? AND user_id = ?';
  db.query(query, [cardId, userId], (err, result) => {
      if (err) {
          console.error('Lỗi khi lấy thiệp:', err);
          return res.status(500).json({ message: 'Lỗi khi lấy thiệp.', error: err.message });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy thiệp.' });
      }
      res.status(200).json({ card: result[0] });
  });
};

// Tạo thiệp mới
exports.createCard = (req, res) => {
    console.log(req.body);
    
  const { card_name, message, cover_design, page_color, font_size, font_family, is_bold, is_italic } = req.body;
  const userId = req.userId;

  console.log('uid', userId);
  

  // Kiểm tra dữ liệu đầu vào
  if (!card_name || !message) {
      return res.status(400).json({ message: 'Tên thiệp và nội dung không được để trống.' });
  }

  const query = 'INSERT INTO cards (user_id, card_name, message, cover_design, page_color, font_size, font_family, is_bold, is_italic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [userId, card_name, message, cover_design || null, page_color || '#ffffff', font_size || '18px', font_family || 'Arial', is_bold || false, is_italic || false], (err, result) => {
      if (err) {
          console.error('Lỗi khi tạo thiệp:', err);
          return res.status(500).json({ message: 'Lỗi khi tạo thiệp.', error: err.message });
      }

      const newCardId = result.insertId;
      res.status(201).json({
          message: 'Tạo thiệp thành công.',
          card: { id: newCardId, user_id: userId, card_name, message, cover_design, page_color, font_size, font_family, is_bold, is_italic }
      });
  });
};

// Xóa thiệp
exports.deleteCard = (req, res) => {
  const cardId = req.params.id;
  const userId = req.userId;

  const query = 'DELETE FROM cards WHERE id = ? AND user_id = ?';
  db.query(query, [cardId, userId], (err, result) => {
      if (err) {
          console.error('Lỗi khi xóa thiệp:', err);
          return res.status(500).json({ message: 'Lỗi khi xóa thiệp.', error: err.message });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Không tìm thấy thiệp để xóa hoặc bạn không có quyền.' });
      }

      res.status(200).json({ message: 'Xóa thiệp thành công.', cardId });
  });
};

// Cập nhật thiệp
exports.updateCard = (req, res) => {
  const { card_name, message, cover_design, page_color, font_size, font_family, is_bold, is_italic } = req.body;
  const cardId = req.params.id;
  const userId = req.userId;

  if (!card_name || !message) {
      return res.status(400).json({ message: 'Tên thiệp và nội dung không được để trống.' });
  }

  const query = 'UPDATE cards SET card_name = ?, message = ?, cover_design = ?, page_color = ?, font_size = ?, font_family = ?, is_bold = ?, is_italic = ? WHERE id = ? AND user_id = ?';
  db.query(query, [card_name, message, cover_design || null, page_color || '#ffffff', font_size || '18px', font_family || 'Arial', is_bold || false, is_italic || false, cardId, userId], (err, result) => {
      if (err) {
          console.error('Lỗi khi cập nhật thiệp:', err);
          return res.status(500).json({ message: 'Lỗi khi cập nhật thiệp.', error: err.message });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Không tìm thấy thiệp để cập nhật hoặc bạn không có quyền.' });
      }

      res.status(200).json({ 
          message: 'Cập nhật thiệp thành công.', 
          updatedCard: { id: cardId, card_name, message, cover_design, page_color, font_size, font_family, is_bold, is_italic, user_id: userId }
      });
  });
};

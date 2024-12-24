import React, { useState } from 'react';
import './LienHe.css'; // Import CSS cho trang Liên hệ

const LienHe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // Trạng thái hiển thị hiệu ứng

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/lienhe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Góp ý đã được lưu:', result.message);
        setIsSubmitted(true);
        setIsSuccessVisible(true); // Hiển thị hiệu ứng
        window.scrollTo(0, 0);

        // Ẩn hiệu ứng sau 3 giây
        setTimeout(() => setIsSuccessVisible(false), 3000);
      } else {
        alert(result.message || 'Có lỗi xảy ra khi gửi góp ý.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi góp ý:', error);
      alert('Lỗi kết nối đến máy chủ.');
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Góp Ý</h1>
      <p className="contact-description">
        Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ và góp ý với chúng tôi qua biểu mẫu dưới đây.
      </p>
      {isSuccessVisible && <div className="success-banner">Gửi góp ý thành công!</div>}
      {isSubmitted ? (
        <p className="contact-success">Cảm ơn bạn đã góp ý! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên của bạn:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Nội dung:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-btn">Gửi góp ý của bạn</button>
        </form>
      )}
    </div>
  );
};

export default LienHe;

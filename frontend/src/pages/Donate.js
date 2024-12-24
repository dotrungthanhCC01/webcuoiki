import React, { useState } from 'react';
import './Donate.css'; // Import CSS cho trang Ủng hộ

const Donate = () => {
  const [isDonated, setIsDonated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  // Xử lý khi người dùng ủng hộ
  const handleDonation = () => {
    setIsDonated(true);
    setIsSuccessVisible(true);

    // Tự động ẩn banner sau 3 giây
    setTimeout(() => {
      setIsSuccessVisible(false);
    }, 3000);

    window.scrollTo(0, 0);
  };

  // Mở modal khi nhấn vào ảnh QR
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="support-container">
      <h1 className="support-title">Ủng Hộ Chúng Tôi</h1>
      <p className="support-description">
        Chúng tôi rất biết ơn sự ủng hộ của bạn. Điều này sẽ giúp chúng tôi phát triển thêm các tính năng hữu ích hơn trong tương lai!
      </p>

      {isSuccessVisible && (
        <div className="success-banner">
          <i className="fas fa-check-circle"></i> {/* Biểu tượng */}
          Gửi ủng hộ thành công!
        </div>
      )}

      {isDonated ? (
        <div className="thank-you-message">
          <h2>Cảm ơn bạn!</h2>
          <p className="thanks">
            Chúng tôi đã nhận được sự đóng góp của bạn. Cảm ơn vì đã đồng hành và ủng hộ cho sự phát triển của chúng tôi.
          </p>
        </div>
      ) : (
        <div className="donation-section">
          <p>Hãy quét mã QR ngân hàng bên dưới để ủng hộ:</p>
          <div className="qr-code" onClick={handleOpenModal}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWOtrCWb74498LheExbrPrcstm7qsrc2l_kTlRt2EX9HGv0mnH8cs7h9gQ9houLQFz34&usqp=CAU"
              alt="Mã QR ngân hàng"
              className="qr-thumbnail"
            />
          </div>
          <p>Sau khi hoàn tất giao dịch, hãy nhấn vào nút bên dưới để xác nhận ủng hộ.</p>
          <button className="donate-btn" onClick={handleDonation}>
            Tôi đã ủng hộ
          </button>
        </div>
      )}

      {/* Modal ảnh QR */}
      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWOtrCWb74498LheExbrPrcstm7qsrc2l_kTlRt2EX9HGv0mnH8cs7h9gQ9houLQFz34&usqp=CAU"
              alt="Mã QR ngân hàng"
              className="modal-image"
            />
            <p className="modal-description">
              Mã QR này được sử dụng để thanh toán qua ngân hàng. Hãy quét mã và làm theo hướng dẫn để hoàn tất giao dịch.
            </p>
            <button className="close-btn" onClick={handleCloseModal}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;

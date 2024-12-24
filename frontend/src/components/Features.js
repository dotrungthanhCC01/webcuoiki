import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="feature-item">
        <i className="fas fa-edit feature-logo"></i>
        <h3>Thiết kế đơn giản dễ sử dụng</h3>
      </div>
      <div className="feature-item">
        <i className="fas fa-images feature-logo"></i>
        <h3>Nhiều hình ảnh và đồ họa miễn phí</h3>
      </div>
      <div className="feature-item">
        <i className="fas fa-users feature-logo"></i> {/* Đã sửa class thành className */}
        <h3>Mời bạn bè cùng tham gia thiết kế nhé!</h3>
      </div>
    </section>
  );
};

export default Features;

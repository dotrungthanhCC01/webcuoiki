import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const handleButtonClick = () => {
    alert('Vui lòng đăng nhập hoặc đăng ký để sử dụng tính năng này.');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Chào Mừng Bạn Đến Với Web Thiết Kế Thiệp Giáng Sinh!</h1>
        <p className="hero-description">
          "Hãy bắt đầu tạo những thiệp Giáng Sinh đẹp và đầy ý nghĩa để gửi tặng những người thân yêu của mình nhé!".
        </p>
        <button className="btn hero-btn" onClick={handleButtonClick}>Tạo Thiệp Giáng Sinh Ngay</button>
      </div>
      <div className="hero-image">
        <img 
          src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/463208330_841579538056815_7607299009419282483_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Gwh3dCSxR0oQ7kNvgGBCrxP&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=Aseq5Kk8K6RrYgPrLyKMPQq&oh=00_AYBrWemOYTmV-QJk0kEYkjvnx3ggTGMbbSRvK6kRdEyCEA&oe=6764A0CC" 
          alt="Ảnh Thiệp Giáng Sinh"
        />
      </div>
    </section>
  );
};

export default HeroSection;

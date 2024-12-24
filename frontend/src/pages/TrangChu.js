import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrangChu.css';


const TrangChu = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://static-cse.canva.com/blob/1812579/1600w-fiFKHa3hsUA.jpg",
    "https://marketplace.canva.com/EAD3oLca8U8/1/0/1600w/canva-%C4%91%E1%BB%8F-v%C3%A0-xanh-l%C3%A1-minh-h%E1%BB%8Da-m%C3%B3n-qu%C3%A0-ngh%E1%BB%8Bch-ng%E1%BB%A3m-ho%E1%BA%B7c-th%C3%BA-v%E1%BB%8B-gi%C3%A1ng-sinh-thi%E1%BB%87p-mzm09yjO3bo.jpg",
    "https://static-cse.canva.com/blob/1824072/1600w-Q3kdMDdZg04.jpg",
    "https://marketplace.canva.com/EAF00m1Qzi4/2/0/1600w/canva-m%C3%A0u-%C4%91%E1%BB%8F-tuy%E1%BA%BFt-h%C6%B0-hay-ngoan-gi%C3%A1ng-sinh-thi%E1%BB%87p-WEBx31WNPeU.jpg",
    "https://marketplace.canva.com/EAFP7-enJdg/2/0/1600w/canva-%C4%91%E1%BB%8F-d%E1%BB%85-th%C6%B0%C6%A1ng-b%C3%B4ng-tuy%E1%BA%BFt-h%C6%B0-hay-ngoan-thi%E1%BB%87p-gi%C3%A1ng-sinh-zz74H2eyz6g.jpg"
  ];

  // Chuyển đổi ảnh sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length); // Chuyển ảnh sau mỗi 5 giây
    }, 5000); // Mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, [images.length]); // Thêm images.length vào dependency array

  const handleButtonClick = () => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('authToken'); // Kiểm tra token
    if (token) {
      navigate('/dashboard'); // Điều hướng đến Dashboard nếu đã đăng nhập
    } else {
      alert('Vui lòng đăng nhập hoặc đăng ký để sử dụng tính năng này.');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Thiết Kế Thiệp Giáng Sinh Online</h1>
        <p className="hero-description"> " Bắt đầu tạo thiệp Giáng Sinh ngay bây giờ và gửi những lời chúc tốt đẹp nhất tới người thân yêu! "</p>
        <button className="btn hero-btn" onClick={handleButtonClick}>Bắt đầu tạo thiệp Giáng sinh</button>
      </div>
      <div className="hero-image">
        <img src={images[currentImageIndex]} alt="Ảnh mô tả" />
      </div>
    </section>
  );
};

export default TrangChu;

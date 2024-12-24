import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/trangchu', { replace: true });
    }
  }, [token, navigate]); // Chạy lại khi token thay đổi

  if (!token) {
    return null; // Không render Dashboard nếu chưa có token
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Chào mừng đến với Dashboard Giáng Sinh!</h1>
        <p>Khám phá và tạo thiệp chúc mừng độc đáo của riêng bạn.</p>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <h2>Tạo thiệp Giáng Sinh</h2>
          <p>Bắt đầu với những mẫu thiệp đẹp và tùy chỉnh theo ý bạn.</p>
          <button onClick={() => navigate('/create-card')}>Bắt đầu ngay</button>
        </div>

        <div className="card">
          <h2>Quản lý thiệp</h2>
          <p>Xem lại, chỉnh sửa hoặc xóa các thiệp bạn đã tạo.</p>
          <button onClick={() => navigate('/manage-cards')}>Quản lý thiệp</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
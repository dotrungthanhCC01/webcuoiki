import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.css';

const Header = ({ user, openLoginForm, openSignupForm, handleLogout, setUser }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/');
  };

  const ScrollToTop = () => {
    window.scrollTo(0,0);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Merry Christmas!</div>
        <nav>
          <ul>
            {user ? (
              <>
                <li><Link to="/trangChu" onClick={ScrollToTop}>Trang chủ</Link></li>
                <li><Link to="/FeaturedTemplates" onClick={ScrollToTop}>Một số mẫu nổi bật</Link></li>
                <li><Link to="/Donate" onClick={ScrollToTop}>Ủng hộ</Link></li>
                <li><Link to="/LienHe" onClick={ScrollToTop}>Góp ý</Link></li>
                <li><Link to="/manage-cards" onClick={ScrollToTop}>Quản lý thiệp</Link></li>
              </>
            ) : (
              <>
                <li><Link to="#" onClick={() => alert('Bạn cần đăng nhập để truy cập tính năng này!')}>Trang Chủ</Link></li>
                <li><Link to="#" onClick={() => alert('Bạn cần đăng nhập để truy cập tính năng này!')}>Một số mẫu nổi bật</Link></li>
                <li><Link to="#" onClick={() => alert('Bạn cần đăng nhập để truy cập tính năng này!')}>Ủng hộ</Link></li>
                <li><Link to="#" onClick={() => alert('Bạn cần đăng nhập để truy cập tính năng này!')}>Góp ý</Link></li>
                <li><Link to="#" onClick={() => alert('Bạn cần đăng nhập để truy cập tính năng này!')}>Quản lý thiệp</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {user ? (
            <>
              <div className="user-info">
                <img
                  src={'https://png.pngtree.com/png-clipart/20230112/original/pngtree-santa-claus-avatar-element-small-illustration-png-image_8903561.png'}
                  alt="Avatar"
                  className="avatar"
                />
                <div className="user-details">
                  <span className="user-name">{user.name || 'User Name'}</span>
                  <span className="user-email">{user.email || 'Email chưa có'}</span>
                </div>
              </div>
              <button className="btn logout-btn" onClick={handleLogoutClick}>Đăng xuất</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={openLoginForm}>Đăng nhập</button>
              <button className="btn signup-btn" onClick={openSignupForm}>Đăng ký</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

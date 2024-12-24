import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignupForm.css';

const LoginSignupForm = ({ type, closeModal, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    if (type === 'login') {
      console.log('Logging in with:', email, password);

      try {
        const response = await fetch('https://backend-render-com.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Logged in:', data);
          localStorage.setItem('authToken', data.token);  // Lưu token vào localStorage
          setUser({ name: data.name, avatar: data.avatar, email: data.email }); // Cập nhật state người dùng
          alert('Bạn đã đăng nhập thành công');
          closeModal();
          navigate('/trangchu', { replace: true });
        } else {
          alert(data.message || 'Thông tin đăng nhập không chính xác');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại');
      }
    } else {
      console.log('Signing up with:', name, email, password);

      try {
        const response = await fetch('https://backend-render-com.onrender.com/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Signup successful:', data);
          alert('Đăng ký thành công, vui lòng đăng nhập');
          closeModal();
          navigate('/');
        } else {
          alert(data.message || 'Lỗi đăng ký');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Đăng ký không thành công vui lòng thử lại');
      }
    }
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{type === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <input
              type="text"
              placeholder="Tên đầy đủ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <button onClick={closeModal}>Đóng</button>
      </div>
    </div>
  );
};

export default LoginSignupForm;


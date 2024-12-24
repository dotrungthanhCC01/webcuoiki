import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageCards.css';

const ManageCards = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Thông báo thành công

  useEffect(() => {

    void handleGetCard();
  }, []);

  const showSuccessMessage = (message, isWarning = false) => {
    setSuccessMessage({ text: message, type: isWarning ? 'warning' : 'success' });
    setTimeout(() => setSuccessMessage(''), 3000); // Ẩn sau 3 giây
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiệp này?')) {
      const response = await fetch(`http://localhost:5000/api/cards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken') || ""}`
        }
      }).then(res => res.json());
  
      const jsonParse = response;
      if (jsonParse?.error) {
        alert(jsonParse?.message); 
        return;
      }
  
      // Cập nhật danh sách thiệp sau khi xóa thành công
      setCards(cards.filter((card) => card.id !== id));
      console.log(`Thiệp có id: ${id} đã bị xóa.`);
    }
  };
  

  const handleEdit = (id) => {
    navigate(`/create-card/${id}`);
  };

  const handleSendCard = async (card) => {
    if (!recipientEmail) {
      showSuccessMessage('Vui lòng nhập email người nhận.', true);
      return;
    } else {
      showSuccessMessage("Bạn đã gửi thiệp thành công! Cảm ơn bạn đã sử dụng công cụ của chúng tôi!");
    }
  };

  const handleGetCard = async () => {
    const response = await fetch('http://localhost:5000/api/cards', 
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken') || ""}`
        }
      }
    ).then(res => res.json());
    const jsonParse = response;//await response.json();
    if (jsonParse?.error) {
      alert(jsonParse?.messsage);
    }
    console.log(jsonParse?.cards);
    setCards(jsonParse?.cards.map(card => ({
      ...card,
      cardName: card.card_name
    })) || []);
  }

  return (
    <div className="manage-cards">
      <h1 className="manage-title">Quản lý thiệp của bạn</h1>

      {/* Hiển thị success banner */}
      {successMessage && <div className={`success-banner ${successMessage.type}`}>{successMessage.text}</div>}

      {cards.length === 0 ? (
        <p>Bạn chưa có thiệp nào! Hãy tạo một thiệp mới.</p>
      ) : (
        <ul className="card-list">
          {cards.map((card) => (
            <li key={card.id} className="card-item">
              <div className="card-info">
                <h3>{card.cardName}</h3>
                <div className="card-actions">
                  <button onClick={() => handleEdit(card.id)}>Chỉnh sửa</button>
                  <button onClick={() => handleDelete(card.id)}>Xóa</button>
                  <button onClick={() => handleSendCard(card)}>Gửi qua email</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <input
        type="email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        placeholder="Nhập email người nhận"
      />
      <button onClick={() => navigate('/create-card')}>Tạo thiệp mới</button>
    </div>
  );
};

export default ManageCards;

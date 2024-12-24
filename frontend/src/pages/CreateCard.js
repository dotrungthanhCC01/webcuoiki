import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateCard.css';

const CreateCard = () => {
  const [cardName, setCardName] = useState('');
  const [message, setMessage] = useState('');
  const [coverDesign, setCoverDesign] = useState('');
  const [pageColor, setPageColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('18px');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL

  const [card, setCard] = useState(null);
  
  const handleSaveCard = () => {
    const confirmSave = window.confirm('Bạn có muốn lưu thiệp này không?');
    if (confirmSave) {
      const newCard = {
        id: id ? parseInt(id) : Date.now(), // If id exists, update the card, otherwise create a new card
        card_name: cardName,
        cover_design: coverDesign,
        page_color: pageColor,
        font_size :fontSize,
        font_family: fontFamily,
        is_bold: isBold,
        is_italic: isItalic,
        message,
      };
      
      if (id) {
        void editCard(newCard);
      } else {
        void createCard(newCard); 
      }
    }
  };

  const getCardById = async (id) => {
    const response = await fetch(`http://localhost:5000/api/cards/${id}`,  {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ""}`,
        "Content-Type": "application/json"
      },
    });
    const jsonParse = await response.json();
    if (jsonParse?.error) {
      alert(jsonParse?.messsage);
    }

    return jsonParse.card
  }

  const createCard = async (card) => {
    const response = await fetch('http://localhost:5000/api/cards',  {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ""}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });
    const jsonParse = await response.json();
    if (jsonParse?.error) {
      alert(jsonParse?.messsage);
    }
    alert('Thiệp chúc mừng Giáng Sinh đã được lưu!');
    navigate('/manage-cards');
  };

  const editCard = async (card) => {
    const response = await fetch(`http://localhost:5000/api/cards/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    const jsonParse = await response.json();
    if (jsonParse?.error) {
      alert(jsonParse?.message);
    } else {
      alert('Thiệp chúc mừng Giáng Sinh đã được cập nhật!');
      navigate('/manage-cards'); // Navigate to the card management page
    }
  };


  const getCoverStyle = () => {
    switch (coverDesign) {
      case 'design1':
        return {
          backgroundImage: "url('https://marketplace.canva.com/EAD-l0-D5RE/1/0/1600w/canva-%C4%91%E1%BB%8D-h%C3%A0i-h%C6%B0%E1%BB%9Bc-minh-h%E1%BB%8Da-%C3%B4ng-gi%C3%A0-noel-gi%C3%A1ng-sinh-thi%E1%BB%87p-yK6xaMCetZg.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      case 'design2':
        return {
          backgroundImage: "url('https://marketplace.canva.com/EAF00mgD57U/2/0/1600w/canva-h%E1%BB%93ng-pastel-v%C3%A0-xanh-l%C3%A1-h%C3%ACnh-th%E1%BB%A9c-t%E1%BB%B1-do-tr%E1%BB%ABu-t%C6%B0%E1%BB%A3ng-doanh-nghi%E1%BB%87p-c%C3%B4ng-ty-l%E1%BB%9Di-ch%C3%BAc-k%E1%BB%B3-ngh%E1%BB%89-l%E1%BB%85-thi%E1%BB%87p-zoXuHfKb-cw.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      case 'design3':
        return {
            backgroundImage: "url('https://marketplace.canva.com/EAD-oE89xPc/1/0/1600w/canva-xanh-d%C6%B0%C6%A1ng-%C4%91%E1%BA%ADm-gi%C3%A1ng-sinh-c%E1%BA%A3nh-quan-h%C3%ACnh-b%C3%B3ng-truy%E1%BB%81n-th%E1%BB%91ng-gi%C3%A1ng-sinh-thi%E1%BB%87p-elblrAVFjjo.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        };
        case 'design4':
          return {
              backgroundImage: "url('https://marketplace.canva.com/EAF4QRhkkrw/2/0/1600w/canva-%C4%91%E1%BB%8D-xanh-d%C6%B0%C6%A1ng-v%C3%A0-tr%E1%BA%AFng-m%C3%B9a-l%E1%BB%85-h%E1%BB%99i-%C4%91%C6%A1n-gi%E1%BA%A3n-gi%C3%A1ng-sinh-kh%E1%BB%95-ngang-thi%E1%BB%87p-cAQ6P1MjI2Q.jpg')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
          };
        case 'design5':
          return {
                backgroundImage: "url('https://marketplace.canva.com/EAGBbK86v24/2/0/1600w/canva-m%C3%A0u-%C4%91%C3%A0o-cam-v%C3%A0-xanh-l%C3%A1-ho%E1%BA%A1t-h%C3%ACnh-c%C3%B3-t%C3%ADnh-minh-h%E1%BB%8Da-c%E1%BA%A3nh-gi%C3%A1ng-sinh-l%E1%BB%9Di-ch%C3%BAc-m%E1%BB%ABng-b%C3%A0i-thuy%E1%BA%BFt-tr%C3%ACnh-gi%C3%A1ng-sinh-dOKJYOrbgR8.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
          };
        case 'design6':
          return {
                  backgroundImage: "url('https://marketplace.canva.com/EAD-cfuv7FU/1/0/1600w/canva-%C4%91%E1%BB%8F-%C4%91%C6%A1n-gi%E1%BA%A3n-vui-nh%E1%BB%99n-gi%C3%A1ng-sinh-thi%E1%BB%87p-pJ1ZVZy4t0Y.jpg')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
          };  
      // other design cases here...
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const getPageStyle = () => {
    return { backgroundColor: pageColor, color: '#000000' };
  };

  const renderPreview = () => (
    <div className="preview-container">
      <h2>Thiệp Giáng Sinh của bạn sẽ nhìn như thế này</h2>
      <div className="card-container">
        <div
          className="card-cover"
          style={{
            ...getCoverStyle(),
            height: '100%',
          }}
        />
        <div
          className="card-page"
          style={{
            ...getPageStyle(),
            fontSize,
            fontFamily,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            height: '100%',
          }}
        >
          <p>{message || 'Lời chúc của bạn sẽ hiển thị ở đây...'}</p>
        </div>
      </div>
      <div className="preview-buttons">
        <button onClick={handleSaveCard}>Xác nhận lưu</button>
        <button
          onClick={() => {
            setShowPreview(false);
            window.scrollTo(0, 0);
          }}
        >
          Chỉnh sửa lại
        </button>
      </div>
    </div>
  );

   // Load card data if editing an existing card
   useEffect(() => {
    if (id) {
      // const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
      // const cardToEdit = savedCards.find((card) => card.id.toString() === id);

      getCardById(id).then(cardToEdit => {
        if (cardToEdit) {
          setCard(cardToEdit);
          setCardName(cardToEdit.card_name);
          setMessage(cardToEdit.message);
          setCoverDesign(cardToEdit.cover_design);
          setPageColor(cardToEdit.page_color);
          setFontSize(cardToEdit.font_size);
          setFontFamily(cardToEdit.font_family);
          setIsBold(cardToEdit.is_bold);
          setIsItalic(cardToEdit.is_italic);
        }
      })
    }
  }, [id]);

  if (!card && id) {
    return <p>Loading...</p>; // Hoặc thông báo nếu không tìm thấy thiệp
  }


  return (
    <div className="create-card">
      <h1 className='create-card-title'>{id ? 'Chỉnh sửa thiệp Giáng Sinh' : 'Tạo mẫu thiệp Giáng Sinh'}</h1>
      {!showPreview ? (
        <form>
          <div className="form-group">
            <label>Đặt tên thiệp:</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Nhập tên thiệp..."
            />
          </div>
          <div className="form-group">
            <label>Chọn bìa thiệp:</label>
            <select value={coverDesign} onChange={(e) => setCoverDesign(e.target.value)}>
              <option value="">-- Chọn thiết kế --</option>
              <option value="design1">Thiết kế 1</option>
              <option value="design2">Thiết kế 2</option>
              <option value="design3">Thiết kế 3</option>
              <option value="design4">Thiết kế 4</option>
              <option value="design5">Thiết kế 5</option>
              <option value="design6">Thiết kế 6</option>
            </select>
            <div className="cover-preview" style={{ width: '400px', height: '300px', ...getCoverStyle() }} />
          </div>

          <div className="form-group">
            <label>Chọn màu trang nội dung:</label>
            <input
              type="color"
              value={pageColor}
              onChange={(e) => setPageColor(e.target.value)}
            />
            <div
              className="page-preview"
              style={{ width: '400px', height: '300px', ...getPageStyle() }}
            />
          </div>

          <div className="form-group">
            <label>Chọn font chữ:</label>
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>

          <div className="form-group">
            <label>Chọn cỡ chữ:</label>
            <input
              type="number"
              min="12"
              max="36"
              value={parseInt(fontSize)}
              onChange={(e) => setFontSize(`${e.target.value}px`)}
            />
          </div>

          <div className="form-group">
            <label>In đậm/In nghiêng:</label>
            <div className="bold-italic-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={isBold}
                  onChange={(e) => setIsBold(e.target.checked)}
                />
                <span className="bold">In đậm</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isItalic}
                  onChange={(e) => setIsItalic(e.target.checked)}
                />
                <span className="italic">In nghiêng</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Nhập lời chúc:</label>
            <textarea
              placeholder="Nhập lời chúc của bạn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                fontSize,
                fontFamily,
                fontWeight: isBold ? 'bold' : 'normal',
                fontStyle: isItalic ? 'italic' : 'normal',
                height: '200px',
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setShowPreview(true);
              window.scrollTo(0, 0);
            }}
          >
            Xem trước và lưu thiệp
          </button>
        </form>
      ) : (
        renderPreview()
      )}
    </div>
  );
};

export default CreateCard;

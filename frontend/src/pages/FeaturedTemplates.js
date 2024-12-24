import React, { useState } from 'react';
import './FeaturedTemplates.css'; // Sau khi đổi tên file CSS

// Dữ liệu mẫu thiệp, bạn có thể thay thế bằng dữ liệu thực tế hoặc lấy từ API
const featuredTemplates = [
  {
    id: 1,
    title: "Mẫu thiệp Giáng Sinh 1",
    imageUrl: "https://marketplace.canva.com/EAD-l0-D5RE/1/0/1600w/canva-%C4%91%E1%BB%8D-h%C3%A0i-h%C6%B0%E1%BB%9Bc-minh-h%E1%BB%8Da-%C3%B4ng-gi%C3%A0-noel-gi%C3%A1ng-sinh-thi%E1%BB%87p-yK6xaMCetZg.jpg", // Thay thế bằng link ảnh thực tế
    description: "Mẫu thiệp Giáng Sinh dễ thương với hình ảnh ông già Noel."
  },
  {
    id: 2,
    title: "Mẫu thiệp Giáng Sinh 2",
    imageUrl: "https://marketplace.canva.com/EAF00mgD57U/2/0/1600w/canva-h%E1%BB%93ng-pastel-v%C3%A0-xanh-l%C3%A1-h%C3%ACnh-th%E1%BB%A9c-t%E1%BB%B1-do-tr%E1%BB%ABu-t%C6%B0%E1%BB%A3ng-doanh-nghi%E1%BB%87p-c%C3%B4ng-ty-l%E1%BB%9Di-ch%C3%BAc-k%E1%BB%B3-ngh%E1%BB%89-l%E1%BB%85-thi%E1%BB%87p-zoXuHfKb-cw.jpg", // Thay thế bằng link ảnh thực tế
    description: "Mẫu thiệp Giáng Sinh sang trọng với hình ảnh cây thông Noel."
  },
  {
    id: 3,
    title: "Mẫu thiệp Giáng Sinh 3",
    imageUrl: "https://marketplace.canva.com/EAD-oE89xPc/1/0/1600w/canva-xanh-d%C6%B0%C6%A1ng-%C4%91%E1%BA%ADm-gi%C3%A1ng-sinh-c%E1%BA%A3nh-quan-h%C3%ACnh-b%C3%B3ng-truy%E1%BB%81n-th%E1%BB%91ng-gi%C3%A1ng-sinh-thi%E1%BB%87p-elblrAVFjjo.jpg", // Thay thế bằng link ảnh thực tế
    description: "Mẫu thiệp Giáng Sinh hiện đại với những họa tiết đặc biệt."
  },
  {
    id: 4,
    title: "Mẫu thiệp Giáng Sinh 4",
    imageUrl: "https://marketplace.canva.com/EAF4QRhkkrw/2/0/1600w/canva-%C4%91%E1%BB%8D-xanh-d%C6%B0%C6%A1ng-v%C3%A0-tr%E1%BA%AFng-m%C3%B9a-l%E1%BB%85-h%E1%BB%99i-%C4%91%C6%A1n-gi%E1%BA%A3n-gi%C3%A1ng-sinh-kh%E1%BB%95-ngang-thi%E1%BB%87p-cAQ6P1MjI2Q.jpg", // Thêm một link ảnh mới
    description: "Mẫu thiệp Giáng Sinh sáng tạo với thiết kế vui nhộn."
  },
  // Thêm các mẫu khác nếu cần
];

const FeaturedTemplates = () => {
  // State để quản lý modal và mẫu thiệp được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleImageClick = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true); // Mở modal khi nhấn vào ảnh
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedTemplate(null);
  };

  return (
    <div className='templates-background'>
      <h1 className="templates-title">Một số mẫu thiệp nổi bật có thể bạn sẽ thích </h1>
      <p>Đây là các mẫu thiệp Giáng Sinh nổi bật trong thời gian gần đây mà bạn có thể tham khảo.</p>
      <div className="templates-list">
        {featuredTemplates.map((template) => (
          <div key={template.id} className="template-item">
            <h2>{template.title}</h2>
            <img
              src={template.imageUrl}
              alt={template.title}
              className="template-image"
              onClick={() => handleImageClick(template)} // Sự kiện khi nhấn vào ảnh
            />
            <p>{template.description}</p>
          </div>
        ))}
      </div>

      {/* Modal Phóng to ảnh và hiển thị chi tiết */}
      {isModalOpen && selectedTemplate && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedTemplate.imageUrl}
              alt={selectedTemplate.title}
              className="modal-image"
            />
            <h2>{selectedTemplate.title}</h2>
            <p>{selectedTemplate.description}</p>
            <button onClick={closeModal}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedTemplates;

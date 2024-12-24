import React, { useState } from 'react';
import './AdditionalInfo.css';

const AdditionalInfo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Đóng nếu câu hỏi đang mở
    } else {
      setActiveIndex(index); // Mở câu hỏi mới
    }
  };

  return (
    <section className="additional-info-section">
      <div className="info-item">
        <h3>Biến kỷ niệm thành những tấm thiệp Giáng Sinh vô giá</h3>
        <p>
          Hãy quên đi những tấm thiệp Giáng Sinh phổ thông ở cửa hàng. Biến những bức ảnh yêu thích của bạn thành một tấm thiệp tùy chỉnh nổi bật nhất, với công cụ thiết kế thiệp Giáng sinh của chúng tôi.
        </p>
      </div>
      <div className="info-item">
        <h3>Làm thiệp Giáng Sinh thật đơn giản</h3>
        <p>
          Các mẫu thiết kế của chúng tôi giúp bạn dễ dàng sáng tạo, nhờ vậy bạn có thể tự ý tưởng đến tấm thiệp hoàn chỉnh chỉ trong vài phút. Dù bạn thích phong cách truyền thống hay phá cách, chúng tôi đều có mẫu thiệp Giáng Sinh dành cho bạn.
        </p>
      </div>

      {/* Câu hỏi thường gặp */}
      <div className="faq-section">
        <h3>Câu hỏi thường gặp</h3>

        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(0)}>
            <h4>Thiệp Giáng sinh nên được phủ mờ hay phủ bóng?</h4>
            <span className={`arrow ${activeIndex === 0 ? 'rotated' : ''}`}>↓</span>
          </div>
          {activeIndex === 0 && (
            <p>
              Lớp phủ mờ sẽ làm cho thiệp Giáng sinh của bạn trông hoàn thiện và chuyên nghiệp hơn một chút, trong khi lớp phủ bóng sẽ có nét tự làm hơn.
            </p>
          )}
        </div>

        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(1)}>
            <h4>Làm thế nào tạo thiệp Giáng sinh trên web này?</h4>
            <span className={`arrow ${activeIndex === 1 ? 'rotated' : ''}`}>↓</span>
          </div>
          {activeIndex === 1 && (
            <p>
              Để tạo thiệp Giáng sinh của riêng bạn, chỉ cần chọn thiết kế mà bạn cảm thấy thích trên phần mềm, và viết những lời chúc từ tận đáy lòng của mình, sau đó ấn lưu thiệp là bạn đã có tấm thiệp Giáng Sinh do chính bản thân mình tạo ra để gửi những người mà bạn yêu quý rồi!
            </p>
          )}
        </div>

        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(2)}>
            <h4>Tôi nên viết gì trong thiệp Giáng sinh?</h4>
            <span className={`arrow ${activeIndex === 2 ? 'rotated' : ''}`}>↓</span>
          </div>
          {activeIndex === 2 && (
            <p>
              Viết những tấm thiệp Giáng sinh ngập tràn lời chúc ấm áp từ gia đình. Những lời chúc kinh điển bao gồm:
              <ul>
                <li>"Chúc bạn một mùa Giáng sinh tươi sáng và tràn ngập niềm vui"</li>
                <li>"Cầu mong tất cả giấc mơ Giáng sinh của bạn thành sự thật"</li>
                <li>"Chúc bạn một đêm Giáng sinh an lành"</li>
                <li>"Chúc bạn một Giáng sinh vui vẻ và một năm mới an lành"</li>
              </ul>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdditionalInfo;

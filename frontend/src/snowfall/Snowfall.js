import { useEffect } from 'react';
import './Snowfall.css';

const Snowfall = () => {
  useEffect(() => {
    const snowflakesCount = 100; // Giảm số lượng bông tuyết
    const container = document.body;
    const fragment = document.createDocumentFragment(); // Tạo fragment để giảm thao tác DOM

    for (let i = 0; i < snowflakesCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.classList.add(`snowflake-${Math.floor(Math.random() * 4) + 1}`);

      // Giới hạn vị trí ngang từ 5% đến 95% màn hình
      const leftPosition = Math.random() * 90 + 5; // Tạo giá trị từ 5 đến 95
      snowflake.style.left = `${leftPosition}vw`;

      // Giới hạn chiều cao không chạm tới cạnh dưới
      const maxFallHeight = Math.random() * 80 + 10; // Giới hạn vị trí từ 10% đến 90%
      snowflake.style.top = `-${maxFallHeight}vh`;

      // Các thuộc tính ngẫu nhiên khác
      snowflake.style.animationDelay = `${Math.random() * 5}s`; // Thời gian bắt đầu ngẫu nhiên
      snowflake.style.animationDuration = `${Math.random() * 5 + 10}s`; // Tốc độ rơi ngẫu nhiên
      snowflake.style.opacity = `${Math.random() * 0.6 + 0.4}`; // Độ trong suốt ngẫu nhiên
      fragment.appendChild(snowflake);
    }

    container.appendChild(fragment); // Chỉ thêm vào DOM một lần

    // Xóa các bông tuyết khi component bị unmount
    return () => {
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakes.forEach(snowflake => snowflake.remove());
    };
  }, []);

  return null; // Không render gì ra UI
};

export default Snowfall;

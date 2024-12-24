const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const { errorHandler } = require('./Middleware/errorMiddleware');
const lienheRoutes = require('./routes/lienheRoutes'); // Import lienheRoutes

dotenv.config();

const app = express();

// Cấu hình CORS để cho phép các origin từ localhost và Render
const allowedOrigins = [
  'http://localhost:3000',  // Local development
  'https://react-render-com.onrender.com', // Frontend trên Render
];

app.use(cors({
  origin: function (origin, callback) {
    // Nếu không có origin (yêu cầu từ Postman, hoặc các môi trường không phải browser), cho phép
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy violation'), false);
    }
  },
  credentials: true,  // Cho phép cookie, token
}));

// Middleware để xử lý JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);  // Đảm bảo rằng cardRoutes được sử dụng đúng
app.use('/api/lienhe', lienheRoutes); // Đảm bảo rằng lienheRoutes được sử dụng đúng

// Error handling middleware
app.use(errorHandler);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

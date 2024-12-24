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

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);  // Đảm bảo rằng cardRoutes được sử dụng đúng
app.use('/api/lienhe', lienheRoutes);
// Error handling middleware
app.use(errorHandler);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

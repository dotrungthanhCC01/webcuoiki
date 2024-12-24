const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cardRoutes = require('./routes/cardRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/cards', cardRoutes);

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));

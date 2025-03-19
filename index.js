const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./utils/db');

const app = express();
app.use(express.json());

app.use('/', userRoutes);

connectDB();

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
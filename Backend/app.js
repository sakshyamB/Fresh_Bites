const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const promoRoutes = require('./routes/promoRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
   origin: process.env.FRONTEND_URL
}))

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use('/food', foodRoutes)
app.use('/orders', orderRoutes);
app.use('/promos', promoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
});
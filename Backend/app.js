const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authmiddleware");
const roleMiddleware = require("./middleware/rolemiddleware");
dotenv.config();

const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use(roleMiddleware);
connectDB();

app.use("/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
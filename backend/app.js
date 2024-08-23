require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const insertDataRoute = require("./routes/insert_data");
const dataRoutes = require("./routes/get_data");

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
  }));

app.use('/api', insertDataRoute);
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

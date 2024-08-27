require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const insertDataRoute = require("./routes/insert_data");
const dataRoutes = require("./routes/get_data");
const allDataRoutes = require("./routes/get_data");

const connectDB = require("./config/db");
connectDB();


const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL,
  process.env.FRONTEND_URL_PRODUCTION
];

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/api', insertDataRoute);
app.use('/api', dataRoutes);
app.use('/api', allDataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDB")
const carRoutes = require("./routes/carRoutes")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoute")
const app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // <-- your React app
  credentials: true,               // ✅ allow cookies
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
    connectDB();
})
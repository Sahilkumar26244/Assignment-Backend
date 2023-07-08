const express = require('express');
require('dotenv').config();

const connectDB = require("./config/db");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes")
const dealerRoutes = require("./routes/dealerRoutes")
const dealerPostRoutes = require("./routes/dealerPostRoutes")

const app = express();

app.use(express.json());
app.use(cors());

connectDB()

app.get("/", (req,res) => {
    res.send("Welcome!")
})

app.use("/user",userRoutes);
app.use("/dealer",dealerRoutes);
app.use("/dealerPost",dealerPostRoutes);


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("server is running!")
})
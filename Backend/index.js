require("dotenv").config();

const quizesRoutes = require("./routes/quizes");
const usersRoutes = require("./routes/users");

const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to DB");
  app.listen(process.env.VITE_PORT, () => {
    console.log("App is running at " + process.env.VITE_PORT);
  });
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ msg: "Quiz App" });
});

app.use("/api/quizes", quizesRoutes);
app.use("/api/users", usersRoutes);

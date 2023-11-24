require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./Model/User");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  const user = await Users.findOne({ email: email, password: password });

  if (user) {
    res.json({
      message: "User found",
      status: "success",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        id: user._id,
      }
    });
  } else {
    res.json({
      message: "User not found",
      status: "failed",
    });
  }
    
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Register data recieved",
    status: "200",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

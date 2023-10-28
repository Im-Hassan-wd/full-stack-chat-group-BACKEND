require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const groupRoutes = require("./routes/groupRoutes");
const userRoutes = require("./routes/userRoutes");
const corsOptions = {
  origin: ["https://full-stack-chat-group.vercel.app"],
  methods: ["POST", "GET", "PATCH"],
  credentials: true,
};

// express app
const app = express();

// CORS
app.use(cors(corsOptions));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/groups", groupRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

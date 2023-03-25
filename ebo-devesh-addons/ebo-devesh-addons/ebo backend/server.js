require("dotenv").config();
require("colors");
const errorHanlder = require("./middlewares/errorMiddleware");
const express = require("express");
const connectDB = require("./config/db");
const accessControl = require("./middlewares/accessControlMiddleware");
const addonRouter = require('./routes/addonRouter');
const cors = require('cors');

const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(accessControl);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRouter"));
app.use('/api/addons',addonRouter);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to ebo rest APIs" });
});
app.use(errorHanlder);

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.underline)
);

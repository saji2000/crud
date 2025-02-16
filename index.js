const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParse = require("cookie-parser");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParse());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log("listen on port: ", process.env.PORT);
});

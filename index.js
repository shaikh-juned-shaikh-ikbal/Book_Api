const express = require("express");
const app = express();
const db = require("./db");
const router = require("./router");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;


dotenv.config();
app.use(express.json());
app.use("/api", router);


db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
});

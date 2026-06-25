require("dotenv").config();

const pool = require("./db");

pool.connect()
  .then(() => {
    console.log("Database Connected Successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("Database Connection Failed:", err);
    process.exit();
  });
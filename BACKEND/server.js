require("dotenv").config();
const connectToDB = require("./src/config/database.js");
const app = require("./src/app");
const generateInterviewReport = require("./services/ai.service");

connectToDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

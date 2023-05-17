const express = require("express");
const cors = require("cors");

// Create the server
const app = express();

// Use CORS middleware
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Create routes
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend API is working" });
});

const port = 7600; // Use the PORT environment variable, or 5000 if the variable isn't set

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the server
module.exports = app;

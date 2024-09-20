import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./src/routes/routes.js"; // Make sure this path is correct

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "*", // Change this to specific domains in production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use("/", routes);

// Test route
app.get("/", (req, res) => {
  console.log("Home route accessed");
  res.status(200).send("Hello, world!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

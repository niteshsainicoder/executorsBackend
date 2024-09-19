import "dotenv/config";
import routes from "./src/routes/routes.js";
import express from "express";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.get("/home", (req, res) => {
  console.log("home");
  res.send("hlo");
});

app.listen(process.env.PORT || 3000, async () => {
  console.log(`server is running on  3000`);
});

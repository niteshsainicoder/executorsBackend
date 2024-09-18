import routes from "./src/routes/routes.js";
import express from "express";
const app = express();


 app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.get("/home", (req, res) => {
  console.log("home");
  res.send("hlo");
});

app.listen(3000, async () => {
  console.log(`server is running on  3000`);
});

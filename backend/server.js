import express, { response } from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // allows us to accept JSON data in req.body

app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, "/frontend/dist"));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

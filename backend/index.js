import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import router from "./router/ProductRouter.js";
import pdfRoute from "./router/GeneratePdfRouter.js";
// import Product from "./models/ProductModel.js";

try {
  await db.authenticate();
  console.log("Database connected...");
  // await Product.sync();
} catch (error) {
  console.log(error.message);
}

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
// app.get("/", pdfRoute, async (req, res) => {
//   try {
//     const response = await Product.findAll();
//     res.render("index", { title: "PDF Converter", response });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });
app.use("/api", router);
app.use("/api", pdfRoute);

app.listen(5000, () => console.log("server running at port 5000"));

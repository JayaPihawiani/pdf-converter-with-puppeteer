import ejs from "ejs";
import puppeteer from "puppeteer";
import Product from "../models/ProductModel.js";

export const generatePdf = async (req, res) => {
  try {
    const response = await Product.findAll();
    const html = await ejs.renderFile("./views/index.ejs", {
      response,
    });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    await page.emulateMediaType("screen");
    // download pdf
    await page.pdf({
      path: "./public/pdf/result.pdf",
      margin: { top: "70px", bottom: "70px", right: "50px", left: "50px" },
      printBackground: true,
      format: "A4",
    });
    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="result.pdf"',
    });
    res.download("./public/pdf/result.pdf", "result.pdf");
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

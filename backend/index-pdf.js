import puppeteer from "puppeteer";
import fs from "fs";

// <--- download pdf from url --->
// (async () => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const url =
//       "https://www.bannerbear.com/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/";

//     await page.goto(url, { waitUntil: "networkidle0" });

//     await page.emulateMediaType("screen");

//     await page.pdf({
//       path: "./public/pdf/result.pdf",
//       margin: { top: "100px", bottom: "100px", right: "50px", left: "50px" },
//       printBackground: true,
//       format: "A4",
//     });

//     await browser.close();
//     console.log("berhasil download pdf");
//   } catch (error) {
//     console.log(error.message);
//   }
// })();

// <--- Downloading PDF from an HTML File--->
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = fs.readFileSync("./public/html/sample.html", "utf-8");

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    await page.emulateMediaType("screen");
    // download pdf
    await page.pdf({
      path: "./public/pdf/result.pdf",
      margin: { top: "100px", bottom: "100px", right: "50px", left: "50px" },
      printBackground: true,
      format: "A4",
    });
    await browser.close();
    console.log("berhasil download pdf");
  } catch (error) {
    console.log(error.message);
  }
})();

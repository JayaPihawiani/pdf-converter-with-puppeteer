import express from "express";
import { generatePdf } from "../controller/GeneratePdf.js";

const pdfRoute = express.Router();

pdfRoute.get("/pdf", generatePdf);

export default pdfRoute;

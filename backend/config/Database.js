import { Sequelize } from "sequelize";

const db = new Sequelize("pdfconvert_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Product = db.define(
  "product",
  {
    name: DataTypes.STRING(30),
    desc: DataTypes.STRING(200),
    price: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export default Product;

import Product from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  const { name, desc, price } = req.body;
  if (!name || !desc || !price)
    return res.status(400).json({ msg: "Field tidak boleh kosong!" });
  try {
    const response = await Product.create({ name, desc, price });
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    if (!response)
      return res.status(404).json({ msg: "Product tidak ditemukan!" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: e.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({ where: { id: req.params.id } });
    if (!response)
      return res.status(404).json({ msg: "Product tidak ditemukan!" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) res.status(404).json({ msg: "Product tidak ditemukan!" });
    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: "Berhasil mengapus item." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, desc, price } = req.body;
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) res.status(404).json({ msg: "Product tidak ditemukan!" });
    await Product.update(
      { name, desc, price },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ msg: "Berhasil mengupdate item." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

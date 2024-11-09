import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getDataProduct();
  }, []);

  const editItem = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.patch(
        `http://localhost:5000/api/product/${id}`,
        {
          name,
          desc,
          price,
        }
      );
      if (resp.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const getDataProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/${id}`
      );
      setName(response.data.name);
      setDesc(response.data.desc);
      setPrice(response.data.price);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="card shadow my-3">
        <div className="card-body">
          <h4>Tambah data</h4>
          <form className="d-flex flex-column" onSubmit={editItem}>
            <label className="form-label">Nama</label>
            <input
              value={name}
              type="text"
              placeholder="enter product name"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Deskripsi</label>
            <input
              value={desc}
              type="text"
              placeholder="enter product description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <label className="form-label">Harga</label>
            <input
              value={price}
              type="text"
              placeholder="enter product price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <div>
              <button className="btn btn-primary mt-2">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

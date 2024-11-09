import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // variable
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [isAdd, isSetAdd] = useState(false);

  // function
  const togleAdd = () => (isAdd ? isSetAdd(false) : isSetAdd(true));

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      setProduct(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const cetakPDF = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:5000/api/pdf", {
        responseType: "blob", // Mengatur respons sebagai Blob
      });

      window.open("http://localhost:5000/pdf/result.pdf", "_blank");
      // // Buat URL sementara untuk file PDF
      // const url = window.URL.createObjectURL(new Blob([response.data]));

      // //download langsung tanpa masuk tab cetak pdf
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "result.pdf"); // Nama file yang akan didownload
      // document.body.appendChild(link);
      // link.click();

      // // Membersihkan URL sementara
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/product", {
        name,
        desc,
        price,
      });
      if (response.status === 201) {
        getDataProduct();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/${id}`
      );
      getDataProduct();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <button className="btn btn-primary mt-3 mb-2" onClick={togleAdd}>
            {isAdd ? "Tutup" : "Tambah data"}
          </button>
          <button className="btn btn-success mt-3 mb-2 ms-1" onClick={cetakPDF}>
            {loading ? "Loading..." : " Cetak PDF"}
          </button>
          <CSSTransition
            in={isAdd}
            timeout={300}
            classNames="slide"
            unmountOnExit
          >
            <div className="card shadow mb-3">
              <div className="card-body">
                <h4>Tambah data</h4>
                <form className="d-flex flex-column" onSubmit={addItem}>
                  <label className="form-label">Nama</label>
                  <input
                    type="text"
                    placeholder="enter product name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="form-label">Deskripsi</label>
                  <input
                    type="text"
                    placeholder="enter product description"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label className="form-label">Harga</label>
                  <input
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
          </CSSTransition>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th>No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((e, index) => (
                <tr key={e.id}>
                  <td>{index + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.desc}</td>
                  <td>{e.price}</td>
                  <td>
                    <Link to={`/edit/${e.id}`} className="btn btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger ms-1"
                      onClick={() => deleteItem(e.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

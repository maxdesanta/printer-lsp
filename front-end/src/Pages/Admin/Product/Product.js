import { useEffect, useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";

// import component
import Search from "../../../Components/Seacrh";

// import helper
import { ConvertRupiah } from "../../../Helper/ConvertRupiah";

// import css
import "./style.css";

// import fontawesome
import {
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function Product() {
  // bahan
  const [datas, setDatas] = useState([]);
  const [searchP, setSearchP] = useState("");
  const token = localStorage.getItem("Authorization");

  // proses get data
  async function getDataProduct() {
    try {
      const res = await axios.get("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // delete data
  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:5000/product/del/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getDataProduct();
    } catch (err) {
      console.log(err);
    }
  }

  //search product result 
  async function searchProductResult(value) {
    try {
      const res = await axios.get(`http://localhost:5000/search?nama_produk=${value}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect
  useEffect(() => {
    getDataProduct();
  }, [token]);

  return (
    <div className="product">
      <div className="container">
        <Search resultSearch={searchP} inputSearch={e => setSearchP(e.target.value)} formulaResult={searchProductResult} />
        <div className="add-product">
          <Link to="/products/add">
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#7f5af0", fontSize: "24px" }}
            />
          </Link>
        </div>
      </div>
      <div className="product-table">
        <table>
          <tr>
            <th>Nama</th>
            <th>Gambar</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Action</th>
          </tr>
          {datas.map((data, index) => (
            <tr key={index}>
              <td>{data.nama_produk}</td>
              <td>
                <img src={data.url_gambar} alt={data.gambar} />
              </td>
              <td>{data.deskripsi}</td>
              <td>{ConvertRupiah(data.harga_produk)}</td>
              <td>{data.stok}</td>
              <td>
                <Link to={`/products/edit/${data.id_produk}`}>
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{
                      marginRight: "12px",
                      fontSize: "18px",
                      color: "#7f5af0",
                    }}
                  />
                </Link>
                <FontAwesomeIcon
                  onClick={() => deleteProduct(data.id_produk)}
                  icon={faTrash}
                  style={{
                    fontSize: "18px",
                    color: "#7f5af0",
                    cursor: "pointer",
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

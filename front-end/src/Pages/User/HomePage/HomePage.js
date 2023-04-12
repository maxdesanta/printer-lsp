import { React, useEffect, useState } from "react";
import axios from "axios";

// import component
import CardProduct from "../../../Components/CardProduct/CardProduct";
import Search from "../../../Components/Seacrh";

// import css
import "./style.css";

export default function HomePage() {
  // bahan
  const [datas, setDatas] = useState([]);
  const [searchP, setSearchP] = useState("");
  const token = localStorage.getItem("Authorization");

  // proses ambil data
  async function getProducts() {
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

  //search product result
  async function searchProductResult(value) {
    try {
      const res = await axios.get(
        `http://localhost:5000/search?nama_produk=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, [token]);
  
  return (
    <div>
        <Search
          resultSearch={searchP}
          inputSearch={(e) => setSearchP(e.target.value)}
          formulaResult={searchProductResult}
        />
      <div className="homepage wrapper">
        {datas.map((t) => (
          <CardProduct
            image={t.url_gambar}
            text={t.nama_produk}
            price={t.harga_produk}
            imgAlt={t.gambar}
            id={t.id_produk}
          />
        ))}
      </div>
    </div>
  );
}

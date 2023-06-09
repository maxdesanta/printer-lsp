import { React, useState, useEffect } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

// import css
import "./style.css";

export default function ProductDetails() {
  // bahan
  const [detail, setDetail] = useState();
  const token = localStorage.getItem("Authorization");
  const { id } = useParams();
  const push = useNavigate();

  // proses detail produk
  async function showDetail() {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message);
      setDetail(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // rubah jadi mata uang
  // convert to rupiah
  function formatRupiah(angka) {
    let convert = angka.toString().split("").reverse().join("");
    let rp = convert.match(/\d{1,3}/g);
    rp = rp.join(".").split("").reverse().join("");
    return `Rp ${rp}`;
  }

  useEffect(() => {
    showDetail();
  }, [token, id]);

  return (
    <div>
      {detail && (
        <div className="product-details">
          <div className="product-detail-container">
            <div className="product-detail-image">
              <img src={detail.url_gambar} alt="printer" />
            </div>
            <div className="product-detail-titles">
              <div className="product-details-container-titles">
                <h2 className="product-detail-title">{detail.nama_produk}</h2>
                <h3 className="product-detail-price">
                  {formatRupiah(detail.harga_produk)}
                </h3>
              </div>
              <button className={detail.stok == 0 ? "btn-buy-disabled" : "btn-buy"} disabled={detail.stok == 0} onClick={() => push(`/product/transaction/${detail.id_produk}`)}>Buy</button>
            </div>
          </div>
          <div className="product-detail-desc">
            <h3>Deskripsi :</h3>
            <p>{detail.deskripsi}</p>
            {detail.stok == 0 ? <p>Stok : Habis</p> : <p>Stok : {detail.stok}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

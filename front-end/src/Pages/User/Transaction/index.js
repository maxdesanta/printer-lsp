import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// import component
import Button from "../../../Components/Button";

// import helper
import { ConvertRupiah } from "../../../Helper/ConvertRupiah";

// import css
import "./style.css";

export default function Transaction() {
  // bahan
  const [receive, setReceive] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [priceChange, setPriceChange] = useState("");
  const [isPrice, setIsPrice] = useState(false);
  const [amountP, setAmountP] = useState(1);

  const token = localStorage.getItem("Authorization");
  const { id } = useParams();
  const push = useNavigate();

  // proses ambil total harga
  async function totalAmount() {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message.harga_produk);
      setPrice(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // proses payment
  async function payment(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/transaksi/${id}`,
        {
          nama_penerima: receive,
          alamat_tujuan: destination,
          total_product: amountP,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      push(`/product/transaction/success`);
    } catch (err) {
      console.error(err);
    }
  }

  // proses tambah kurang produk
  async function tambahKurang(pm) {
    if (pm === "+") {
      setAmountP((prevAmount) => prevAmount + 1);
      setPriceChange((amountP + 1) * price.harga_produk);
      setIsPrice(true);

    } else if (pm === "-" && amountP > 1) {
      setAmountP((prevAmount) => prevAmount - 1);
      setPriceChange(priceChange - price.harga_produk);
    }
  }

  useEffect(() => {
    totalAmount();
  }, [id, token]);

  return (
    <div>
      <h2 className="order-titles">Order Payment</h2>
      <form className="order-container" onSubmit={payment}>
        <div className="order-customer-name">
          <label for="name">Nama Penerima</label>
          <div className="input-add">
            <input
              type="text"
              name="name-product"
              value={receive}
              onChange={(e) => setReceive(e.target.value)}
            />
          </div>
        </div>
        <div className="order-customer-destination">
          <label for="desc">Alamat Tujuan</label>
          <div className="input-add">
            <input
              type="text"
              name="desc"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        <div className="order-amount wrapper">
          <label for="desc">Jumlah yang di beli :</label>
          <div className="amount-btn wrapper">
            <div className="amount-btn-plus" onClick={() => tambahKurang("+")}>
              <p>+</p>
            </div>
            <div className="amount-number">{amountP}</div>
            <div className="amount-btn-minus" onClick={() => tambahKurang("-")}>
              <p>-</p>
            </div>
          </div>
        </div>
        {price && (
          <div className="total-payment">
            <h3>Total :</h3>
            <h3>{!isPrice ? ConvertRupiah(price.harga_produk) : ConvertRupiah(priceChange)}</h3>
          </div>
        )}
        <Button className="btn-order" textbtn="Send" accept="submit" />
      </form>
    </div>
  );
}

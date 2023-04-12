import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// import helper
import { ConvertRupiah } from "../../../Helper/ConvertRupiah";

// import css
import "./style.css";

export default function OrdersChangeStatus() {
  // bahan
  const [orderDetail, setOrderDetail] = useState();
  const [nol, setNol] = useState(0);
  const token = localStorage.getItem("Authorization");
  const push = useNavigate();
  const { id } = useParams();

  // proses tampil detail
  async function showOrderDetail() {
    try {
      const res = await axios.get(`http://localhost:5000/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message);
      setOrderDetail(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // proses update status
  async function updateStatusOrder() {
    try {
      const response = await axios.put(
        `http://localhost:5000/transaction/${id}`,
        {
          status: "accept",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      push("/orders");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    showOrderDetail();
  }, [token]);

  return (
    <div>
      {orderDetail && (
        <div className="order-changes wrapper">
          <h2>Order</h2>
          <div className="order-changes-detail wrapper">
            <div className="point-order wrapper">
              <div className="tgl-point wrapper">
                <p>Tanggal Transaksi</p>
                <p>:</p>
              </div>
              <div className="customer-point wrapper">
                <p>Nama Penerima</p>
                <p>:</p>
              </div>
              <div className="alamat-point wrapper">
                <p>Alamat</p>
                <p>:</p>
              </div>
              <div className="produk-point wrapper">
                <p>Nama Produk</p>
                <p>:</p>
              </div>
              <div className="total-point wrapper">
                <p>Jumlah</p>
                <p>:</p>
              </div>
              <div className="harga-point wrapper">
                <p>Total Harga</p>
                <p>:</p>
              </div>
              <div className="status-point wrapper">
                <p>Status</p>
                <p>:</p>
              </div>
            </div>
            <div className="content-order wrapper">
              <div className="tgl-content wrapper">
                <p>{orderDetail.tanggal_transaksi}</p>
              </div>
              <div className="customer-content wrapper">
                <p>{orderDetail.nama_penerima}</p>
              </div>
              <div className="alamat-content wrapper">
                <p>{orderDetail.alamat_tujuan}</p>
              </div>
              <div className="produk-content wrapper">
                <p>{orderDetail.nama_produk}</p>
              </div>
              <div className="total-content wrapper">
                <p>{orderDetail.jumlah_produk}</p>
              </div>
              <div className="harga-content wrapper">
                <p>{ConvertRupiah(orderDetail.total_harga)}</p>
              </div>
              <div className="status-content wrapper">
                <p>{orderDetail.status}</p>
              </div>
            </div>
          </div>
          <img src={orderDetail.url_gambar} alt={orderDetail.gambar} />
          <button className="btn-accept" onClick={updateStatusOrder}>Accept</button>
        </div>
      )}
    </div>
  );
}

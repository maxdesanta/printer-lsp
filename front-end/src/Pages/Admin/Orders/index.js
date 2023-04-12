import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import axios from "axios";

// import helper
import { ConvertRupiah } from "../../../Helper/ConvertRupiah";

// import css
import "./style.css";

// import icon
import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
  // bahan
  const [orderDatas, setOrderDatas] = useState([]);
  const [filterOrder, setFilterOrder] = useState([]);
  const [selectStatus, setSelectStatus] = useState("all");
  const token = localStorage.getItem("Authorization");

  // proses get order
  async function getOrder() {
    try {
      const res = await axios.get("http://localhost:5000/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message);
      setOrderDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  // proses filter
  async function filter() {
    if (selectStatus == "all") {
      setFilterOrder(orderDatas);
    } else {
      const filterDatas = orderDatas.filter(o => o.status === selectStatus);
      setFilterOrder(filterDatas);
    }
  }

  useEffect(() => {
    getOrder();
    filter();
  }, [token, orderDatas, selectStatus]);

  return (
    <div className="orders wrapper">
      <div className="filter-order wrapper">
        <select
          value={selectStatus}
          onChange={(e) => setSelectStatus(e.target.value)}
        >
          <option value="all">Filter</option>
          <option value="progress">Progress</option>
          <option value="accept">Accept</option>
        </select>
        {/* <FontAwesomeIcon icon={faSort} /> */}
      </div>
      <div className="orders-table">
        <table>
          <tr>
            <th>Tgl</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Produk</th>
            <th>Gambar</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {filterOrder.map((data, index) => (
            <tr key={index}>
              <td>{format(new Date(data.tanggal_transaksi), "dd MMM yyyy")}</td>
              <td>{data.nama_penerima}</td>
              <td>{data.alamat_tujuan}</td>
              <td>{data.nama_produk}</td>
              <td>
                <img src={data.url_gambar} alt={data.gambar} />
              </td>
              <td>{data.jumlah_produk}</td>
              <td>{ConvertRupiah(data.total_harga)}</td>
              <td>{data.status}</td>
              <td>
                {data.status === "accept" ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ fontSize: "24px", color: "green" }}
                  />
                ) : (
                  <Link
                    style={{ color: "#7f5af0" }}
                    className="link"
                    to={`/orders/edit/${data.id}`}
                  >
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

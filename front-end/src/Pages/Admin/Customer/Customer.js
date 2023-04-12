import { React, useState, useEffect } from "react";
import axios from "axios";

// import css
import "./style.css";

// import component
import Search from "../../../Components/Seacrh";


export default function Customer() {
  // bahan
  const [cDatas, setCDatas] = useState([]);
  const [searchC, setSearchC] = useState("");
  const token = localStorage.getItem("Authorization");

  // proses ambil data user
  async function getDataCustomers() {
    try {
      const res = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.message);
      setCDatas(res.data.message);
    } catch {}
  }

  //search customer result
  async function searchCustomerResult(value) {
    try {
      const res = await axios.get(
        `http://localhost:5000/search-user?nama_user=${value}`
      );
      setCDatas(res.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataCustomers();
  }, [token]);

  return (
    <div className="user">
      <Search resultSearch={searchC} inputSearch={(e) => setSearchC(e.target.value)} formulaResult={searchCustomerResult} />
      <div className="user-table">
        <table>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
          </tr>
          {cDatas.map((d, index) => (
            <tr key={index}>
              <td>{d.nama}</td>
              <td>{d.email}</td>
              <td>{d.alamat}</td>
              <td>{d.no_hp}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

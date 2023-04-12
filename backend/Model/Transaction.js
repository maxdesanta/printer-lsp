"use stric";

// init db
const { db, connectSql } = require("../Config/db");

class TransactionModel {
  constructor(
    id,
    tanggal_transaksi,
    nama_penerima,
    alamat_tujuan,
    nama_produk,
    jumlah_produk,
    total_harga,
    gambar,
    url_gambar,
    status
  ) {
    this.id = id;
    this.tanggal_transaksi = tanggal_transaksi;
    this.nama_penerima = nama_penerima;
    this.alamat_tujuan = alamat_tujuan;
    this.nama_produk = nama_produk;
    this.jumlah_produk = jumlah_produk;
    this.total_harga = total_harga;
    this.gambar = gambar;
    this.url_gambar = url_gambar;
    this.status = status;
  }

  // tampilkan semua transaction
  static async ShowAllTransactionModel() {
    const sqlQuery =
      "SELECT transaksi.id, transaksi.tanggal_transaksi, transaksi.nama_penerima, transaksi.alamat_tujuan, printer.nama_produk, transaksi.jumlah_produk, transaksi.total_harga, printer.gambar, printer.url_gambar, transaksi.status FROM transaksi INNER JOIN printer ON transaksi.id_produk = printer.id_produk INNER JOIN person ON transaksi.id_user = person.id";

    try {
      const response = await connectSql(sqlQuery);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new TransactionModel(
          i.id,
          i.tanggal_transaksi,
          i.nama_penerima,
          i.alamat_tujuan,
          i.nama_produk,
          i.jumlah_produk,
          i.total_harga,
          i.gambar,
          i.url_gambar,
          i.status
        );
        datas.push(data);
      });

      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }

  // show detail transaction
  static async ShowTransationByIdModel(id) {
    const sqlQuery =
      "SELECT transaksi.id, transaksi.tanggal_transaksi, transaksi.nama_penerima, transaksi.alamat_tujuan, printer.nama_produk, transaksi.jumlah_produk, transaksi.total_harga, printer.gambar, printer.url_gambar, transaksi.status FROM transaksi INNER JOIN printer ON transaksi.id_produk = printer.id_produk INNER JOIN person ON transaksi.id_user = person.id WHERE transaksi.id = 2;";

    try {
      const response = await connectSql(sqlQuery, [id]);
      const data = response[0];
      let dataById;
      if (data) {
        dataById = new TransactionModel(
          data.id,
          data.tanggal_transaksi,
          data.nama_penerima,
          data.alamat_tujuan,
          data.nama_produk,
          data.jumlah_produk,
          data.total_harga,
          data.gambar,
          data.url_gambar,
          data.status
        );
      }
      return dataById;
    } catch (err) {
      throw new Error(err);
    }
  }

  // update status
  static async UpdateStatusTransactionModel(status, id) {
    const sqlQuery = "UPDATE transaksi SET status = ? WHERE id = ?";

    try {
      const response = await connectSql(sqlQuery, [status, id]);

      if (response) {
        return "barang sudah sampai tujuan";
      }
    } catch (err) {
      console.log(err);
    }
  }

  // tampilkan transaction berdasarkan status
  static async ShowAllTransactionProgressModel(status) {
    const sqlQuery =
      "SELECT transaksi.id, transaksi.tanggal_transaksi, transaksi.nama_penerima, transaksi.alamat_tujuan, printer.nama_produk, printer.harga_produk, printer.gambar, printer.url_gambar, transaksi.status FROM transaksi INNER JOIN printer ON transaksi.id_produk = printer.id_produk INNER JOIN person ON transaksi.id_user = person.id WHERE transaksi.status = ?";
    
    console.log(sqlQuery);

    try {
      const response = await connectSql(sqlQuery, [status]);
      let datas = [];
      let data;

      response.forEach((i) => {
        data = new TransactionModel(
          i.id,
          i.tanggal_transaksi,
          i.nama_penerima,
          i.alamat_tujuan,
          i.nama_produk,
          i.harga_produk,
          i.gambar,
          i.url_gambar,
          i.status
        );
        datas.push(data);
      });

      return datas;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = { TransactionModel };

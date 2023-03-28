"use strict";

// init database
const {db, connectSql } = require("../Config/db");

// init jwt
const { hashPass, verifyPass } = require("../Helper/ConvertPass");
const jwt = require("jsonwebtoken");

class User {
  constructor(nama, email, password, no_hp, alamat, role, create_at, update_at) {
    this.nama = nama;
    this.email = email;
    this.password = password;
    this.no_hp = no_hp;
    this.alamat = alamat;
    this.role = role;
    this.create_at = create_at;
    this.update_at = update_at;
  }

  // registermodel
  static async RegisterModel(nama, email, password, no_hp, alamat, role, create_at, update_at) {
    //query sql
    const sqlQuery = "INSERT INTO person (nama, email, password, no_hp, alamat, role, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    try {
      const hasher = await hashPass(password);

      // Execute an SQL query to insert the user into the database
      const user = await connectSql(sqlQuery, [nama, email, hasher, no_hp, alamat, role, create_at, update_at]);

      if (user) {
        return 'user created';
      };
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create user");
    }
  }

  // loginmodel
  static async LoginModel(email, password) {
    try {
      // find user
      const user = await this.FindUserByEmail(email);
      console.log(user.password);
      let hashedToken;

      if (user) {
        hashedToken = user.password;
        const valid = await verifyPass(password, hashedToken);

        if (!valid) {
          return {
            user: false,
            valid,
            token: null,
            message: "wrong password"
          }
        }

        if (valid) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
    
          return {
            user: true,
            valid,
            token,
            message: "Login success"
          }
        }
      }
    } catch (err) {
      throw new Error("User not found");
    }
  }

  // find user by email
  static async FindUserByEmail(email) {
    let sqlQuery = 'SELECT * FROM person WHERE email = ?';
    let resultUser;

    try {
      const user = await connectSql(sqlQuery, [email]);
      resultUser = user[0];
      console.log(user);
      return resultUser;
    } catch (err) {
      throw new Error(`Error in findUserByEmail: ${err}`);
    }
  }

  // show profile model
  static async ShowProfileModel(id) {
    let sqlQuery = 'SELECT * FROM person WHERE id = ?';
    let resultUser;
    // console.log(sqlQuery);

    try {
      const user = await connectSql(sqlQuery, [id]);
      console.log(user)
      const results = user[0];
      resultUser = new User(results.nama, results.email, results.password, results.no_hp, results.alamat, results.role, results.create_at, results.update_at);

      // console.log(resultUser);
      return resultUser;
    } catch (err) {
      throw new Error(`Error in findUserById: ${err}`);
    }

  }
}

module.exports = { User };

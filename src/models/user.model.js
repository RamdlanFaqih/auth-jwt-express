const db = require("../configs/db");

const userModel = {
  findUsers: () => {
    try {
      return db.query("SELECT * FROM users");
    } catch (err) {
      console.log(err.message);
    }
  },
  findByEmail: (email) => {
    try {
      return db.query(`SELECT * FROM users WHERE email='${email}'`);
    } catch (err) {
      console.log(err.message);
    }
  },
  findById: (id) => {
    try {
      return db.query(`SELECT * FROM users WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
  createUser: (nama, email, password) => {
    try {
      return db.query(
        `INSERT INTO users (nama, email, password)
                VALUES ('${nama}', '${email}', '${password}')`
      );
    } catch (err) {
      console.log(err.message);
    }
  },
  updateUser: ({id, nama}) => {
    try {
      return db.query(`UPDATE users SET nama='${nama}' WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = userModel;

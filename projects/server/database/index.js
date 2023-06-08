const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "semlehoy04",
  database: "pharmacy_app",
  port: 3306,
});

db.connect((err) => {
  if (err) console.error(`Error: ${err.message}`);
  console.log(`Connected to MySQL server`);
});

const query = util.promisify(db.query).bind(db);

module.exports = { db, query };

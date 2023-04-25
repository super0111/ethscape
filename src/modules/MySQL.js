// const mysql = require("mysql")

// const MySQL = () => {

//   const con = mysql.createConnection({
//     host: "localhost", //your hostname
//     user: "root",      //your username
//     password: "",  //your password 
//     database: "ethscap2_store" //your database name
//   })

//   con.connect((error) => {
//     if (!error) {
//         console.log("connected with sql server")
//     }
//     else {
//         console.log("Error in Making Connection...", error)
//     }
//   })

//   return con
// }

// module.exports = MySQL

const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "ethscap2_store",
  password: "",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

module.exports = mysqlConnection;
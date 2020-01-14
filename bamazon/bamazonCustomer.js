let mysql = require("mysql");
let inquirer = require("inquirer");
require("console.table");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
if (err) {
    console.error("error connecting: " + err.stack)
}
loadProducts();
});
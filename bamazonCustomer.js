var mysql = require("mysql");
var inquirer = require("inquirer");

//Initiate MySQL
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "brad",

    // Your password
    password: "123456",
    database: "bamazon"
});

// Connection to database
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    //Start Bamazon by showing the products
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name);
        }
    });

    connection.end();
}
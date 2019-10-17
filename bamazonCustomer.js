//Add packages to use
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

            console.log(" Item #:     %d", res[i].item_id);
            console.log(" Item Name:  %s", res[i].product_name);
            console.log(" Price:      $%s", res[i].price);
            console.log("----------------------------------");

        }
        buyItem();
    });

    //connection.end();
}

function buyItem() {
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "number",
                message: "Which Item # would you like to buy?"
            },
            {
                name: "units",
                type: "number",
                message: "How many would you like to buy?"
            }
        ])
        .then(function (answers) {
            //Debug returned values
            //console.log(answers);

            var query = "SELECT * FROM products WHERE ?";

            //Send query to database
            connection.query(query, { item_id: answers.itemID }, function (err, res) {
                if (err) throw err;

                if (answers.units <= res[0].stock_quantity) {
                    console.log("Purchasing....");

                    //Get the total price of the order
                    var totalPrice = res[0].price * answers.units;

                    //Update the quantity in the database and tell the user the purchase price
                    var newQuantity = res[0].stock_quantity - answers.units;
                    connection.query(
                        "UPDATE products SET stock_quantity= " + newQuantity + " WHERE ? ", { item_id: answers.itemID }, function (err, res) {
                            if (err) throw err;

                            //For debugging
                            //console.log("updated: %d", newQuantity);

                            console.log("Your total price is $%d", totalPrice); //total

                            //return to choices after database is updated
                            buyItem();

                        });
                } else {
                    console.log("Not enough inventory");
                    buyItem();

                }
                
                //Debugging returned database object
                //console.log("res: %s", JSON.stringify(res));

            });

            //connection.end();

        });

}
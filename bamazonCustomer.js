//Pull in required packages/dependencies
var figlet = require('figlet');
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');


//Welcome message using figlet package
figlet('Welcome to Bamazon!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//Declares the DB you're connecting to
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon_db',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

//Connect to the DB
connection.connect(function (error) {
    if (error) throw error
    // console.log("You're connected!")

    //Display the contents of products table in the terminal
    queryAllProducts()
    function queryAllProducts() {
        connection.query("SELECT * FROM products", function (err, res) {


            //Defines the CLI table parameters
            var table = new Table({
                head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
            })

            //Print table contents in the terminal
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | ");
                table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity]);
            }

            console.log(table.toString());
            console.log("---------------------------------------------------------------------------------");
            // console.log(res)
            //     });
            // }

            // promptUserPurchase will prompt the user for the item/quantity they would like to purchase
            setTimeout(promptUserPurchase, 1000);
            function promptUserPurchase() {

                // Prompt the user to select an item
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Please enter the ID of the item you would like to purchase from the table above.',

                    },
                    {
                        // Prompt the user how many they would like to purchase
                        type: 'input',
                        name: 'quantity',
                        message: 'How many would you like to buy?',

                    }
                ]).then(function (answer) {
                    // console.log('Customer has selected: \n    item_id = ' + answer.id + '\n    quantity = ' + answer.quantity);



                    //Store the user's input in variables and calculate the total cost.
                    var item = answer.id - 1;
                    var quantity = answer.quantity;
                    var totalCost = res[item].price.toFixed(2) * quantity;
                    // console.log(item, quantity, totalCost)

                    if (quantity <= res[item].stock_quantity) {
                        console.log("Sweet! Your total cost is " + totalCost + ". Show me the money!")

                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: res[item].stock_quantity - quantity
                        }, {
                            id: res[item].id
                        }], function(err, res) {
                            // console.log(err);
                            queryAllProducts();
                        });
                    }

                    else {
                        console.log("Doh! We don't have enough stock to fill your order. Please refer to the product chart and choose an an available quantity.")
                        queryAllProducts()
                    }

                })

            }

        });
    }

    // // kills your connection to the db
    // connection.end();

})

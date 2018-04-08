//Pull in required packages/dependencies
var figlet = require('figlet');
var mysql = require('mysql');
var inquirer = require('inquirer');


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
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | ");
            }
            console.log("-----------------------------------");
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
                        name: 'itemId',
                        message: 'Please enter the ID of the item you would like to purchase.',
                        // validate: validateInput,
                        // filter: Number
                    },
                    {
                        // Prompt the user how many they would like to purchase
                        type: 'input',
                        name: 'quantity',
                        message: 'How many would you like to purchase?',
                        // validate: validateInput,
                        // filter: Number
                    }
                ]).then(function (input) {
                    console.log('Customer has selected: \n    item_id = ' + input.itemId + '\n    quantity = ' + input.quantity);


                    //Store the user's input in variables.
                    var id = input.itemId;
                    var quantity = input.quantity


                    //To do    
                    //Check the table to determine if enough inventory is available.
                  

                    //Access the table
                    // queryAllProducts()
                    // console.log(res)


                    //If enough inventory is available, then invoke a function that decrements the item's stock_quantity in the database.
                    //Else, let the user know that there's not enough inventory. 


                })

            }

        });
    }

    //kills your connection to the db
    connection.end();

})

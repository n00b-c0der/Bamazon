var inquirer = require("inquirer");
var mysql = require("mysql"); 
var Table = require("cli-table"); 
var chalk = require("chalk"); 

// Connecting to the database//
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "",
    database: "marketplace"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connected as id " + connection.threadId);  
    showProducts();
    // connection.end();
}); 

// Making a connection to the mySQL bamazon products table & displaying it using a CLI-table npm //
function showProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err; 
        var table = new Table ({
            chars: {'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                    , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                    , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                    , 'right': '║', 'right-mid': '╢', 'middle': '│'
                },
                head: ["Id", "Product Name", "Price"]
            });
            for (var i = 0; i < results.length; i++) {
                table.push([results[i].item_id, results[i].product_name, '$' + results[i].price]);
            }
            console.log(chalk.cyan.bold("~~~~~~~~~~~~~~~~~~~~~~ Welcome to Bamazon! ~~~~~~~~~~~~~~~~~~~~~~"));
            console.log(table.toString());
            askToShop(); // <--- Calling the function after the table of products displays //
        });
    }

    function askToShop() {
    inquirer.prompt ([
        {
            type: "confirm", 
            name: "purchase", 
            message: "Would you like to shop at Bamazon?"
        }

    ])
    .then(function (userResponse) {
        if (userResponse.purchase === true) {
            makePurchase ();
        } else {
            console.log(chalk.magenta.italic("Oh well, maybe next time!")),
            connection.end(); // <--- Ends the application because user does not want to buy anything // 
        }

    });

    };

    function makePurchase() {
        inquirer.prompt ([
            {
                type: "input",
                name: "buy",
                message: "What is the ID number of the product that you would like to buy?"
            },
            {
               type: "input",
               name: "quantity",
               message: "How many would you like to purchase?"
            },
        ])
        .then(function(userResponse) {
            connection.query("SELECT * FROM products WHERE ?",
            { 
               item_id: userResponse.buy
            }, function(err, results) {
                if (err) throw err;
                if (results[0].stock_quantity >= userResponse.quantity) {
                    console.log(chalk.blue("It's been purchased!"));

                    // Update the database with the updated data! //

                    var newQuantity = results[0].stock_quantity - parseInt(userResponse.quantity);
                    var totalAmount = parseInt(userResponse.quantity) * results[0].price;

                     updatedQuanity(userResponse.buy, newQuantity)
                     console.log(chalk.green("Total Amount Due: $" + totalAmount));
                     askToShop();
                } else {
                    console.log(chalk.red("Sorry, there's not enough in stock!"));
                    askToShop(); 
                }
            });
        });
    }

    function updatedQuanity(buy, quantity) {
        connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: buy
            }
        ], function (err, results){
        
        });
    }
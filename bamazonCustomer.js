// Initialize Modules
const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table');

// Initialize MySQL DB connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(err => 
    (err) ? console.log('Error:',err) : 
    console.log('Connected successfully'));

    // Query DB for list of all products to be printed to console as a table
    connection.query('SELECT item_id, product_name, stock_quantity, price FROM products', function (err, products){
        if (err) throw err;
        console.table(products)
        
        //Ask user for what product they wish to buy

        function buyProduct() {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'chooseProduct',
                    message: 'Choose a product to purchase',
                    choices: function() {
                        const output = products.map((product) => `${product.item_id}) ${product.product_name}`);
                        return output;
                    },
                    filter: choice => parseInt(choice.charAt(0)),
                },
                // Asks user for the quantity of product to be purchased
                {
                    type: 'number',
                    name: 'chooseQuantity',
                    message: 'How many do you want to buy?',
                    default: 1,
                }
            ]).then(function(answers) {

                // Shows stock and quantity of products on database
                connection.query('SELECT stock_quantity, product_sales FROM products WHERE item_id = ?', [answers.chooseProduct], function (err, res){
                    
                    if (err) throw err;

                    // Returns products information to the variables

                    const currentQuantity = res[0].stock_quantity;
                    const currentSales = res[0].product_sales;
                    const purchaseQuantity = answers.chooseQuantity;
                    const productID = answers.chooseProduct - 1;
                    const productPrice = products[productID].price;
                    const totalPrice = purchaseQuantity * productPrice;
    
                    // Checks if there is enough stock_quantity to fulfill the user's purchase

                    if (currentQuantity >= purchaseQuantity) {
                        
                        // Updates the product quantity after any sale

                        connection.query('UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?',
                            [currentQuantity - purchaseQuantity, currentSales + totalPrice, productID + 1],
                            function(err) {
                                if (err) throw err;
                                // Outputs summmary of user order to console
                                console.log(`Buying ${purchaseQuantity} ${products[productID].product_name}s for ${productPrice} each for a total price of ${totalPrice}`);
                                startOver();
                            }
                            
                        );
                    }
                    else {
                        console.log('Uh oh! Not enough inventory!')
                        startOver();
                    };
                    function startOver() {
                        inquirer.prompt([
                            {
                                type: 'confirm',
                                name: 'startOver',
                                message: 'Purchase another product?'
                            }
                        ]).then(function(answer){
                            if (answer.startOver === true) {
                                buyProduct();
                            }
                            else {
                                connection.end();
                        };
                    });
                };
            });
        });
    };
    
    // Call main input loop
    buyProduct();
});
    
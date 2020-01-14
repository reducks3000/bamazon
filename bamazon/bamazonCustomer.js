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
connection.query('SELECT item_id, product_name, price FROM products', function (err, products){
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

        ])
    }

});

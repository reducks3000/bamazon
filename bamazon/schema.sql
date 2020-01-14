DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id int NOT NULL PRIMARY KEY auto_increment,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Apple iPhone 11", "Electronics", 1,100, 20),
  ("Super Mario Oddyssey", "Video Games", 59.99, 100),
  ("Apple Sauce", "Food and Drink", 7.00, 200),
  ("Jean Shorts", "Apparel", 35.00, 20),
  ("Worn Denim Jeans", "Apparel", 54.25, 35),
  ("Lighter", "Necessities", 12.00, 40),
  ("Bram Stoker's Dracula", "Films", 11.00, 20),
  ("Resident Evil", "Films", 7.50, 2),
  ("Monopoly", "Board Games", 30.50, 35),
  ("Yahtzee", "Board Games", 19.95, 23);
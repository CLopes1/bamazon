CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2),
stock_quantity INTEGER(11)
)



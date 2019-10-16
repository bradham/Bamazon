DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,                           -- cost to customer
  stock_quantity INT NULL,                            -- how much of the product is available in stores
  PRIMARY KEY (item_id)
);

USE bamazon;
SELECT * from products;
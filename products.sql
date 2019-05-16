DROP DATABASE IF EXISTS marketplace; 

CREATE DATABASE marketplace; 

USE marketplace; 

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL, 
product_name VARCHAR (200), 
department_name VARCHAR (200), 
price DECIMAL(8,2),
stock_quantity INTEGER (50),
PRIMARY KEY (item_id)
); 

USE marketplace; 
SELECT * from products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Herbal Essences Argan Oil of Morocco Shampoo & Conditioner Pack", "Health & Beauty", 9.16, 8), ("Crest  Optimum Whitening Tootpaste", "Personal Care", 3.51, 17),
("Milk and Honey by Rupi Kaur", "Books", 7.99, 10), 
("iPhone 8 Rose Gold", "Electronics", 899.99, 3), 
("Nespresso Coffee and Espresso Maker", "Kitchen", 147.00, 12),
("Armani Exchange Black Logo Long-sleeve Sweatshirt", "Apparel", 78.36, 9),
("Downy April Fresh Fabric Softner", "Household Items", 5.65, 13),
("Spicy Sriracha-Ranch Kale Salad", "Food", 4.99, 6), 
("Huggies 80-count Baby Wipes", "Personal Care", 3.49, 10), 
("essie Wild Nude Nail Polish", "Cosmetics", 9.00, 16);


DELETE from marketplace.products WHERE item_id = 11
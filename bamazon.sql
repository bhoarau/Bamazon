DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    ItemID MEDIUMINT AUTO_INCREMENT NOT NULL,
    Product VARCHAR(100) NOT NULL,
    Department VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT(10) NOT NULL,
    primary key(ItemID)
);


INSERT INTO Products(Product,Department,Price,Stock)
VALUES ("Arrow","ELECTRONICS",29.99,50),
    ("The Flash","ELECTRONICS",29.99,50),
    ("Cherios","GROCERY",5.50,25),
    ("rolex","JEWLERY",1175.00,5),
    ("Jordan XIII","SHOES",99.99,35),
    ("Camel Pack","SPORTS",19.99,40),
    ("Key fob","ELECTRONICS",150.00,25),
    ("Playstation 4","ELECTRONICS",249.99,40),
    ("Samsung 4k tv","ELECTRONICS",399.99,25),
    ("Leather sofa","HOME",299.99,15);

select * from Products;

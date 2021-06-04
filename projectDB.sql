CREATE DATABASE projectDB;
USE projectDB;

CREATE TABLE manufacturers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    phone VARCHAR(255),
    `address` VARCHAR(255),
    email VARCHAR(255),
    note VARCHAR(255)
);

CREATE TABLE product_states(
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255)
);
CREATE TABLE transaction_states(
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255)
);
CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    manufacturer_id INT,
    state_id INT,
    note VARCHAR(255),
    original_price INT,
    sell_price INT,
    image VARCHAR(255) default 'image_upload.png',
    discount int DEFAULT 0,
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES product_states(id) ON DELETE CASCADE
);

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);


CREATE TABLE categories_products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    category_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ;

CREATE TABLE sizes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
) ;
CREATE TABLE colors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE colors_products_sizes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    color_id INT,
    product_id INT,
    size_id INT,
    count INT,
    FOREIGN KEY(color_id) REFERENCES colors(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    image VARCHAR(255),
    position INT,
    point INT
);



CREATE TABLE receipts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    manufacturer_id INT,
    staff_id INT,
    total INT,
    note VARCHAR(255),
    created DATETIME,
    modified DATETIME,
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE receipt_details(
    id INT AUTO_INCREMENT PRIMARY KEY,
    receipt_id INT,
    product_id INT,
    size_id INT,
    color_id INT,
    count INT,
    created DATETIME,
    modified DATETIME,
    FOREIGN KEY (receipt_id) REFERENCES receipts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT ,
    staff_id INT,
    state_id INT,
    total INT,
    point INT,
    note VARCHAR(255),
    created DATETIME,
    modified DATETIME,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (state_id) REFERENCES transaction_states(id) ON DELETE CASCADE
);

CREATE TABLE order_details(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT ,
    product_id INT,
    size_id INT,
    color_id INT,
    count INT,
    created DATETIME,
    modified DATETIME,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY(size_id) REFERENCES sizes(id) ON DELETE CASCADE,
    FOREIGN KEY(color_id) REFERENCES colors(id) ON DELETE CASCADE
);

INSERT INTO users(name,email,password,phone,address,image,position,point) VALUES
("Huy Long", "cabo@gmail.com", "1234", "03321213", "Vinh, Nghe An", "abc.png",3, 11111 ),
("Dinh TUan", "TuanDinh@gmail.com", "1234", "03321123128", "Ha Tinh", "TuanDinh.png",2, 23000),
("Hai Pham", "PH@gmail.com", "1234", "8526113", "Tuyen QUang", "Hai.png",2, 5000000 ),
("Tien", "TIen@gmail.com", "1234", "015421214", "Ha Nam", "Tien.png",1, 250000 ),
("Than Quang Khoat", "TQK@gmail.com", "1234", "3478232", "Ha Noi", "Khoat.png",1, 20000 ),
("Son Tung", "ST@gmail.com", "1234", "2131321", "Thai Binh", "ST.png",1, 11111 ),
("Dung", "DPS@gmail.com", "1234", "9991", "Hai Duong", "Dung.png",2, 222444 ),
("Thu", "PT@gmail.com", "1234", "113", "Thanh Hoa", "Thu.png",1, 43434343 ),
("KhachHang", "KH@gmail.com", "1234", "112123", "Thanh Hoa", "KH.png",3, 43434343 ),
("Ngoc Trinh", "NT@gmail.com", "1234", "11112222233333", "Ho Chi Minh", "NT.png",1, 100000 );

INSERT INTO manufacturers(name,phone,address,email,note) VALUES
("Bitis", "033232323", "Vinh", "Bitis@gmail.com","Hoi chan"),
("NIKE", "0332q323", "Ha Noi", "NIKE@gmail.com","absbsa"),
("Vans", "121312", "Vinh", "Vans@gmail.com","CO chu V"),
("Gucci", "1123121", "Ho Chi Minh", "Gucci@gmail.com","Sang chanh"),
("Adidas", "92221212", "Vinh", "adidas@gmail.com","The thao nang dong");

INSERT INTO product_states(name) VALUES
("Selling"),
("Out Of Stock"),
("Stop Selling");

INSERT INTO transaction_states(name) VALUES
("InProgress"),
("Success"),
("Fail");

INSERT INTO products(name,manufacturer_id,state_id,note, original_price, sell_price,image,discount) VALUES
("Zoom Winflo 7", 2, 1, "aa", 300000, 1000000, "Zoom-Winflo-7.jpeg", 10),
("Zoom Freak 2", 2, 1, "aa", 10000, 1000000, "Zoom-Freak-2.jpeg", 5),
("Air MAX 2090", 2, 1, "aa", 350000, 534333, "Air-Max-2090.jpeg", 5),
("Kyrie 6", 2, 1, "aa", 10000, 20000, "Kyrie-6.jpeg", 50),
("Kyrie Flytrap III", 2, 1, "aa", 10000, 1000000, "Kyrie-Flytrap-III.jpeg", 50),
("Nike Jordan", 2, 1, "aa", 2000, 4000, "Nike-Jordan.jpeg", 3),
("Stan Smith", 5, 1, "aa", 320000, 9800000, "Stan-Smith.jpeg", 10),
("X9000L3", 5, 1, "aa", 1000000, 2000000, "X9000L3.jpeg", 20),
("Ultraboost 21", 5, 1, "aa", 10000, 1000000, "Ultraboost-21.jpeg", 15),
("Alphatorsion", 5, 1, "aa", 76000, 130000, "Alphatorsion.jpeg", 5),
("Samba Vegan", 5, 1, "aa", 890000, 1000000, "Samba-Vegan.jpeg", 10),
("NITEBALL", 5, 1, "aa", 80000, 100000, "NITEBALL.jpeg", 50),
("Superstar", 5, 1, "aa", 200000, 3500000, "Superstar.jpeg", 5),
("Vietnam Arising R3 Gold DSMH05500NAU", 1, 1, "aa", 10000, 1000000, "Vietnam-Arising-R3-Gold-DSMH05500NAU.jpeg", 50),
("Classic Blue DSMH05000XDG", 1, 1, "aa", 10000, 1000000, "Classic-Blue-DSMH05000XDG.png", 50),
("Slip On", 3, 1, "aa", 243000, 1002123, "Slip-On.png", 5),
("Old Skool", 3, 1, "aa", 23000, 45000, "Old-Skool.jpeg", 50),
("Checkerboard Slip On", 3, 1, "aa", 15000, 170000, "Checkerboard-Slip-On.png", 50),
("Authentic", 3, 1, "aa", 10000, 20000, "Authentic.jpeg", 15),
("Sk8 Hi", 3, 1, "aa", 500000, 1000000, "Sk8-Hi.png", 50);

INSERT INTO categories(name) VALUES
("Low Top"),
("High Top"),
("Athletic"),
("Slip-ons"),
("High heels");

INSERT INTO categories_products(product_id, category_id) VALUES
(1,2),
(1,5),
(2,4),
(3,1),
(4,5),
(4,2),
(5,5),
(6,2),
(7,2),
(7,3),
(8,3),
(8,1),
(9,3),
(10,3),
(11,2),
(11,4),
(12,5),
(13,1),
(14,5),
(14,2),
(15,3),
(16,4),
(17,5),
(18,2),
(18,1),
(19,2),
(20,3);

INSERT INTO colors(name) VALUES
("Red"),
("Blue"),
("White"),
("Green"),
("Black"),
("Pink"),
("Bn");

INSERT INTO sizes(name) VALUES
("35"),
("36"),
("37"),
("38"),
("39"),
("40");



INSERT INTO colors_products_sizes(product_id,size_id,color_id,count) VALUES
(1,1,2,0),
(1,2,6,0),
(1,3,2,0),
(2,1,2,0),
(2,6,7,0),
(3,4,2,0),
(3,5,6,0),
(4,1,2,0),
(4,4,6,0),
(4,3,2,0),
(5,1,6,0),
(6,3,2,0),
(6,1,2,0),
(7,4,6,0),
(7,3,1,0),
(7,3,6,0),
(8,3,6,0),
(8,1,2,0),
(9,2,4,0),
(9,1,1,0),
(10,2,1,0),
(11,3,7,0),
(12,5,5,0),
(12,1,2,0),
(13,3,2,0),
(13,5,6,0),
(13,6,2,0),
(14,1,2,0),
(15,1,2,0),
(16,1,2,0),
(17,1,2,0),
(18,1,2,0),
(19,3,2,0),
(20,4,6,0);





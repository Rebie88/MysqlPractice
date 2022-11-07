const mysql = require('mysql');
const express = require('express');
var app = express();

//Middle ware to extract info from the html
app.use(express.urlencoded({
  extended: true,
}));
//or you can import body-parser
// const bodyparser = require("body-parser");
// var cors = require("cors");
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cors());

//Create connection to database 
var mysqlConnection = mysql.createConnection({
  user: "myDBuser",
  password: "myDBuser",
  host: "localhost",
  database: "myDB"
});

mysqlConnection.connect((error) => {
  if (error) console.log(error);
  else console.log("connection is successful");
});
//Install: Create the tables necessary
app.get("/install", (req, res) => {
  let message = "Tables Created";
  let createProducts = `CREATE TABLE if not exists Products(
      product_id int auto_increment,
      product_url varchar(255) not null,
      product_name varchar(255) not null,
      PRIMARY KEY (product_id)
  )`;
  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
    let createUser = `CREATE TABLE if not exists User(
      user_id int auto_increment,
      User_name varchar(255) not null,
      User_password varchar(255) not null,
      PRIMARY KEY (user_id)
  )`;
    let createProduct = `CREATE TABLE if not exists Product(
      id int auto_increment,
      Name varchar(255) not null,
      Description TEXT not null,
      Price varchar(255) not null,
      Monthly_plan varchar(255) not null,
      url varchar(255) not null,
      img varchar(255) not null,
      PRIMARY KEY (id)
  )`;
  mysqlConnection.query(createProducts, (err, results, fields) => {
    if (err) console.log(err);
  });
  mysqlConnection.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(err);
  });
  mysqlConnection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });
  mysqlConnection.query(createUser, (err, results, fields) => {
    if (err) console.log(err);
  });
    mysqlConnection.query(createProduct, (err, results, fields) => {
    if (err) console.log(err);
  });
  res.end(message);
});

// Insert a new product
app.post("/add-product", (req, res) => {

  console.table(req.body);
  // let Id = req.body.iphoneId; //we don't need to add it b/c it is auto_increment 
  // let url = req.body.url;
  // let iPhoneName = req.body.iPhoneName;
  // let sqlAddToProducts = "INSERT INTO Products (product_url, product_name) VALUES ('" +
  //   url + "', '" + iPhoneName + "' )";
  
  //or we can write as below using destructuring and string literals 
  const { url, iPhoneName } = req.body;

  let sqlAddToProducts = `INSERT INTO Products (product_url, product_name) VALUES ('${url}', '${iPhoneName}')`;


  mysqlConnection.query(sqlAddToProducts, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  res.end("Product added");
});


//Listening port
app.listen(3001, () => console.log("Listening at: 3001"));
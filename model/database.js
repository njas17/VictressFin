require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "sejiwa",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
	  "DROP DATABASE IF EXISTS sejiwa ; CREATE DATABASE sejiwa; USE sejiwa; "
    + "CREATE TABLE `organizations` (`oid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` VARCHAR(255) NOT NULL, `address1` VARCHAR(255), `address2` VARCHAR(255), `website` VARCHAR(255) NOT NULL, `telephone` VARCHAR(25), `busregistration_num` VARCHAR(50), `taxnum` VARCHAR(50)); "
    + "CREATE TABLE `users` (`uid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `email` VARCHAR(100) NOT NULL UNIQUE, `firstname` VARCHAR(100) NOT NULL, `lastname` VARCHAR(100) NOT NULL, `password` VARCHAR(200) NOT NULL, `group` VARCHAR(50) NOT NULL DEFAULT 'organizers', `organization_id` INT, `contactnum` VARCHAR(50), `address1` VARCHAR(255), `address2` VARCHAR(255), `state` VARCHAR(100), `country` VARCHAR(100) DEFAULT 'Malaysia', `postcode` VARCHAR(50), `nric` VARCHAR(255), `nextsignup` BOOLEAN, FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`oid`)); "
    + "CREATE TABLE `events` (`eid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` VARCHAR(255) NOT NULL, `datefrom` DATE NOT NULL, `dateto` DATE NOT NULL, `status` VARCHAR(20) NOT NULL, `description` TEXT NOT NULL, `images` TEXT, `organizer_id` int NOT NULL, `contactname` VARCHAR(255), `contactnum` VARCHAR(255), `totalvolunteer` INT NOT NULL, FOREIGN KEY (`organizer_id`) REFERENCES `users`(`uid`)); "
    + "CREATE TABLE `applications` (`aid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `event_id` INT NOT NULL, `user_id` INT NOT NULL, `dateapp` DATE NOT NULL, `dateproc` DATE, `appstatus` VARCHAR(15) NOT NULL DEFAULT 'new', FOREIGN KEY (`event_id`) REFERENCES `events`(`eid`), FOREIGN KEY (`user_id`) REFERENCES `users`(`uid`)); "
    
  let sqlInsert = "";
  
  con.query(sql + sqlInsert, function(err, result) {
    if (err) throw err;
    console.log("Tables creation with dummy data for 'sejiwa' db was successful!");

    console.log("Closing...");
  });



  con.end();
});

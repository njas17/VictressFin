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

  let sql = "DROP DATABASE IF EXISTS sejiwa ; CREATE DATABASE sejiwa; USE sejiwa; "
    + "CREATE TABLE `organizations` (`oid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`name` varchar(255) NOT NULL,`address1` varchar(255),`address2` varchar(255),`website` varchar(255) NOT NULL,`telephone` varchar(25),`busregistration_num` varchar(50),`taxnum` varchar(50)); "
    + "CREATE TABLE `users` (`uid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`email` varchar(100) NOT NULL UNIQUE,`firstname` varchar(100) NOT NULL,`lastname` varchar(100) NOT NULL,`password` varchar(200) NOT NULL,`group` varchar(50) NOT NULL DEFAULT 'organizers',`organization_id` int,`contactnum` varchar(50),`address1` varchar(255),`address2` varchar(255),`state` varchar(100),`country` varchar(100) DEFAULT 'Malaysia', `postcode` varchar(50), `googlesso` BOOLEAN DEFAULT 0,	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`oid`)); "
    + "CREATE TABLE `events` (`eid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`organizer_id` int NOT NULL,`name` varchar(255) NOT NULL, dateto DATE, datefrom DATE, `closingdate` DATE,`location` varchar(200),`status` varchar(20) DEFAULT 'active',`description` TEXT NOT NULL,`images` TEXT,`contactname` varchar(255),`contactnum` varchar(100), `contactemail` varchar(200), `totalvolunteer` int NOT NULL,   FOREIGN KEY (`organizer_id`) REFERENCES `users`(`uid`)); "
    + "CREATE TABLE `volunteers` (`vid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`event_id` int NOT NULL,`email` varchar(100) NOT NULL,`firstname` varchar(100) NOT NULL,`lastname` varchar(100) NOT NULL,`contactnum` varchar(50),`address1` varchar(255),`address2` varchar(255),`state` varchar(100),	`country` varchar(100) DEFAULT 'Malaysia',	`postcode` varchar(50),	`nextsignup` BOOLEAN,`dateapp` DATE,`dateproc` DATE,`status` varchar(15) DEFAULT 'new', FOREIGN KEY (`event_id`) REFERENCES `events`(`eid`)); "
    
  let sqlInsert = "insert into organizations (name, website, telephone) values ('Cikgu Harry Bikal', 'https://www.thestar.com.my/news/nation/2020/07/13/superhero-teacher-looking-for-volunteers', ''), ('Altruistik Malaysia', 'https://myaltruistik.wixsite.com/myaltruistik', 'myaltruistik@gmail.com'), ('Caremongering Malaysia', 'https://www.facebook.com/groups/653716671867349/', '+60196691881'), ('House of Hope', 'https://www.facebook.com/houseofhopepenang', '04-826 4826'), ('Personal/Individual', 'N/A', null), ('Others', 'N/A', null); "
    + "insert into users (email, firstname, lastname, password, organization_id, googlesso) values ('cikguharry@gmail.com', 'Harry', 'Baikal', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 1, 0), ('myaltruistik@gmail.com', 'Logesh Kumar ', 'Sethuraman', '$2b$07$LwVuRvHH7comkN2KcH3D1emTZA6LnhpNQpVpVQaE0DAfE7EUzMHbW', 2, 0), ('esmemarie.sultan@gmail.com', 'Esme', 'S.', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 4, 1), ('jannahworks@gmail.com', 'Jannah', 'A.', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 5, 1);"
    + "insert into events (name, closingdate, status, description, organizer_id, contactname, contactnum, totalvolunteer, images) values ('Programme Charity Hike 2020', '2021-12-1', 'active', 'Malaysians who are moved by the inspiring story of a teacher that carried a refrigerator for 10km on foot to a remote school are encouraged to join him on another arduous task. JCI Kota Kinabalu, a non-governmental organisation, has donated more than 20 mattresses and hostel items for the school’s pupils. But there is one major obstacle – transporting the items to the school. So, if you are physically fit and want to join the next hike with this arduous task - click Apply to register.', 1, 'Mary Michael', '601332444000', 8, 'https://images.unsplash.com/photo-1596817120625-7695129a2c92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'), ('Humanitarian, Disaster & Crisis Management Volunteer Recruitment', '2020-02-29', 'active', 'The Altruistik Malaysia Humanitarian, Disaster, & Crisis Management open the opportunity for all legally resident in Malaysia, to carry out an national/international volunteer service in Malaysia, Europe, Africa, Asia or South America affected area. Interested applicant click on Apply button to register.', 2, 'Tommy Lee', '603700012', 6, 'https://previews.123rf.com/images/rawpixel/rawpixel1506/rawpixel150620581/41465112-volunteer-charity-help-sharing-giving-donate-assisting-concept.jpg'), ('Autism (ASD) Activist Recruitment', '2020-02-29', 'active', 'Call for State(Malaysia) Autism Spectrum Disorder SDG4 Activist. This project envisions to refocused effort to improve the quality of the education and acceptance among-st the community towards ASD. Acceptance in education along the lines of gender, urban-rural location and other dimensions still run deep, and more investments in education infrastructure are required.This campaign intends to enroll 80 State Activist across the Malaysia and raise voice in form of solidarity.', 2, 'Salina Salleh', '6037000011', 8, 'h'); "
    + "insert into volunteers (event_id, email, firstname, lastname, contactnum, dateapp, status) values (1, 'volone@gmail.com', 'Misty', 'Green', '123456789', NOW() - INTERVAL 1 DAY, 'approved'), (1, 'voltwo@gmail.com', 'Delima', 'Merah', '232433554', NOW() - INTERVAL 2 DAY, 'new'), (1, 'volthree@gmail.com', 'Selamat', 'Lizam', '788866544', NOW() - INTERVAL 2 DAY, 'new'), (1, 'volfour@gmail.com', 'Moon', 'Tan',  '976969453', NOW() - INTERVAL 3 DAY, 'new');";

  con.query(sql + sqlInsert, function(err, result) {
    if (err) throw err;
    console.log("Tables creation with dummy data for 'sejiwa' db was successful!");

    console.log("Closing...");
  });

  con.end();
});

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
  database: DB_NAME || "focaldb",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

// " "
  let sql = "DROP DATABASE IF EXISTS focaldb ; CREATE DATABASE focaldb; USE focaldb; CREATE TABLE `organizations` (`oid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`name` varchar(255) NOT NULL,`address1` varchar(255),`address2` varchar(255),`website` varchar(255) NOT NULL,`telephone` varchar(25),`busregistration_num` varchar(50),`taxnum` varchar(50)); "
    + "CREATE TABLE `users` (`uid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`email` varchar(100) NOT NULL UNIQUE,`firstname` varchar(100) NOT NULL,`lastname` varchar(100) NOT NULL,`password` varchar(200) NOT NULL,`group` varchar(50) NOT NULL DEFAULT 'organizers',`organization_id` int,`contactnum` varchar(50),`address1` varchar(255),`address2` varchar(255),`state` varchar(100),`country` varchar(100) DEFAULT 'Malaysia', `postcode` varchar(50), `googlesso` BOOLEAN DEFAULT 0,	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`oid`)); "
    + "CREATE TABLE `events` (`eid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`organizer_id` int NOT NULL,`name` varchar(255) NOT NULL, dateto DATE, datefrom DATE, `closingdate` DATE,`location` varchar(200),`status` varchar(20) DEFAULT 'active',`description` TEXT NOT NULL,`images` TEXT,`contactname` varchar(255),`contactnum` varchar(100), `contactemail` varchar(200), `totalvolunteer` int NOT NULL, `totalfunds` int NOT NULL, FOREIGN KEY (`organizer_id`) REFERENCES `users`(`uid`)); "
    + "CREATE TABLE `volunteers` (`vid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`event_id` int NOT NULL,`email` varchar(100) NOT NULL,`firstname` varchar(100) NOT NULL,`lastname` varchar(100) NOT NULL,`contactnum` varchar(50),`address1` varchar(255),`address2` varchar(255),`state` varchar(100),	`country` varchar(100) DEFAULT 'Malaysia',	`postcode` varchar(50),	`nextsignup` BOOLEAN,`dateapp` DATE,`dateproc` DATE,`status` varchar(15) DEFAULT 'new', FOREIGN KEY (`event_id`) REFERENCES `events`(`eid`)); "
    
  let sqlInsert = "insert into organizations (name, website, telephone) values ('Cikgu Harry Bikal', 'https://www.thestar.com.my/news/nation/2020/07/13/superhero-teacher-looking-for-supporters', ''), ('Altruistik Malaysia', 'https://myaltruistik.wixsite.com/myaltruistik', 'myaltruistik@gmail.com'), ('Caremongering Malaysia', 'https://www.facebook.com/groups/653716671867349/', '0196691881'), ('House of Hope', 'https://www.facebook.com/houseofhopepenang', '048264826'), ('Personal/Individual', 'N/A', null), ('Others', 'N/A', null); "
    + "insert into users (email, firstname, lastname, password, organization_id, googlesso) values ('test@gmail.com', 'Isabelle', 'Francis', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 6, 0), ('test2@gmail.com', 'Logesh Kumar ', 'Sethuraman', '$2b$07$LwVuRvHH7comkN2KcH3D1emTZA6LnhpNQpVpVQaE0DAfE7EUzMHbW', 2, 0), ('esmemarie.sultan@gmail.com', 'Esme', 'S.', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 4, 1), ('jannahworks@gmail.com', 'Jannah', 'A.', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 5, 1), ('test3@gmail.com', 'Joe', 'Madis', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 5, 0);"
    + "insert into events (name, closingdate, status, description, location, organizer_id, contactname, contactnum, totalvolunteer, totalfunds, images) values ('TechSprint Academy', '2021-06-30', 'active', 'TechSprint invites women to join Rebound and discover their new superpowers and build a stronger support network and community of women in tech and business.', 'Kuala Lumpur', 1, 'Ms. Vani', '6012 207 5252', 2, 500000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5hBpLtdsairc71FgnElX1PyjDqcFOdXCuA&usqp=CAU'), ('TeknoPie', '2021-12-31', 'active', 'Educational technology for rural areas and students with learning difficulties.',  'Nationwide, Malaysia', 1, 'Isabelle Francis', '0163221306', 0, 1000000, 'https://hippocampus203439875.files.wordpress.com/2020/09/smk-tldj-students-using-android-to-access-kalite.jpg?w=257&zoom=2'), ('IIX Women Livelihood Bonds', '2021-12-31', 'active', 'Will be listed on a the Singapore Exchange, creating sustainable livelihoods for 250,000+ underserved women in the region.',  'Singapore', 1, 'Isabelle Francis', '0163221306', 0, 1000000, 'https://hippocampus203439875.files.wordpress.com/2020/09/smk-tldj-students-using-android-to-access-kalite.jpg?w=257&zoom=2');";
    
    // + "('Autism (ASD) Activist Recruitment', '2021-12-31', 'active', 'Call for State(Malaysia) Autism Spectrum Disorder SDG4 Activist. This project envisions to refocused effort to improve the quality of the education and acceptance among-st the community towards ASD. Acceptance in education along the lines of gender, urban-rural location and other dimensions still run deep, and more investments in education infrastructure are required.This campaign intends to enroll 80 State Activist across the Malaysia and raise voice in form of solidarity.', 'Nationwide, Malaysia', 2, 'Salina Salleh', '03-50001259', 8, 15000, 'https://firebasestorage.googleapis.com/v0/b/sehati-victressfin.appspot.com/o/photo-kids.jfif?alt=media&token=3d5f9792-0cb9-4d5d-93d6-a3f03a99d6ea'), ('The Power of Education for Teringai Children', '2021-12-31', 'active', 'This project aims to create a bridge to the outside world, through education, health awareness, and art. You’ll appreciate how much this means to the children once you learn about the trek they make from home to the learning centre. Here’s a chance to leave a lasting impact, and the splendid opportunity to experience Sabah’s rich, unspoiled wonders. Click apply to volunteer for this enriching escapade.', 'Kampung Teringai Laut, Kota Marudu, Sabah, Malaysia', 1, 'Brenda James', '088-726889', 8, 3000, 'https://firebasestorage.googleapis.com/v0/b/sehati-victressfin.appspot.com/o/TeringaiEvent.jpg?alt=media&token=e3beb4e0-d999-4e17-974a-eca9d6e5910c'), ('Jom Tolong', '2021-02-26', 'active', 'Gotong-royong at the old folk home and everyone is welcome. Also, it will be helpful if you could bring your own cleaning tools. Food is not provided but drink is available all the time. If you want to sponsor meal and other beverages to the supporters and residents, that will great!', 'Dusun Sana, Jerantut, Pahang', 4, 'Lina Samad', '012-3000456', 10, 500, 'https://firebasestorage.googleapis.com/v0/b/sehati-victressfin.appspot.com/o/shane-rounce-DNkoNXQti3c-unsplash.jpg?alt=media&token=f1d57063-bb6d-408a-abc0-d43150d02c58'), ('Feed the Furries', '2021-12-31', 'active', 'Economic problems caused by the Covid-19 pandemic has affected not only people’s livelihoods but also the welfare of animals. Stray has increased and food are scarce as shops are closed. Thus, we are looking for kind souls who would like to join us to see the welfare of the neglected and abandoned pets/strays around our area - Petaling Jaya. So, ideally the volunteer is from PJ and will help distribute food and water to designated places.', 'Petaling Jaya, Selangor', 4, 'Lin Li', '013-8873737', 20, 2000, 'https://firebasestorage.googleapis.com/v0/b/sehati-victressfin.appspot.com/o/20180303_163120.jpg?alt=media&token=e21910c7-9521-4ed4-bb54-6e9bc284fcd9'); "
    + "insert into volunteers (event_id, email, firstname, lastname, contactnum, dateapp, status) values (1, 'volone@gmail.com', 'Misty', 'Green', '0123456789', NOW() - INTERVAL 3 DAY, 'accepted'), (1, 'voltwo@gmail.com', 'Delima', 'Merah', '0123243355', NOW() - INTERVAL 2 DAY, 'new'), (1, 'volthree@gmail.com', 'Selamat', 'Lizam', '0178886654', NOW() - INTERVAL 2 DAY, 'new'), (1, 'volfour@gmail.com', 'Moon', 'Tan',  '0197696945', NOW() - INTERVAL 1 DAY, 'new');";

  con.query(sql + sqlInsert, function(err, result) {
    if (err) throw err;
    console.log("Tables creation with dummy data for 'focaldb' db was successful!");

    console.log("Closing...");
  });

  con.end();
});

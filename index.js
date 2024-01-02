const express = require("express");
const cors = require("cors");  // Import the cors middleware
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require('mysql');

app.use(cors());  // Use cors middleware to enable CORS support

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11673180",
  password: "fASadCNh1q",
  database: "sql11673180",
});

connection.connect((err) => {
  if(err) {
    throw err;
  }
  else{
    console.log('Database Connection Successfull');
  }
});

app.listen(PORT, () => {
  console.log("Listening On Port : ", PORT);
});

const Users = [
  {
    id: 0,
    name: "admin",
    email: "admin",
    password: "admin",
  },
];

app.post("/api/addSignUp", (req, res) => {
  console.log("Received From Client : ", req.body);
  const SignUpData = {
    id: Users.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  Users.push(SignUpData);
  console.log(SignUpData);

  res.status(200).send({
    status_code: 200,
    message: "User Added!",
    User: SignUpData,
  });
});

function finduser(users, property, value) {
  for (const user of users) {
    if (user[property] == value) {
      return 1;
    }
  }
  return 0;
}

app.get('/api/getRests',(req,res) => {

  const sqlqurey = "Select * from Resturant";
  connection.query(sqlqurey,(err,results,feilds)=> {
    if(err){
      console.log(err);
      res.status(500).send('Error Executing Query');
    }
    res.status(200).send(results);
  });

});

app.post("/api/login", (req, res) => {
  if (finduser(Users, "email", req.body.email)) {
    res.status(200).send({
      status_code: 200,
      message: "Logged IN",
      User: req.body,
    });
  } else {
    res.status(400).send({
      message: "User Dose Not Exist!",
    });
  }
});

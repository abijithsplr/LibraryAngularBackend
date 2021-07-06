const express = require("express");
app = new express();
const cors = require('cors');
// const bodyParser = require('body-parser')
const authordata = require('./src/model/authordata');
const bookdata = require('./src/model/bookdata');
const userdata = require('./src/model/userdata');
var jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
function verifyToken(req, res, nxt) {
  if (!req.setheader.Authorisation) {
    return res.status(401).send("Unauthorised request")
  }
  let token = req.setheader.Authorisation.split(''[1])
  if (token == 'null') {
    return res.status(401).send("Unauthorised request")
  }
  let payload = jwt.verify(token, 'aspkey');
  if (!payload) {
    return res.status(401).send("Unauthorised request")
  }
  req.role = payload.subject;
  next();
}
app.get('/authors', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  authordata.find()
    .then(function (data) {
      res.send(data);
    });
});
app.get('/books', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  bookdata.find()
    .then(function (data) {
      res.send(data);
    });
  
});
app.get('/books/delete:i', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const id = req.params.i;
  console.log(id);
  bookdata.deleteOne({ _id: id }).then((data)=>{
    res.status(200).send();
  })
});
app.get('/authors/delete:i', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const id = req.params.i;
  console.log(id);
  authordata.deleteOne({ _id: id }).then((data)=>{
    res.status(200).send();
  })
});

app.post('/addauthor', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  item = req.body;
  var author =authordata(item);
  author.save();
  res.status(200).send();
  console.log(item);
});
app.post('/addbook', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  item=req.body;
  console.log(req.body);
  var book=bookdata(item);
  book.save();
  
  res.status(200).send();
  // console.log(req.body);
});
app.get('/books/:i', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const id = req.params.i;
  bookdata.findOne({ _id: id })
    .then(function (data) {
      res.send(data);
    });
});
app.get('/authors/:i', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const id = req.params.i;
  authordata.findOne({ _id: id })
    .then(function (data) {
      res.send(data);
    });

});
app.post('/login', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  user = req.body;
  // console.log(user);
  userdata.findOne({ "username": user.email })
    .then(function (data) {
      if (data.password === user.password) {
        var payload = { subject: data.role }
        var token = jwt.sign(payload, 'aspkey');
        res.status(200).send({ token });
      }
      else {
        message='failed'
        res.status(200).send({message});
      }
    })
    .catch((err)=>{
      message='failed'
      res.status(200).send({message});
    })
});
app.post('/signup', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  var newuser = {
    username: req.body.newemail,
    password: req.body.password,
    role: "normaluser"
  };
  userdata.findOne({ username: req.body.newemail.trim() } || { password: req.body.password.trim() })
    .then(function (data) {
      if (data === null) {
        var user = userdata(newuser);
        user.save();
        res.status(200).send();
      }
      else {
        res.status(401).send("Invalid User name or password");
      }
      console.log(newuser);
    });

});
app.post('/getrole', function (req, res) {
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  if (req.body) {
    var token = req.body;
    console.log(token);
    payload = jwt.verify(token.token, 'aspkey');
    console.log(payload.subject);
    if (payload) {
      res.status(200).send(payload);
    }
    else {
      res.status(401);
    }
  }


});
app.listen(port, function () {
  console.log("listening to port number: 3000");
});
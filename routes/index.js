var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const crypto = require('crypto');
var sanitizeHtml = require('sanitize-html');
const { v1: uuidv1 } = require('uuid');
var nodemailer = require('nodemailer');
const {OAuth2Client} = require('google-auth-library');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SORRY, I cannot show you',
    pass: 'SORRY, I cannot show you'
  }
});



var con = mysql.createConnection({
  host: "localhost",
  database: "task_manager"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



const client = new OAuth2Client("63312847304-n405ndtf6cpb7j5iatlam0ha59006aqo.apps.googleusercontent.com");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.html', function(req, res, next) {
  res.redirect('/user_setting.html');
});

module.exports = router;

router.post('/login', function(req, res) {
  var log =req.body;
  var password = log.password;
  var username = log.username;
  //data query
  //SELECT hash,salt FROM users WHERE username = ?;
  con.connect(function(err) {
          con.query("SELECT pwordhash,pwordsalt FROM users WHERE username = ?;", username, function(err, users){
            if (err || users.length <= 0) {
                // No valid user found
                res.status(401).send();
                return;
            }

            // Check if salted hashes match
            var hash = crypto.createHash('sha256');
            hash.update(password+users[0].pwordsalt);
            var submittedhash = hash.digest('hex');
            if(users[0].pwordhash===submittedhash){
                // Correct password, store session
                var query = "UPDATE users SET session_id = ? WHERE username = ?";
                con.query(query, [req.session.id,username]);
                res.send();
            } else {
                // Wrong password
                res.status(401).send();
            }
        });
  });
});



router.post('/glogin', function(req, res) {
    const ticket = client.verifyIdToken({
      idToken:req.body.id_token,
      audience: '63312847304-n405ndtf6cpb7j5iatlam0ha59006aqo.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  var log =req.body.email;
  //data query
  //SELECT hash,salt FROM users WHERE username = ?;
  con.connect(function(err) {
          con.query("SELECT pwordhash,pwordsalt FROM users WHERE email = ?;",log, function(err, users){
            if (err || users.length <= 0) {
                // No valid user found
                res.status(401).send();
                return;
            }else {
                // Correct password, store session
                var query = "UPDATE users SET session_id = ? WHERE email = ?";
                con.query(query, [req.session.id,log]);
                res.send();}

        });
  });
});


router.post('/signup', function(req, res) {
  var sign =req.body;
  var salt = uuidv1();
  var hash =  crypto.createHash('sha256');
  hash.update(sign.password+salt);
  var submittedhash = hash.digest('hex');
  var no = null;
    con.connect(function(err) {
          con.query("SELECT * FROM users WHERE username = ?;", sign.username, function(err, users){
            if ((err || users.length <= 0) && sign.username!== undefined && sign.password!== undefined && sign.email!== undefined && sign.phone!== undefined) {
                //when  user name does not exist
                con.query("INSERT INTO users VALUES(?,?,?,?,?,?,?,?,1);", [sign.character,sign.username,submittedhash,sign.phone,sign.email,"html",salt,no]);
                res.send();
                return;
            } else {
                // Wrong password
                res.status(401).send();
            }
        });
    });
 // INSERT INTO users VALUES(0,?,?,?,?,?,?,?,?);  sign.username, hash, sign.phone, sign.email, html, salt, NULL, 1

});


router.get('/task', function(req, res)
{
//res.send(tasks);

con.connect(function(err) {
          con.query("SELECT * FROM users WHERE session_id=?;", req.session.id,function(err, user){
            //console.log(user);
            if (user.length<=0){
              res.status(401);
              res.send();
            }else if(user[0].character===1) {
                con.query("SELECT * FROM tasks where done=0 ORDER BY dueday;", function (err, result, fields) {
                res.send(result);
                return;
                 });
            }else if(user[0].character===0){
                con.query("SELECT DISTINCT id,dueday,title,type,content  FROM tasks inner JOIN people_handle_tasks on tasks.id = people_handle_tasks.task_id where tasks.done=0 AND people_handle_tasks.people = ? ORDER BY dueday;",user[0].username, function (err, results, fields) {
                res.send(results);
                return;
                 });

            }
            //console.log(req.session.id);

        });




});


});


router.post('/people_on_task', function(req, res)
{

    var id = req.body.number;
    //console.log(id);
    var query = "SELECT people FROM people_handle_tasks where task_id =?;";
    con.connect(function(err) {
      con.query(query, id,function (err, result, fields) {
          //console.log(result);
      res.send(result);
      });
    });
});


router.get('/task_done', function(req, res)
{
con.connect(function(err) {
          con.query("SELECT * FROM users WHERE session_id=?;", req.session.id,function(err, user){
            //console.log(user);
            if (user.length<=0){
              res.status(401);
              res.send();
            }else if(user[0].character===1) {
                con.query("SELECT * FROM tasks where done=1 ORDER BY dueday;", function (err, result, fields) {
                res.send(result);
                return;
                 });
            }else if(user[0].character===0){
                con.query("SELECT DISTINCT id,dueday,title,type,content  FROM tasks inner JOIN people_handle_tasks on tasks.id = people_handle_tasks.task_id where tasks.done=1 AND people_handle_tasks.people = ? ORDER BY dueday;",user[0].username, function (err, results, fields) {
                //console.log(results);
                res.send(results);
                return;
                 });

            }
            //console.log(req.session.id);
        });
});
});

router.post('/task/finish', function(req, res) {
    var text = req.body;
    var query = "UPDATE tasks SET done = 1 WHERE id =?;";
    con.connect(function(err) {
    con.query(query,text.id, function (err, result, fields) {
    });
    });
    res.status(200).end();
});


router.get('/the_user', function(req, res) {
  con.connect(function(err) {
              con.query("SELECT * FROM users WHERE session_id=?;", req.session.id,function(err, user){
            //console.log(user);
            if (user.length<=0){
              res.status(401);
              res.send();
            } else {

  con.query("SELECT username,phone,email,preference,availability FROM users where session_id=?;", req.session.id,function (err, result, fields) {
    //console.log(result);
    res.send(result);

  });}
});
});
});

router.post('/edit_info', function(req, res) {
    var text = req.body;
    if (text.yesno=='true'){
    text.availability = 1;}
    else{
    text.availability = 0;
    }

    con.connect(function(err) {
     con.query("SELECT username FROM users WHERE session_id=?", [req.session.id], function(err, users){
            if (err || users.length <= 0) {
                // Not logged in
                res.status(401).send();
                return;
            }
           con.query("UPDATE users SET email=?,phone=?,preference=?,availability=? WHERE session_id=?;",[text.email,text.phone,text.type,text.availability,req.session.id], function (err, result, fields) {
    });
     });

    });

    res.redirect('/user_setting.html');
});

router.post('/newPost', function(req, res) {
    //console.log(req.body);
    var text = req.body;
    text.id = uuidv1();
    text.title = sanitizeHtml(text.title);
    text.content =  sanitizeHtml(text.content);
    text.dueday = sanitizeHtml(text.dueday);
    con.connect(function(err) {
 con.query("SELECT * FROM users WHERE session_id=?;", req.session.id,function(err, user){
   if (user[0].character == 1){
    con.query("INSERT INTO tasks VALUES(?,?,?,?,?,0);",[text.id,text.dueday,text.title,text.type,text.content], function (err, result, fields) {
    });
    var people = text.people;
    for (let x=0;x<people.length;x++){
      people[x] =sanitizeHtml(people[x]);
    con.query("INSERT INTO people_handle_tasks VALUES(?,?);",[text.id,people[x]], function (err, result, fields) {
    });
    }

   }
   else{
     res.status(401).end();
   }
 });
    });

    res.status(200).end();
});

router.get('/user_list', function(req, res)
{
          con.query("SELECT * FROM users WHERE session_id=?;", req.session.id,function(err, user){
            //console.log(user);
            if (user.length<=0){
              res.status(401);
              res.send();
            }else if(user[0].character===1) {
  con.query("SELECT * FROM users where availability=1;", function (err, result, fields) {
        res.send(result);
  });
            }else if(user[0].character===0){
              res.status(401);
              res.send();

            }
            //console.log(req.session.id);

        });

});


router.post('/email', function(req, res) {
    var text = req.body;
    var mailOptions = {
  from: 'wdc2020lzz@gmail.com',
  to: text.address,
  subject: text.title,
  text: text.content
};
console.log(text.address);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.status(401).end();
  } else {
    console.log('Email sent: ' + info.response);
    res.status(200).end();
  }
});

});

router.post('/logout', function(req, res) {
    con.connect( function(err,connection) {
        var query = "UPDATE users SET session_id = NULL WHERE session_id = ?";
        con.query(query, [req.session.id], function(err){
            if (err) {
                res.status(403).send();
            } else {
                res.send();
            }
        });

    });
});
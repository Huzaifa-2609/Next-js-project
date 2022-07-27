var mysql = require('mysql');

var con = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "2610?2602Sh",
  database: "cryfts",
  multipleStatements: true
});
con.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  });

module.exports=con;


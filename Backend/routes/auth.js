const express = require("express");
const router = express.Router();
const con = require("../db.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser=require("../middleware/fetchUser");

const JWT_SECRET = "sohaibayanhuzaifa";
const { body, validationResult } = require("express-validator");


//Route1: creating the user
router.post(
  "/createuser",
  [
    body("firstname", "Enter a valid name").isLength({
      min: 3,
    }),
    body("lastname", "Enter a valid name").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Must be at least 5 charachters").isLength({
      min: 5,
    }),
    body("phoneno", "Enter Valid phone number").isLength({
      min: 11,
    }),
  ],
  async (req, res) => {
    let success = false;
    const { walletAddress, firstname, lastname, email, password, phoneno } =
      req.body;


      con.query(
        `SELECT COUNT(*) AS cnt FROM Users WHERE Email ='${email}'|| WalletAddress='${walletAddress}'` 
        ,
        async function (err, data) {
          if (err) {
            res.status(400).send(err);
          } else {
            if (data[0].cnt > 0) {
              return res.status(400).json({
                success,
                message: "The user with the same email/wallet already exists",
              });
            } else {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res.status(400).json({
                  success,
                  errors: errors.array(),
                });
              }
              const salt = bcrypt.genSaltSync(10);
              const secPass = await bcrypt.hash(password, salt);
              var sql = `INSERT INTO Users (WalletAddress, Firstname, Lastname, Email,PhoneNo, passcode) VALUES ('${walletAddress}', '${firstname}', '${lastname}','${email}','${phoneno}','${secPass}')`;
              con.query(sql, function (err, result) {
                if (err) throw res.json(err);
                success = true;
                con.query(`select WalletAddress from Users where Email='${email}'`, (err,result)=>{
                  const data = {
                      user: {
                          id: result[0].WalletAddress
                      }
                  }
                  const authToken = jwt.sign(data, JWT_SECRET);
                  res.json({
                    success,
                    authToken,
                  });
                })
              });
            }
          }
        }
      );

  }
);

//Route2: login the user

router.post("/login", [

    body('email', "Enter a valid email").isEmail(),
    body('password', "password can not be blank").exists(),
    body('walletAddress', "Enter wallet Address").exists()
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        email,
        password,
        walletAddress
    } = req.body;
    con.query(
      `SELECT * FROM users WHERE Email = '${email}' && WalletAddress='${walletAddress}';`,
      async(err, result) => {
        // user does not exists
        if (err) {
          throw err;
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Enter correct Credentials!'
          });
        }
        // check password
        let passcodeComapre=await bcrypt.compare(
          password,
          result[0]['passcode'])
         
            if (!passcodeComapre) {
              return res.status(401).send({
                msg: 'Enter correct Credentials!'
              });
            }
            else{
              success=true;
              con.query(`select WalletAddress from Users where Email='${email}'`, (err,result)=>{
                const data = {
                    user: {
                        id: result[0].WalletAddress
                    }
                }
             
              
              
                const authToken = jwt.sign(data, JWT_SECRET);
                res.json({
                  success,
                  authToken,
                });
              })
            }


            // return res.status(401).send({
            //   msg: 'Internal server errror occured',
            
            // });
          }
        );
      }
    );
    
// Route:3 get the user
router.get("/getuser",fetchUser, async (req, res) => {
  try {
          const userid=req.user.id;
          let sql= `select  WalletAddress, Firstname, Lastname, Email,PhoneNo From Users Where WalletAddress='${userid}' `
          con.query(sql, (err,user)=>{
            res.json(user)
        
          })

      
      } catch (error) {
          console.error(error.message)
          res.status(500).send("internal server error occured ")
      }
      })    
module.exports = router;

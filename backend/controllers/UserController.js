
const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const salt = 10;
require('dotenv').config();

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})


module.exports={
    register:(req,res)=>{
        const fullname = req.body.fullName;
        const email = req.body.email;
        const role = req.body.role;
        const sql = 'INSERT INTO `userrole` (fullname, email,password,role) VALUES (?,?,?,?)';
        bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
            if (err) return res.json({Error:"Error in hashing password"});
            db.query(sql,[fullname,email,hash,role],(err,result)=>{
                if (err) return res.json({Error:"Error in inserting data"});
                return res.json({Status:"Success"});
            })
        })
    },
    login:(req,res)=>{
        const sql = 'SELECT * FROM `userrole` WHERE email = ?';
        db.query(sql,req.body.email,(err,data)=>{
            if(err) console.log(err);
            if(data.length > 0){
                bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                    if(err) return res.json({Error:"Password compare error"});
                    if(response) {
                        const id = data[0].id;
                        const name = data[0].fullname;
                        const email = data[0].email;
                        const role = data[0].role;
                        const token = jwt.sign({id,name,email,role},"SECRET",{expiresIn:"1d"});
                        res.cookie('token',token, {
                            httpOnly: true,
                            sameSite: 'lax', // or 'none' if using HTTPS
                            secure: false // true if HTTPS
                          });
                        return res.json({Status:"Success"});
                    }else{
                        return res.json({Error:"Password do not matched"});
                    }
                })
            } else{
                return res.json({Error:"No email existed"});
            }
        })
    },
    logout:(req,res)=>{
        res.clearCookie('token');
        return res.json({Status:"Success"});
    },
    getAllUser:(req,res)=>{
        const sql = 'SELECT * FROM `userrole`';
        db.query(sql,(err,data)=>{
            if(err) res.json({Error: "Error in getting data"});
            return res.send(data);
        })
    },
    getById:(req,res)=>{
        const sql ="SELECT * FROM `userrole` WHERE id=? ";
        const id = req.params.id;
        db.query(sql,id,(err,data)=>{
            if(err) return res.json({Error: "Error in get user",err});
            return res.json(data);
        })
    },
    verify:(req,res)=>{
        return res.json({Status:"Success",id:req.id,name:req.name,email:req.email,role:req.role})
    }
}
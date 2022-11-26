const express=require('express')
const {response} = require("express");
const bodyParser = require("body-parser");
const bcrypt =require('bcrypt-nodejs')
const cors=require('cors')
const register=require('./Controllers/register')
const signin=require('./Controllers/signin')
const profile=require('./Controllers/profile')
const image=require('./Controllers/image')
const parse = require("pg-connection-string").parse;
const pgconfig = parse(process.env.DATABASE_URL);
pgconfig.ssl = false ;
const db=require('knex')({
    client:'pg',
    connection:pgconfig,

})
// db.select().from('users').then(
//     data=>console.log(data)
// )
//starting server
const app=express()
app.use(bodyParser.json())
app.use(cors())
app.get('/',(req,res)=>{

    res.send('URL'+pgconfig.host)
})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.post('/image',(req,res)=>{image.imagehandle(req,res,db)})
app.post('/fetchImageApi',(req,res)=>{image.fetchImageApi(req,res)})

//Listen
app.listen(process.env.PORT||3000,()=>{
    console.log('App is Running at 3000 port')
})
/*
why we use POST instead of query for sending password
from browser to server :it's because we want to
hide it from middle man so, we send it using POST Method
in the body of request
* setting routes/endpoints
* / res->it is working
* /signin  res->POST =success/fail
* /register res->POST =user
* /profile/:userId res-> GET=user
* /image -->PUT =updated userObject
*
* */
/*
becrypt-nodejs: npm library for hashing passwords
password from browsers are transfered in body instead of query
always send sensitive info through body using https
and always store password in hash values in database by converting form plaintext
to hashvalue using bcrypt-nodejs
* */
/*
knex js to connect database with server
npm install knex
npm install pg
* */
// const database={
//     user:[
//         {
//             id:'123',
//             name:'john',
//             email:'john@gmail.com',
//             pass:'cookies',
//             entries:0,
//             joined:new Date()
//         },
//         {
//             id:'124',
//             name:'silly',
//             email:'silly@gmail.com',
//             pass:'bannas',
//             entries:0,
//             joined:new Date()
//         }
//     ],
//     login:[
//         {
//             id:'789',
//             has:'',
//             email:'john@gmail.com'
//         }
//     ]
// }

/*
for security point of view we have to ensure at backend that
data is correctly recieved from the frontend
and also confidential information is not sent to front end
* */
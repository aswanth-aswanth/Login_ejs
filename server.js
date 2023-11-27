const express=require('express');
const ejs=require('ejs');
const app=express();
const path=require('path');
const router=require('./router.js');
const session=require('express-session');
const nocache = require("nocache");
const { v4: uuidv4 } = require("uuid");
app.set('view engine', 'ejs');

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(nocache());
app.use(
    session({
      secret: uuidv4(),
      resave: false,
      saveUninitialized: true,
    })
  );

app.use("/api",router);
app.get("/",(req,res)=>{
    if(!req.session.user){
        res.render('login');
    }else{
        res.redirect("/api/home");
    }
})

app.listen(3000,()=>console.log("Listening to port 3000"));
const express=require('express');
const router=express.Router();

const Credential={
    email:"sugu@gmail.com",
    password:"1234"
}
router.get("/home",(req,res)=>{
    if(req.session.user){
        res.render("home",{
            user:req.session.user,
        });
    }else{
        res.redirect("/");
    }
})
router.post("/login",(req,res)=>{
    console.log("login executed");
    console.log("req : ",req.body);
    if(req.body.password===Credential.password&&req.body.email===Credential.email){
        console.log("Login success");
        req.session.user = req.body.email;
        res.redirect("/");
    }else{
        console.log("Login is not success");
        res.render("login",{message:"Your username or password is incorrect"});
    }
})
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            res.send("Error");
        }else{
            res.redirect("/");
        }
    })
})



module.exports=router;
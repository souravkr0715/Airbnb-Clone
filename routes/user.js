const express = require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const usersController=require("../controllers/users.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",
    usersController
    .renderSignupForm
);


router.post("/signup",
    wrapAsync(
        usersController.signup
     ));    


router.get("/login",
    usersController.renderloginForm
);


router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true,
    }),
    usersController.login
);


router.get("/logout",
    (req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
});


module.exports=router;
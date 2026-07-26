const express = require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})
const Listing = require("../models/listing");

//INDEX ROUTE
router.get("/",
    wrapAsync(listingController.index));


 //New route
 router.get("/new",
    isLoggedIn,
    (req,res)=>{
     res.render
     ("listings/new.ejs")
 })


 //CRETAE ROUTE
router.post(
     "/",
     isLoggedIn,
    
     upload.single("listing[image]"),
     validateListing,
     wrapAsync(listingController
        .renderNewForm));
     


        router.get("/search", wrapAsync(async (req, res) => {
    const { q } = req.query;

    const allListings = await Listing.find({
        $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", { allListings });
}));

     //EDIT ROUTE
     router.get("/:id/edit",
        isLoggedIn,
        isOwner,
        wrapAsync(listingController
            .editListing));
 

     //UPDATE ROUTE
    
    router.put("/:id",
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
      
        wrapAsync(listingController
            .updateListing));
    

     //DELETE ROUTE 
     router.delete("/:id",
        isLoggedIn,
        isOwner,
        wrapAsync(listingController
            .deleteListing))
 

     //SHOW ROUTE
router.get("/:id",
    wrapAsync(listingController
        .showListing))



module.exports=router;
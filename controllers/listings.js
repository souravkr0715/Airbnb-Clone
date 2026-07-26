const Listing=require("../models/listing")

//Index
// module.exports.index=
// async(req,res)=>{
//     const allListings= await Listing.find({});
//     res.render("listings/index.ejs",
//         {allListings});
// };




module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    console.log("Total listings:", allListings.length);
    res.render("listings/index.ejs", { allListings });
};
//Create

// module.exports.renderNewForm=async(req,res,next)=>{
//     let url =req.file.path;
//     let filename = req.file.filename;
    
//     const newListing=new Listing(req.body.listing);
//     newListing.owner=req.user._id;
//     newListing.image={url,filename};
//     newListing.owner=req.user._id;
//     await newListing.save();
//     req.flash("success","NEw listing created!");
//     res.redirect("/listings");
// }

module.exports.renderNewForm = async (req, res, next) => {
    console.log("Request body:", req.body); // Log the request body
    console.log("Uploaded file:", req.file); // Log the uploaded file
    
    if (!req.body.listing) {
        req.flash("error", "Listing data is required.");
        return res.redirect("/listings/new");
    }
    
    let url = req.file.path; // Ensure req.file is defined
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

//Show 

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing
    .findById(id)
    .populate({path:"reviews",
        populate:{path:"author"},
       
    });
    
    if(!listing){
        req.flash("error","Listing Does Not Exist!!!");
        res.redirect("/listings");
    }
res.render("listings/show.ejs",{listing});
}

//edit

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing
    .findById(id)
    .populate({path:"reviews",
        populate:{path:"author"},
       
    });
    
    if(!listing){
        req.flash("error","Listing Does Not Exist!!!");
        res.redirect("/listing");
    }

    let originalImageUrl=listing.image.url;
    originalImageUrl.replace("/upload/h_300,w_250");
res.render("listings/edit.ejs",{listing,originalImageUrl});
}

//update
module.exports.updateListing=(async (req, res) => {

            const { id } = req.params; // Extract the id from req.params
        let listing=await Listing.findByIdAndUpdate(id, {...req.body.listing}); // Use the id here

        if(typeof req.file !=="undefined"){
        let url = req.file.path; // Ensure req.file is defined
        let filename = req.file.filename;

        listing.image={url,filename};
        await listing.save();
        }
            req.flash("success", "LISTING UPDATED!");
            res.redirect(`/listings/${id}`);
        })

 //delete

        module.exports.deleteListing=async(req,res)=>{
                 let{id}=req.params;
                let deletedListing= await Listing.findByIdAndDelete(id);
                req.flash("success"," LISTING DELETED!"); 
                console.log(deletedListing);
                 res.redirect("/listings")
             }
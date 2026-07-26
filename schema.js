const Joi = require('joi');

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        // image:Joi.string().allow("",null),
        image: Joi.object({ 
                       filename: Joi.string().allow("", null),
                         url: Joi.string().uri().required(), // Ensure URL is required and valid
                     }).optional(),
                     location: Joi.string().required(), // Add the `location` field
                     //     }).required(),
    }).required(),
})

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})

// const Joi = require('joi');

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.object({ // Change this to 'image' and define it as an object
//             filename: Joi.string().allow("", null),
//             url: Joi.string().uri().required(), // Ensure URL is required and valid
//         }).required(), // Make sure this is required if you want to enforce it
//     }).required(),
// });

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//       title: Joi.string().required(),
//       description: Joi.string().required(),
//       country: Joi.string().required(),
//       price: Joi.number().required().min(0),
//       image: Joi.object({
//         url: Joi.string().required(),
//         filename: Joi.string().optional(),
//       }).optional(),
//       location: Joi.string().required(), // Add the `location` field
//     }).required(),
//   });
  
// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//       title: Joi.string().required(),
//       description: Joi.string().required(),
//       country: Joi.string().required(),
//       price: Joi.number().required().min(0),
//       location: Joi.string().required(),
//       image: Joi.object({
//         url: Joi.string().required(), // Ensure it's a valid string
//         filename: Joi.string().optional(),
//       }).optional(), // Make `image` optional if not always provided
//     }).required(),
//   });
  
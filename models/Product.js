//importing mongoose module
const mongoose = require('mongoose')

//import schema
const Schema = mongoose.Schema

let ProductSchema = new Schema(
    {
    ProductName: {
    type: String,
    default: 'Not specified'
    },
    ProductId: {
    type: String,
    unique: true
    },

    VendorId:{
     type: String,
     unique: true
    },

    ProductPrice: {
        type: String,
        default:""
    },

    ProductDisplayPrice:{
        type: String,
    },

    category:{
         type: String,
         default: ''
    },

    available_on:{
        type: Date,
        default: Date.now
    },

    lastModifiedOn:{
        type: Date,
        default: Date.now
    },

    ProductOffer:{
        type: String,
        default:"No Offer"
    },

    description:{
        type: String,
        default: "No description available"
    },

    authToken: {
        type: String,
        default:"Admin"
    }
   

    }
)

mongoose.model('Product',ProductSchema);
    







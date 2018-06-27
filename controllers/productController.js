const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../libs/responseLib');
const time = require('./../libs/timeLib');
const check = require('./../libs/checkLib');
const logger = require('./../libs/loggerLib');

var cartItems = 0;
//Importing the model here
const ProductModel = mongoose.model('Product')

let getAllProduct = (req,res) =>{
    ProductModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) =>{
        if(err){
            logger.error(err.message, 'Product Controller: getAllProduct', 10)
            let apiResponse =  response.generate(true, 'Failed to Find Product Details', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: getAllProduct')
            let apiResponse = response.generate(true,'No Product Found', 404, null)
            res.send (apiResponse)
        } else{
            logger.info("Products Found successfully", "ProductController:getAllProduct",5)
            let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}//end get all products

let viewByProductId = (req, res) =>{
    ProductModel.findOne({'ProductId': req.params.ProductId}, (err, result) =>{
    if(err){
        logger.error(`Error Occured : ${err}`, 'Database', 10)
        let apiResponse = response.generate(true, 'Error Occured', 500, null)
        res.send(apiResponse)
    }else if(check.isEmpty(result)) {
        logger.info('No Product Found', 'Product Controller: viewByProductId')
        let apiResponse = response.generate(true, 'Product Not Found', 404,null)
        res.send(apiResponse)
    } else{
        logger.info("Product Found successfully", "ProductController:viewByProductId",5)
        let apiResponse = response.generate(false, 'Product Found Successfully', 200, result)
        res.send(apiResponse)
    }
    })
} //end of view by productId

let viewByVendorId = (req, res) =>{
    ProductModel.findOne({'VendorId': req.params.VendorId}, (err, result) =>{
        if(err){
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occurred', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: viewByVendorId')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Product Found successfully", "ProductController:viewByVendorId",5)
            let apiResponse = response.generate(false, 'Product Found Succesfully', 200, result)
            res.send(apiResponse)
        }
    })//end view by VendorId
   }

let createProduct = (req, res) =>{
    var today = time.now();
    let ProductId = shortid.generate()
    let VendorId = shortid.generate()

    let newProduct = new ProductModel({
        ProductName: req.body.ProductName,
        ProductId: ProductId,
        VendorId: VendorId,
        ProductPrice: req.body.ProductPrice,
        ProductDisplayPrice: req.body.ProductDisplayPrice,
        category: req.body.category,
        available_on: today,
        lastModifiedOn: today,
        ProductOffer: req.body.ProductOffer,
        description: req.body.description
   }) //end new Product model
   newProduct.save((err, result) =>{
       if(err){
        logger.error(`Error Occured : ${err}`, 'Database', 10)
        let apiResponse = response.generate(false, 'Error Occured', 500, null)
           res.send(apiResponse)
       } else { 
        logger.info("Product created successfully", "ProductController:createProduct",5)
           let apiResponse = response.generate(false, 'Product Found Succesfully', 200, result)
           res.send(apiResponse)
       }
   }) //end new Product save
}

let viewByCategory = (req, res) =>{
    ProductModel.find({'category': req.params.category}, (err, result) =>{
        if(err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(false, 'Error Occured', 500, null)
             res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: viewByCategory')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        } else{
            logger.info("Product Found successfully", "ProductController:viewByCategory",5)
            let apiResponse = response.generate(false, 'Product Found Succesfully', 200, result)
            res.send(apiResponse)
        }
    }) //end view By category
}

let viewByProductOffer = (req, res) =>{
    ProductModel.find({'ProductOffer': req.params.ProductOffer},(err, result) =>{
        if(err){
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(false, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: viewByProductOffer')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Product Found successfully", "ProductController:viewByProductOffer",5)
            let apiResponse = response.generate(false, 'Product Found Succesfully', 200, result)
            res.send(apiResponse)
        }
    })//end of view by ProductOffer
}

let editProduct = (req, res) =>{
    let options = req.body;
    console.log(options);
    ProductModel.update({'ProductId':req.params.ProductId}, options, {multi: true}).exec((err, result) =>{
        if(err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(false, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)){
            logger.info('No Product Found', 'Product Controller: editProd')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Product edited successfully", "ProductController:editProduct",5)
            let apiResponse = response.generate(false, 'Product Edited Succesfully', 200, result)
            res.send(apiResponse)
        }
    })
}

let deleteProduct = (req, res) =>{
    ProductModel.remove({'ProductId': req.params.ProductId}, (err, result) =>{
        if(err){
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(false, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: deleteProduct')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Product Deleted successfully", "ProductController:deleteProduct",5)
            let apiResponse = response.generate(false, 'Product Found Succesfully', 200, result)
            res.send(apiResponse)
        }
    })//end of delete Product
}

let addProductToCart = (req, res) =>{
    ProductModel.findOne({'ProductId': req.params.ProductId}, (err, result) =>{
        if(err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(false, 'Error Occured', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: addProductToCart')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        }else{
           
            cartItems +=1;
            result.save(function (err, result){
                if(err){
                    let apiResponse = response.generate(false, 'Error Occured', 500, null)
                    res.send(apiResponse)
                } else {
                    logger.info("Product Added to the Cart successfully", "ProductController:addProductToCart",5)
                    res.send(result.ProductName +" removed from the cart" +"\nTotal Items in the Cart is " +cartItems)
                }
            })
        }
    })//end add to cart

}


let removeProductFromCart = (req, res) =>{
    ProductModel.findOne({'ProductId': req.params.ProductId}, (err, result) =>{
        if(err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(false, 'Error Occured', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)) {
            logger.info('No Product Found', 'Product Controller: removeProductFromCart')
            let apiResponse = response.generate(true, 'Products Not Found', 404, null)
            res.send(apiResponse)
        }else{
              cartItems -= 1;
            result.save(function (err, result){
                if(err){
                    let apiResponse = response.generate(false, 'Error Occured', 500, null)
                    console.log(err)
                    res.send(apiResponse)
                } else {
                    logger.info("Product Removed from the Cart successfully", "ProductController:removeProductFromCart",5)
                    res.send(result.ProductName +" removed from the cart" +"\nTotal Items in the Cart is " +cartItems)
                }
            })
        }
    })
}



module.exports = {
    getAllProduct: getAllProduct,
    createProduct: createProduct,
    viewByProductId: viewByProductId,
    viewByCategory: viewByCategory,
    viewByProductOffer: viewByProductOffer,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    viewByVendorId: viewByVendorId,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart
}
const express = require('express')
const productController = require('./../controllers/productController')
const appConfig = require("./../config/appConfig")
const auth = require('./../middlewares/auth')
let setRouter = (app) =>{
   let baseUrl = appConfig.apiVersion+'/products';

    app.get(baseUrl+'/all',auth.isAuthenticated,productController.getAllProduct);


	/**
	 * @api {get} /api/v1/products/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Products Details Found",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/:ProductId',auth.isAuthenticated,productController.viewByProductId);

     /**
	 * @api {get} /api/v1/products/view/:ProductId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductId The ProductId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": {
                        _id: "string",
	    			    __v: number
	    		        ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/by/category/:category',auth.isAuthenticated,productController.viewByCategory);

    /**
	 * @api {get} /api/v1/products/view/by/category/:category Get products by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} category category of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Found Successfully.",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/by/ProductOffer/:ProductOffer',auth.isAuthenticated,productController.viewByProductOffer);

    /**
	 * @api {get} /api/v1/products/view/by/ProductOffer/:ProductOffer Get products by offers
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductOffer ProductOffer of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Found Successfully.",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/view/by/vendor/:VendorId',auth.isAuthenticated,productController.viewByVendorId);
    
    /**
	 * @api {get} /api/v1/products/view/by/vendor/:VendorId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} VendorId The VendorId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Found Successfully.",
	    "status": 200,
	    "data": {
                        _id: "string",
	    			    __v: number
	    		        ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/:ProductId/delete',auth.isAuthenticated,productController.deleteProduct);

    /**
	 * @api {post} /api/v1/products/:ProductId/delete Delete product by ProductId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductId ProductId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(baseUrl+'/:ProductId/edit',auth.isAuthenticated,productController.editProduct);

    /**
	 * @api {put} /api/v1/products/:ProductId/edit Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductId ProductId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl+'/create',auth.isAuthenticated,productController.createProduct);

    /**
	 * @api {post} /api/v1/products/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductName name of the product passed as a body parameter
	 * @apiParam {String} description description of the product passed as a body parameter
	 * @apiParam {String} ProductPrice price of the product passed as a body parameter
     * @apiParam {String} ProductDisplayPrice Displaying_price of the product passed as a body parameter
	 * @apiParam {String} category category of the product passed as a body parameter
     * @apiParam {String} ProductOffer offer on the product passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Created successfully",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/add/cart/:ProductId',auth.isAuthenticated,productController.addProductToCart);
    
    /**
	 * @api {get} /api/v1/products/add/cart/:ProductId Add Products to the Cart
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product added to the Cart Successfully.",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(baseUrl+'/remove/cart/:ProductId',auth.isAuthenticated,productController.removeProductFromCart);

    /**
	 * @api {get} /api/v1/products/remove/cart/:ProductId Remove Products to the Cart
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} ProductId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product removed from the Cart Successfully.",
	    "status": 200,
	    "data": [
					{
						ProductName: "string",
                        ProductId: "string",
                        VendorId: "string",
                        ProductPrice: "string",
                        ProductDisplayPrice: "string",
                        category:"string",
                        available_on: "date",
                        lastModifiedOn: "date",
                        ProductOffer: "string",
                        description: "string"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

}//end setRouter function

module.exports = {
 setRouter: setRouter
}
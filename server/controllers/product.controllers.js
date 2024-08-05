import Product from "../config/model/produt.model.js"
import AppError from "../utils/AppError.js"
import cloudinary from 'cloudinary'
import ApiFeatures from "../utils/apiFeatures.js"

const getAllProducts = async (req, res, next) => {
    try {
        
        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.find(), req.query)
          .search()
          .filter()
          .paginatino(resultPerPage); // Call pagination before executing the query
      
        let products = await apiFeature.query;
        let filteredProductsCount = products.length;
      
        return res.status(200).json({   
          success: true,
          message: 'All Products',
          products,
          productsCount,
          resultPerPage,
          filteredProductsCount,
        });
      
    } catch (error) {
        return next (new AppError(error.message,500))
    }
} 

const getAdminProduct = async (req, res, next) => {
    try {
        
        const products = await Product.find()
      
        return res.status(200).json({
          success: true,
          message: 'All Products',
          products
        });
      
    } catch (error) {
        return next (new AppError(error.message,500))
    }
} 


const createProduct = async(req,res,next)=>{
    try {
        // req.body.user = req.user.id
        const {name,description,category,sizes,price,countInStock} = req.body;
        if(!name|| !description ||!category||!sizes||!price||!countInStock){
            return next(new AppError('All fields are required',503));
        }
    
        // const product = await Product.create({
        //     name,
        //     description,
        //     category,
        //     sizes,
        //     // rating,
        //     // numReviews,
        //     price,
        //     user: req.body.user,
        //     countInStock,
             
        //     images:[{
        //         public_id:'name',
        //         secure_url:'dummy'
        //     }]
        // })
    
        
     
        // if(req.file){
        //     try {
                
        //         for(const image in images){
        //             const result = await cloudinary.v2.uploader.upload(req.file.path,{
        //                 folder:'SERVER'
        //             })
        //             if(result){
        //                 image.public_id = result.public_id
        //                 image.secur_url = result.secure_url
        //             }
        //         }
        //     } catch (error) {
        //         return next(new AppError(error.message,500))
        //     }
            
        // }
        let images = []
        if(typeof req.body.images === "string"){
            images.push(req.body.images)
        }else{
            images = req.body.images
        }

        const imagesLink = []
        for(let i =0 ;i<images.length;i++){
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder:"server",
            })
            imagesLink.push({
                public_id:result.public_id,
                secure_url:result.secure_url
            })

        }
        req.body.images = imagesLink
        req.body.user = req.user.id
        const product = await Product.create(req.body);
    
        return res.status(200).json({
            success:true,
            message:'product created succesfully',
            product
        })
    } catch (error) {
        return next(new AppError(error.message,500))        
    }
}
const deleteProduct = async(req,res,next)=>{
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return next(new AppError('product not found',500));
    }
    res.status(200).json({
        success:true,
        message:'product deleted successfully'
    })
}
const getproductbyid = async(req,res,next)=>{
    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product){
        return next(new AppError('product not found',500));
    }
    return res.status(200).json({
        success:true,
        message:'product fetched succesfully',
        product,
        
    })
}
const updateProduct = async(req,res,next)=>{
    const {id} = req.params.id;
    const product = await Product.findById(id);
    if(!product){
        return next(new AppError('product not found',500))
    }
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });



    res.status(200).json({
        success:true,
        message:'user updated succesfully',
        product
    })

}

const createProductReviews = async(req,res,next)=>{
    const {rating,comment,productid} = req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };
    const product =Product.findById(productid);

    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id)

    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev=>rev.user.toString()===req.user._id){
                rev.rating = rating
                rev.comment = comment
            }
        });
    }else{
        product.reviews.push(review)
        product.numReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg +=rev.rating
    })
    
    product.ratings = avg / product.reviews.length

    await product.save({validateBeforeSave:false})
    return res.status(200).json({
        success:true,
        message:'user review created',
        product
    })

}

const getProductReviews = async(req,res,next)=>{
    const product = Product.findById(req.query.id)
    if(!product){
        return next(new AppError('Product not found',500));
    }

    return res.status(200).json({
        success:true,
        message:'all reviews',
        reviews:product.reviews
    })
}


const deleteReview = async (req,res,next)=>{
    const product = Product.findById(req.query.id)
    if(!product){
        return next(new AppError('Product not found',500));
    }

    const reviews = product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString())

    let avg = 0;

    reviews.forEach((rev)=>{
        avg += rev.rating;
    })
    const ratings = avg / reviews.length;

    const numReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productid,
        {
            reviews,
            ratings,
            numReviews
        }
    )

}
export {
    getAllProducts,
    createProduct,
    createProductReviews,
    deleteProduct,
    getproductbyid,
    updateProduct,
    getProductReviews,
    deleteReview,
    getAdminProduct
}
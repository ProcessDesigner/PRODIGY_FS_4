import Carousel from "react-material-ui-carousel"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearError, getProductDetails, newReview } from "../action/productAction"
import ReviewCard from "../Review/ReviewCard"
import { useAlert } from "react-alert"
import { useParams } from "react-router-dom"
import { addItems } from "../action/cartAction"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,    
} from "@material-ui/core"
import { Rating } from "@mui/material"
import { NEW_REVIEW_RESET } from "../constants/productconstant"
function ProductDetails ({match}){
    const dispatch = useDispatch()
    const {id}= useParams()
    const alert = useAlert()


    const {product,loading,error} = useSelector(
        (state) =>state.productDetails
    )

    const {success,error:reviewError}= useSelector((state)=>state.newReview)


    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearError())
        }

        if(reviewError){
            alert.error(reviewError)
        }
        if(success){
            alert.success("Review Submitted Succesfully")
            dispatch({type:NEW_REVIEW_RESET})
        }

        dispatch(getProductDetails(id))
    },[dispatch,id,alert,error,reviewError,success])

    const options = {
        size:"large",
        value:product.ratings,
        readOnly:true,
        precision:0.5

    }
    const [quantity,setQuantity]= useState(1);
    const [open,setOpen] = useState(false)
    const [rating,setRating] = useState("")    
    const [comment,setComment] = useState("")    

    const inccreaseQuantity=()=>{
        if(product.countInStock <= quantity){

            return
        }
        const qty =  quantity + 1

        setQuantity(qty)
    }
    const decreaseQuantity=()=>{
        if(1 >= quantity){

            return
        }
        const qty =  quantity - 1

        setQuantity(qty)
    }

    const addtocarthandler = ()=>{
        dispatch(addItems(id,quantity));
        
    }

    const submitReviewImage = () =>{
        open ? setOpen(false) :setOpen(true)
    }

    const reviewsubmithandler = () =>{
        const myForm = new FormData()

        myForm.set("rating",rating)
        myForm.set("comment",comment)
        myForm.set("productId",id)
        dispatch(newReview(myForm))
    }

    return(
        <Fragment>
            <div>
                <Carousel>
                    {product.images && 
                        product.images.map((item,i)=>{
                            <img
                                className="CarausalImage"
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        })}
                </Carousel>
                <div>
                    <div>
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>

                    </div>
                    <div>
                        <Rating  {...options}/>
                        <span >({product.numReviews} Reviews)</span>
                    </div>
                    <div>
                        <h1>
                            {`Rs${product.price}`}
                        </h1>
                        <div>
                            <div>
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly value={quantity} type="number"/> 
                                <button onClick={inccreaseQuantity}>+</button>
                            </div>{" "}
                            <button disabled={product.Stock<1?true:false} onClick={addtocarthandler} className="border-s-black">Add to Cart</button>
                        </div>
                        <p>
                            Status:{" "}
                            <b className={product.stock<1 ? "redcolor" :"greencolor"}>{product.Stock<1?"Out of Stock":"Instock"}</b>
                        </p>
                    </div>
                    <button onClick={submitReviewImage}>Submit Review</button>
                </div>


            </div>
            <h3>REVIEWS</h3>
            <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewImage}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent>
                    <Rating
                        onChange={(e)=>setRating(e.target.value)}
                        value={rating}
                        size= "large"

                    />
                    <textarea
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    >

                    </textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewImage}>Cancel</Button>
                    <Button  onClick={reviewsubmithandler                                                                                                                                   }>Submit</Button>
                </DialogActions>
            </Dialog>
            {product.reviews && product.reviews[0]?(
                <div>
                    {product.reviews&&
                        product.reviews.map((review)=><ReviewCard key={review.name} review = {review}/>)
                    }
                </div>
            ):(
                <p>No reviews Yet</p>
            )
            }
        </Fragment>
    )
}

export default ProductDetails
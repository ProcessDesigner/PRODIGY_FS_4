import {Rating} from "@mui/material"

function ReviewCard({review}){
    const options = {
        size:"large",
        value:review.rating,
        readOnly:true,
        precision:0.5



    };
    
    return(
        <div>
            <img src={profilePng} alt='user'/>
            <p>{review.name}</p>
            <Rating {...options}/>
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard
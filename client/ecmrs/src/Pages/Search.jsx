import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom";
function Search({history}){
    
    const [keywords,setkeywords] = useState("");
    const navigate = useNavigate()
    
    const searchSubmit=(e)=>{
        e.preventDefault()
        if(keywords.trim()){
            navigate(`/products/${keywords}`)
        }else{
            navigate("/products")
        }

    }
    
    return (
        <Fragment>
            <form onSubmit={searchSubmit}>
                <input 
                    type="text"
                    placeholder="Search a product"
                    onChange={(e)=>setkeywords(e.target.value)}
                />
                <input type="submit" value="Search"/>
            </form>
        </Fragment> 
    )
}

export default Search
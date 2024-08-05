import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productconstant";
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "../constants/userConstants";
import axiosInstance from "../Helperw/axiosInstance";

const getProduct = (keywords="",currentpage=1,price=[0,25000],category,ratings=0) => async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});

        let link = `/products?keyword=${keywords}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        
        if(category){
            link = `/products?keyword=${keywords}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        
        const {data} = await axiosInstance.get(link)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message

        })
    }
}



const getAdminProduct = () => async(dispatch)=>{
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST})

        const {data} = await axiosInstance.get('/products/admin/products')
        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.message.data.message
        })
    }
}
const getProductDetails = (id) => async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axiosInstance.get(`/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message

        })
    }
}
const newReview = (reviewData) => async(dispatch)=>{
    try {
        dispatch({type:NEW_REVIEW_REQUEST});

        const config={
            headers:{"Content-Type":"application/json"}
        }

        const {data} = await axiosInstance.put(`/products/review`,reviewData,config)
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.product,
        })
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message

        })
    }
}
const deleteProduct = (id) => async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST});


        const {data} = await axiosInstance.delete(`/products/${id}`)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message

        })
    }
}
const createProduct = (productData) => async(dispatch)=>{
    try {
        dispatch({type:NEW_PRODUCT_REQUEST});

        const config={
            headers:{"Content-Type":"application/json"}
        }

        const {data} = await axiosInstance.post(`/products`,productData,config)
        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message

        })
    }
}
const updateProduct = (id,productData) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});

        const config={
            headers:{"Content-Type":"application/json"}
        }

        const {data} = await axiosInstance.put(`/products/${id}`,productData,config)
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message

        })
    }
}


const clearError = () =>async (dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}



export {
    getProduct,
    clearError,
    getProductDetails,
    newReview,
    getAdminProduct,
    createProduct,
    deleteProduct,
    updateProduct
}
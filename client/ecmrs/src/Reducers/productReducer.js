import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET } from '../constants/productconstant' 
import { CLEAR_ERROR } from "../constants/productconstant";
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS } from '../constants/userConstants';

const productReducer = (state={products:[]},action) => {
    console.log(action.payload);
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return{
                loading:true,
                product:[]
            } 
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.products,
                productsCount :action.payload.productsCount,    
                resultperpage:action.payload.resultperpage,
                filteredProductsCount:action.payload.filteredProductsCount
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload,

            };
        case CLEAR_ERROR:
            return{
                ...state,
                error:null
            }
        default :
            return state
                

    }
    
}
const productDetailReducer = (state = { product: {}, loading: false, error: null }, action) => {
    console.log(action.payload);
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            case ADMIN_PRODUCT_REQUEST:    
            return {
                loading: true,
                product: {},
            }
        case PRODUCT_DETAILS_SUCCESS:

            return {
                loading: false,
                product: action.payload,
            }
        
        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading:true,
                product:action.payload
            }
        
        case PRODUCT_DETAILS_FAIL:
            case ADMIN_PRODUCT_FAIL:    
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

const proReducer = (state = {}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_PRODUCT_FAIL:
            case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
const newReviewReducer = (state = { }, action) => {
    console.log(action.payload);
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
const newProductReducer = (state = { }, action) => {
    console.log(action.payload);
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export {
    productReducer,
    productDetailReducer,
    newReviewReducer,
    newProductReducer,
    proReducer
}
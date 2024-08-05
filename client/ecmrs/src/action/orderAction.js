import axiosInstance from "../Helperw/axiosInstance";
import { CLEAR_ERRORS } from "../constants/userConstants";
import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "./orderConstants"

const createOrder = (order) => (dispatch,getState) =>{
    try {
        dispatch({type:CREATE_ORDER_REQUEST})
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };
        const {data} = axiosInstance.post('/order/new',order,config);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
} 
const myOrders = () =>async (dispatch,getState) =>{
    try {
        dispatch({type:MY_ORDER_REQUEST})
       
        const {data} = axiosInstance.get('/order/me');
        dispatch({type:MY_ORDER_SUCCESS,payload:data.orders})
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
} 
const getAllOrders = () =>async (dispatch,getState) =>{
    try {
        dispatch({type:ALL_ORDER_REQUEST})
       
        const {data} = axiosInstance.get('/order/admin/order');
        dispatch({type:ALL_ORDER_SUCCESS,payload:data.orders})
    } catch (error) {
        dispatch({
            type:ALL_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
} 

const updateOrder = (id,order) => (dispatch,getState) =>{
    try {
        dispatch({type:UPDATE_ORDER_REQUEST})
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };
        const {data} = axiosInstance.put(`/admin/order/${id}`,order,config);
        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
} 

const deleteOrder = (id) => (dispatch) =>{
    try {
        dispatch({type:DELETE_ORDER_REQUEST})
        
        const {data} = axiosInstance.delete(`/admin/order/${id}`);
        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:error.response.data.message
        })
    }
} 

const getOrderDetails = (id) =>async (dispatch) =>{
    try {
        dispatch({type:ORDER_DETAILS_REQUEST})
       
        const {data} = axiosInstance.get(`/order/${id}`);
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order})
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
} 

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };

export {
    createOrder,
    myOrders,
    getOrderDetails,
    getAllOrders,
    updateOrder,
    deleteOrder
}
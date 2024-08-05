import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
import {  loginaccount } from '../Redux/Slices/authsliice';
function Login(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [logindata,setlogindata] = useState({
        email: "",
        password: "",
    })

    const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn)
    function handleUserInput(event){
        const {name,value} = event.target;
        setlogindata(
            {
                ...logindata,
                [name]:value
            }
        )
    }

    // const redirect = location.search ?location.search.split("=")[1] : "/"
    
    async function login(event){
        event.preventDefault()
        if( !logindata.email || !logindata.password ){
            toast.error('All fields are required');
            return; 
        }
        

        
        const response = await dispatch(loginaccount(logindata))
        if(response?.payload?.success){
            navigate('/signup');
        }
        navigate('/signup');
        setlogindata({
            email: "",
            password: "",
        })
    }
    // useEffect(()=>{
    //     if(isLoggedIn){
    //         navigate(redirect)
    //     }        

    // },[isLoggedIn])
    
    return (
        <div className="h-screen flex justify-center bg-gray-100">
            <div className="max-w-md mx-auto p-4 pt-6 pb-4 bg-white rounded shadow-md">
                <form noValidate onSubmit={login} className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Login Page</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    onChange={handleUserInput}
                    value={logindata.email}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                    </label>
                    <input
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    onChange={handleUserInput}
                    value={logindata.password}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
                <p className="text-gray-600 text-sm">
                    Do not have an account ? <Link to={'/signup'} className="text-blue-600 hover:text-blue-800">Signup</Link>
                </p>
                </form>
            </div>
            </div>
    )
}

export default Login;
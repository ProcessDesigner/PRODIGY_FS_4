import { useState } from 'react';
import toast from 'react-hot-toast';
import {BsPersonCircle} from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../Redux/Slices/authsliice';
function Signup(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [previewImage,setpreviewImage] = useState('')
    const [signupData,setSignupData] = useState({
        fullName : "",
        email: "",
        password: "",
        number : "",
        avatar: ""
    })
    function handleUserInput(event){
        const {name,value} = event.target;
        setSignupData(
            {
                ...signupData,
                [name]:value
            }
        )
    }
    function getImage(event){
        event.preventDefault()
        const uploaded_image = event.target.files[0];
        if(uploaded_image){
            setSignupData({
                ...signupData,
                avatar:uploaded_image
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploaded_image),
            fileReader.addEventListener('load',function(){
                console.log(this.result);
                setpreviewImage(this.result)
            })
        }
    }
    async function createNewAccount(event){
        event.preventDefault()
        if(!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar || !signupData.number){
            toast.error('All fields are required');
            return; 
        }
        if(!signupData.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )){
            toast.error('Invalid Email');
        }

        const formData = new FormData();
        formData.append("fullName",signupData.fullName)
        formData.append("email",signupData.email)
        formData.append("password",signupData.password)
        formData.append("number",signupData.number)
        formData.append("avatar",signupData.avatar)

        const response = await dispatch(createAccount(formData))
        if(response?.payload?.success){
            navigate('/login');
            setSignupData({
                fullName : "",
                email: "",
                password: "",
                number : "",
                avatar: ""
            })
            setpreviewImage("")
        }
    }
    return (
        <div className="h-screen flex justify-center bg-gray-100">
            <div className="max-w-md mx-auto p-4 pt-6 pb-4 bg-white rounded shadow-md">
                <form noValidate onSubmit={createNewAccount} className="space-y-4">
                <h1 className="text-2xl font-bold mb-4">Registration Page</h1>
                <div className="flex justify-center mb-4">
                    <label
                    htmlFor="image_upload"
                    className="cursor-pointer flex justify-center w-24 h-24 rounded-full overflow-hidden bg-gray-100"
                    >
                    {previewImage ? (
                        <img src={previewImage} alt="Preview Image" className="w-full h-full object-cover" />
                    ) : (
                        <BsPersonCircle className="w-full h-full text-gray-300" />
                    )}
                    </label>
                    <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .svg"
                    onChange={getImage}
                    className="hidden"
                    id="image_upload"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                    Name
                    </label>
                    <input
                    type="text"
                    required
                    name="fullName"
                    id="fullName"
                    placeholder="Enter Your Name"
                    onChange={handleUserInput}
                    value={signupData.fullName}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                </div>
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
                    value={signupData.email}
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
                        value={signupData.password}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        required
                        name="number"
                        id="number"
                        placeholder="Enter Your Phone Number"
                        onChange={handleUserInput}
                        value={signupData.number}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                    </div>
                    <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Create Account
                    </button>
                    <p className="text-gray-600 text-sm">
                    Already have an account ? <Link to={'/login'} className="text-blue-600 hover:text-blue-800">login</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default Signup;
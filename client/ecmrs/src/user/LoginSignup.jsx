import { Fragment, useRef, useState, useEffect } from "react";
import Loader from "../Pages/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonCircle } from 'react-icons/bs';
import { clearErrors, login, register } from "../action/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    fullName: "",
    number: "",
    email: "",
    password: "",
  });

  const { fullName, email, password, number } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("fullName", fullName);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("number", number);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, redirect, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
              <div>
                <div className="flex justify-between mb-4">
                  <p
                    className="cursor-pointer font-semibold text-gray-700"
                    onClick={(e) => switchTabs(e, "login")}
                  >
                    LOGIN
                  </p>
                  <p
                    className="cursor-pointer font-semibold text-gray-700"
                    onClick={(e) => switchTabs(e, "register")}
                  >
                    REGISTER
                  </p>
                </div>
                <button ref={switcherTab} className="hidden"></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <MailOutlineIcon className="mr-2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="flex-grow p-2 outline-none"
                  />
                </div>
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <LockOpenIcon className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="flex-grow p-2 outline-none"
                  />
                </div>
                <Link to="/password/forgot" className="text-blue-500 text-sm">
                  Forget Password?
                </Link>
                <input
                  type="submit"
                  value="Login"
                  className="mt-4 bg-blue-500 text-white p-2 rounded w-full cursor-pointer hover:bg-blue-600 transition duration-300"
                />
              </form>
              <form
                className="signUpForm mt-4"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <FaceIcon className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="fullName"
                    value={fullName}
                    onChange={registerDataChange}
                    className="flex-grow p-2 outline-none"
                  />
                </div>
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <MailOutlineIcon className="mr-2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    className="flex-grow p-2 outline-none"
                  />
                </div>
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <LockOpenIcon className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    className="flex-grow p-2 outline-none"
                  />
                </div>
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <BsPersonCircle className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    name="number"
                    value={number}
                    onChange={registerDataChange}
                    className="flex-grow p-2 outline-none"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <img src={avatarPreview} alt="Avatar Preview" className="w-16 h-16 rounded-full mr-2" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className="cursor-pointer"
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="mt-4 bg-blue-500 text-white p-2 rounded w-full cursor-pointer hover:bg-blue-600 transition duration-300"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;

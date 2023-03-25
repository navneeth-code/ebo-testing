import { createContext, useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const LC_USER = JSON.parse(localStorage.getItem("user"));

  //initial user state
  const [initialState, setInitialState] = useState({
    user: LC_USER ? LC_USER : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  });
  //phone input state
  const [number, setNumber] = useState("");

  //form rendering on condition
  const [authPage, setAuthPage] = useState({
    login: true,
    otp: false,
    register: false,
  });

  //side drawer selection
  const sidedrawer = useRef(null);
  const URL = "http://localhost:5000";

  //firebase verification object

  const [verificationObj, setVerificationObj] = useState({});

  const [firebaseUID, setFireBaseUID] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  //
  //setting up the invisible recaptcha
  const setupRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    );
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };

  //getting the otp
  const getOTP = async (e) => {
    e.preventDefault();
    if (number.length < 10) {
      return toast.error("Please enter a valid phone number");
    }

    try {
      setInitialState((prev) => ({ ...prev, isLoading: true }));
      const response = await setupRecaptcha(`+91${number}`);

      if (!response) {
        setInitialState((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
        }));
        return toast.error("Something went wrong with verification");
      } else {
        setInitialState((prev) => ({
          ...prev,
          isLoading: false,
          isSuccess: true,
        }));
        setVerificationObj(response);
        setAuthPage((prev) => ({ ...prev, login: false, otp: true }));
      }
    } catch (error) {
      setInitialState((prev) => ({ ...prev, isLoading: false, isError: true }));
      toast.error(error.message);
    }
  };

  //if user already exist
  const userExists = async () => {
    try {
      const user = await axios.post(`${URL}/api/users/find`, {
        phoneNumber: number,
      });
      return user.data;
    } catch (error) {
      console.log(error);
    }
  };

  //for closing sidebar
  const closeSideBar = () => {
    sidedrawer.current.checked = false;
  };

  //registering new user
  const registerUser = async (formData) => {
    try {
      setInitialState((prev) => ({ ...prev, isLoading: true }));
      const res = await axios.post(`${URL}/api/users/register`, formData);
      setInitialState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: true,
        user: res.data,
      }));
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
      setInitialState((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
        message: error,
      }));
    }
  };

  //reset the initial state, making ready for next action
  const resetInitialState = () => {
    setInitialState((prev) => ({
      ...prev,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
    }));
  };

  //log out a user
  const logout = () => {
    localStorage.removeItem("user");
    setInitialState((prev) => ({ ...prev, user: null }));
    setAuthPage({ login: true, otp: false, register: false });
  };

  //input border css
  const inputBorder = "border-b-[1px] border-black py-3 my-3";

  return (
    <AuthContext.Provider
      value={{
        setupRecaptcha,
        user,
        inputBorder,
        verificationObj,
        setVerificationObj,
        authPage,
        setAuthPage,
        number,
        setNumber,
        userExists,
        sidedrawer,
        initialState,
        setInitialState,
        closeSideBar,
        registerUser,
        firebaseUID,
        setFireBaseUID,
        resetInitialState,
        getOTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

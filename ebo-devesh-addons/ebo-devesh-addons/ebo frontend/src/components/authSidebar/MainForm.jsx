import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Subheading from "../../components/authSidebar/Subheading";
import LoginForm from "../../components/authSidebar/LoginForm";
import OTPform from "../../components/authSidebar/OTPform";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/authSidebar/RegisterForm";
import "react-phone-number-input/style.css";

const MainForm = () => {
  const {
    authPage: { login, otp },
    number,
  } = useContext(AuthContext);

  return (
    <>
      <Subheading
        main={login ? "Login" : otp ? "Enter OTP" : "Register"}
        second={
          login
            ? "Please enter your number"
            : otp
            ? `We have sent you an OTP to your number ${number}`
            : "Please enter your details"
        }
      />
      {login ? <LoginForm /> : otp ? <OTPform /> : <RegisterForm />}
      <p className="text-xs py-2">
        By clicking on Login, I accept the{" "}
        <Link className="text-sm font-semibold text-[#2136d4]" to={"#"}>
          Terms & Conditions
        </Link>{" "}
        &{" "}
        <Link className="text-sm font-semibold text-[#2136d4]" to={"#"}>
          Privacy Policy
        </Link>
      </p>
    </>
  );
};

export default MainForm;

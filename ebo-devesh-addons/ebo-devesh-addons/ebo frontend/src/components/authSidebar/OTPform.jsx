import { useContext, useEffect, useRef, useState } from "react";
import PhoneInput from "./PhoneInput";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import Button from "./Button";

const OTPform = () => {
  const {
    verificationObj,
    inputBorder,
    setAuthPage,
    number,
    setNumber,
    userExists,
    closeSideBar,
    setInitialState,
    setFireBaseUID,
  } = useContext(AuthContext);
  const OTPref = useRef(null);

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
  }, [timer]);

  const verifyOTP = async (e) => {
    e.preventDefault();
    const OTP = OTPref.current.value;
    if (OTP.length < 6) {
      return toast.error("OTP should have minimum length of six");
    }

    try {
      setInitialState((prev) => ({ ...prev, isLoading: true }));
      let confirm = await verificationObj.confirm(OTP);

      if (!confirm) {
        setInitialState((prev) => ({ ...prev, isLoading: false }));
        return console.log("Something went wrong with OTP verification");
      } else {
        setNumber(`${confirm.user.phoneNumber}`.substring(3));
        setFireBaseUID(confirm.user.uid);
        const user = await userExists();
        if (user.registrationRequired) {
          setAuthPage((prev) => ({ ...prev, otp: false, register: true }));
          setInitialState((prev) => ({ ...prev, isLoading: false }));
        } else {
          localStorage.setItem("user", JSON.stringify(user?.user));
          setAuthPage({ login: true, otp: false, register: false });
          closeSideBar();
          setInitialState((prev) => ({
            ...prev,
            isLoading: false,
            user: user.user,
          }));
        }
      }
    } catch (error) {
      setInitialState((prev) => ({ ...prev, isLoading: false }));
      console.log(error);
    }
  };

  const onEdit = () => {
    setAuthPage((prev) => ({ ...prev, login: true, otp: false }));
  };

  const resendOTP = () => {
    if (timer === 0) {
    }
  };

  return (
    <form onSubmit={verifyOTP}>
      <div className="relative mb-2 mt-4 pt-5">
        <span className="text-sm font-semibold absolute top-0">
          Phone Number
        </span>
        <PhoneInput number={number} disabled={true} />
        <span
          className="text-[#2136d4] text-xs font-semibold absolute right-3 bottom-3 cursor-pointer"
          onClick={onEdit}
        >
          Edit
        </span>
      </div>
      <div className="relative mb-1">
        <span className="text-sm font-semibold absolute">
          One time password
        </span>
        <input
          type="number"
          ref={OTPref}
          className={`${inputBorder} w-full mb-2 outline-none`}
          max={999999}
        />
        <span className="text-[#2136d4] text-xs font-semibold absolute right-3 bottom-3 cursor-pointer hidden lg:block">
          <p className="text-[rgba(0,0,0,0.7)]">
            00:{timer < 10 ? "0" + timer : timer}
          </p>
          <span
            className={timer > 0 ? "cursor-not-allowed" : "cursor-pointer"}
            onClick={resendOTP}
          >
            Resend OTP
          </span>
        </span>
        <div className="flex gap-1 justify-center items-center text-[#2136d4] text-xs font-semibold lg:hidden">
          <span className="text-[rgba(0,0,0,0.7)]">
            00:{timer < 10 ? "0" + timer : timer}
          </span>
          <span
            className={`my-3 lg:hidden ${
              timer > 0 ? "pointer-events-none" : "cursor-pointer"
            }`}
            onClick={resendOTP}
          >
            Resend OTP
          </span>
        </div>
      </div>
      <Button type={"submit"} text={"Verify"} />
    </form>
  );
};

export default OTPform;

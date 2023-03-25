import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "./Button";
import PhoneInput from "./PhoneInput";

const LoginForm = () => {
  const { number, setNumber, getOTP } = useContext(AuthContext);

  return (
    <form onSubmit={getOTP}>
      <div className={"my-3 pt-3 pb-2"}>
        <span className="text-sm font-semibold">Phone Number</span>
        <PhoneInput number={number} setNumber={setNumber} />
      </div>
      <Button text={"continue"} type={"submit"} id={`sign-in-button`} />
    </form>
  );
};

export default LoginForm;

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const Button = ({ text, type, id }) => {
  const {
    initialState: { isLoading },
  } = useContext(AuthContext);

  return (
    <button
      type={type}
      className={`bg-[#2136d4] text-white w-full py-3 rounded-md active:scale-[0.99] transition-all uppercase font-semibold hover:opacity-[0.9] ${
        isLoading ? "pointer-events-none" : "cursor-pointer"
      }`}
      id={id ? id : ""}
    >
      {isLoading ? <ClipLoader size={20} color={"white"} /> : text}
    </button>
  );
};

export default Button;

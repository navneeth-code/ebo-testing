import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import AuthContext from "../../context/AuthContext";
const Header = () => {
  const { closeSideBar } = useContext(AuthContext);
  return (
    <div className="w-full flex items-center px-4 py-2 md:py-1">
      <RxCross1
        size={25}
        className="mr-3 cursor-pointer"
        onClick={closeSideBar}
      />
      <img
        src="/ebo_blue.png"
        className="w-18 md:w-20 md:h-20 h-16"
        alt="ebo_logo"
      />
    </div>
  );
};

export default Header;

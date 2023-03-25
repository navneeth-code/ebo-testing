import { BiUser } from "react-icons/bi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Main from "../components/Main";
import Sidebar from "../components/authSidebar/Sidebar";

const Home = () => {
  const { sidedrawer } = useContext(AuthContext);
  return (
    <div className="drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        ref={sidedrawer}
      />
      <div className="drawer-content">
        {/* Home Page Data will Render from here main component*/}
        <Main />

        {/* the button for opening sidebar */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          <BiUser size={20} className="mr-2" />
          <span>Profile</span>
        </label>
      </div>
      <Sidebar />
    </div>
  );
};

export default Home;

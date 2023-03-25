import FormContainer from "./FormContainer";
import Header from "../../components/authSidebar/Header";
import { useAuthStatus } from "../../hooks/useAuthStatus";

const Sidebar = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul className="menu bg-base-100 w-96 text-base-content">
        <Header />
        <FormContainer loggedIn={loggedIn} checkingStatus={checkingStatus} />
      </ul>
    </div>
  );
};

export default Sidebar;

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Profile = () => {
  const {
    initialState: { user },
    logout,
  } = useContext(AuthContext);

  return (
    <div>
      <p>Name:{user?.name}</p>
      <p>Email:{user?.email}</p>
      <button onClick={logout} className="btn btn-outline">
        Logout
      </button>
    </div>
  );
};

export default Profile;

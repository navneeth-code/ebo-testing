import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../assets/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoute;

import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuthStatus = () => {
  const {
    initialState: { user },
  } = useContext(AuthContext);

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};

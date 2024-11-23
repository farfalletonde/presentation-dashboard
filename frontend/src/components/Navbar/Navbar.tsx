import React, { useContext, useState } from "react";
import "./index.css";
import { ReactComponent as Logo } from "../../public/svg/logo.svg";
import { AuthContext } from "src/context/AuthContext";
import useLogout from "src/api/useLogout";
import { apiRequest } from "src/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [showLogout, setShowLogout] = useState(false);

  const logout = useLogout();
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout.post();
    await AsyncStorage.removeItem("auth");
    apiRequest.clearTokens();
    setUser(null);
  };

  return (
    <div className="navbar">
      <Logo className="navbar_logo" />
      <div className="navbar_avatar" onClick={() => setShowLogout(!showLogout)}>
        <div className="navbar_avatar_name">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        {showLogout && (
          <div onClick={handleLogout} className="logout_menu">
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

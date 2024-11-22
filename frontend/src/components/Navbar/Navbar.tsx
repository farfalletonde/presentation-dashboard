import React, { useContext } from "react";
import "./index.css";
import { ReactComponent as Logo } from "../../public/svg/logo.svg";
import { AuthContext } from "src/context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Logo className="navbar_logo" />
      <div className="navbar_avatar">
        <div className="navbar_avatar_name">{user?.name.charAt(0)}</div>
      </div>
    </div>
  );
};

export default Navbar;

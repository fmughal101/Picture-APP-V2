import { useState, useEffect, useContext } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { IoNavigateOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../../utils/useUser";
import appearanceContext from "../../utils/Context";
import "./NavBarCSS.css";

const NavBar = ({ post }) => {
  const [small, setSmall] = useState(window.innerWidth < 1261);
  const [dropDown, setDropDown] = useState(false);
  const { user, userInfo } = useUser();
  const { appearance, setAppearance } = useContext(appearanceContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleChange = (e) => {
      if (window.innerWidth < 1261) setSmall(true);
      else setSmall(false);
    };

    window.addEventListener("resize", handleChange);

    return () => window.removeEventListener("resize", handleChange);
  }, []);

  return (
    <div
      className={!appearance ? "nav-bar-container" : "nav-bar-container dark"}
    >
      <div>
        <div className="logo-title">
          {small ? <h1>-+</h1> : <h1>- Picture V2 +</h1>}
        </div>

        <div className="nav-bar-items">
          <ul>
            <li onClick={() => post(true)}>{small ? <FiPlusSquare /> : "Create New Post"}</li>
            <li>{small ? <BiSearch /> : "Search"}</li>
            <li>{small ? <IoNavigateOutline /> : "Navigate"}</li>
            <li>{small ? <IoIosNotificationsOutline /> : "Notification"}</li>
          </ul>
        </div>
      </div>

      <div className="account-manager">
        {" "}
        {dropDown && (
          <div className="drop-down-container">
            <ul>
              <li
                onClick={() => {
                  if (user !== null) signOut(getAuth());
                  else navigate("/login");
                }}
              >
                {user !== null ? "Log Out" : "Log In"}
              </li>
              <li onClick={() => setAppearance(!appearance)}>Appearance</li>
            </ul>
          </div>
        )}
        <div className="account" onClick={() => setDropDown(!dropDown)}>
          <>
            {" "}
            <RiAccountCircleLine />{" "}
            {!small && (
              <span className="userName">
                {user !== null ? userInfo.user : "Guest"}
              </span>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import React, { useState, useEffect, useCallback } from "react";
import "./NavBar.css";
import { Vodialogo } from "assets/images/";
import Button from "components/UI/Button/Button";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faBell, faPlay } from "@fortawesome/free-solid-svg-icons";
// import Search from '../Search/Search'
import LoginControl from "../../pages/loginRegister/LoginControl";

const NavBar = (props) => {
  const { navigation, profileDropdown, navDropdown, loginButton } = props;
  const [isNavbarAtTop, setIsNavbarAtTop] = useState(true);

  const scrollNavbarStateHandler = useCallback(() => {
    const navbarAtTop = window.scrollY < 45;
    if (navbarAtTop !== isNavbarAtTop) {
      setIsNavbarAtTop(navbarAtTop);
    }
  }, [isNavbarAtTop]);

  const hidden = {
    display: "none",
  };

  const logoStyle = {
    height: "100%",
    width: "108px",
    margin: "auto",
  };

  const checkLogin = () => {
    return !localStorage.getItem("token") ? (
      <Link to="/login">
        <span
          className="ExtraOptions"
          style={{ fontWeight: "bold", color: "red" }}
        >
          LOGIN
        </span>
      </Link>
    ) : (
      <>
        {/* <div className="Horizontal">
              <NavLink className="inactive" activeClassName="active" to="/home" exact>Home</NavLink>
              <NavLink className="inactive" activeClassName="active" to="/tvAuth" exact>TV Shows</NavLink>
              <NavLink className="inactive" activeClassName="active" to="/moviesAuth" exact>Movies</NavLink>
            </div>
            <div className="Vertical">
            {navDropdown}
          </div> */}
        <span className="ExtraOptions" style={{ fontWeight: "350" }}>
          KIDS
        </span>
        <FontAwesomeIcon className="ExtraOptions" size="lg" icon={faGift} />
        <FontAwesomeIcon className="ExtraOptions" size="lg" icon={faBell} />
        {profileDropdown}
      </>
    );
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollNavbarStateHandler);
    return () => {
      document.removeEventListener("scroll", scrollNavbarStateHandler);
    };
  }, [scrollNavbarStateHandler]);

  let navTiles = null;
  let flexStyle = {
    justifyContent: "space-between",
    backgroundColor: !isNavbarAtTop && "black",
  };

  if (navigation) {
    navTiles = (
      <>
        <div className="LinkContainer">
          <div className="Horizontal">
            <NavLink className="inactive" activeClassName="active" to="/" exact>
              Home
            </NavLink>
            <NavLink
              className="inactive"
              activeClassName="active"
              to="/tv"
              exact
            >
              TV Shows
            </NavLink>
            <NavLink
              className="inactive"
              activeClassName="active"
              to="/movies"
              exact
            >
              Movies
            </NavLink>
          </div>
          <div className="Vertical">{navDropdown}</div>
        </div>

        <div className="OptionsContainer">
          {/* <Search /> */}
          {/* <Search /> */}
          {checkLogin()}
        </div>
      </>
    );
  }

  return (
    <div className="NavBar Sticky" style={flexStyle}>
      <Link to="/">
        <img className="logo" style={logoStyle} src={Vodialogo} alt="Logo" />
      </Link>
      {navTiles}
    </div>
  );
};

export default NavBar;

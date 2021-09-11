import React, { useState, useEffect } from "react";
import "./header.scss";
import { menus } from "../../../modals/page";
import DeskTopMenu from "./desktopMenu";
import MobileSideBarMenu from "./mobileMenu";
const mediaQuery = "screen and (min-width: 768px)";

const Header = (props) => {
  const mql = window.matchMedia(mediaQuery);
  const [showDesktopMenu, setShowDesktopMenu] = useState(mql.matches);

  useEffect(() => {
    const handleMediaChange = function (cMediaQuery) {
      setShowDesktopMenu(cMediaQuery.matches);
    };
    mql.addEventListener("change", handleMediaChange);
    setShowDesktopMenu(mql.matches);

    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [mql]);

  return showDesktopMenu ? (
    <DeskTopMenu menus={menus} />
  ) : (
    <MobileSideBarMenu menus={menus} />
  );
};

export default Header;

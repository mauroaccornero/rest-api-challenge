import { NavLink } from "react-router-dom";
import MENU_PATHS from "./constants/MenuPaths";

import "./nav.css";

const Nav = () => {
  return (
    <nav id={"menu"}>
      <div className="container">
        <ul>
          {MENU_PATHS.map((menuItem) => (
            <li key={menuItem.path}>
              <NavLink end to={menuItem.path}>
                {menuItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

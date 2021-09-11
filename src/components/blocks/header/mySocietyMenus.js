import { NavLink } from "react-router-dom";
import { Divider } from "../../../shared";
export default function MySocietyMenu({ menus, isMobileMenu }) {
    return (
        <div className="menuWrap">
            {menus.map((menu) => {
                return (
                    <NavLink key={menu.name} to={menu.path}>
                        <div className="singleMenu">
                            <div className="iconWrap">{menu.icon}</div>
                            <div className="name">{menu.name}</div>
                        </div>
                        {isMobileMenu ? <Divider /> : null}
                    </NavLink>
                );
            })}
        </div>
    );
}

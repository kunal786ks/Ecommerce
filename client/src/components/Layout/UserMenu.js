import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
const UserMenu = () => {
  const [auth]=useAuth();
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
         { auth?.user?.role===2 && <NavLink
            to="/dashboard/vendor/create-product"
            className="list-group-item list-group-item-action"
          >
            Sell Anything
          </NavLink>}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

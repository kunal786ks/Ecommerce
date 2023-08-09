import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
const AdminMenu = () => {
  const [auth]=useAuth();
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          {auth?.user?.role===2?<>
          <h4>Vendor Panel</h4>
          </>:<><h4>Admin Panel</h4>
          </>}
          
          {auth?.user?.role===1 && <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>}
          {auth?.user?.role===1?<NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>:<NavLink
            to="/dashboard/vendor/create-product"
            className="list-group-item list-group-item-action"
          >
            Sell Your Product
          </NavLink>}
          {auth?.user?.role===1 ?<NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            See All Products
          </NavLink>:<NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Your Products
          </NavLink>}
          {auth?.user?.role===1?<NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            All Orders
          </NavLink>:<NavLink
            to="/dashboard/vendor/orders"
            className="list-group-item list-group-item-action"
          >
            Your Orders
          </NavLink>}
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;

import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              {auth.user.role === 2 ? <>
              <h3>Vendor Name: {auth?.user?.name}</h3>
              <h3>Vendor email:{auth?.user?.email}</h3>
              <h3>Vendor address:{auth?.user?.address}</h3>
              </>:<>
              <h3>User Name:{auth?.user?.name}</h3>
              <h3>User email:{auth?.user?.email}</h3>
              <h3>User address:{auth?.user?.address}</h3>
              </>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

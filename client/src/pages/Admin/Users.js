import React,{useEffect, useState} from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from 'axios'
import { useAuth } from "../../context/auth";
const Users = () => {
  const [users,setUsers]=useState([]);
  const [auth]=useAuth();
  const getAllusers=async()=>{
      try{
          const { data } = await axios.get("/api/v1/auth/users");
          console.log(data);
          setUsers(data)
      }catch(err){
          console.log(err);
      }
  }
  useEffect(()=>{
    // getAllusers();
    if (auth?.token) getAllusers()
  },[auth?.token])
const deleteVendor=(id)=>{
  try{
    //todo
  }catch(err){
    console.log(err)
  }
}
  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            {users?.map((p)=>(
              p.role===2 &&
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>{p?.name}</div>
                <button className="mx-2" onClick={deleteVendor(p?._id)}>disbale this user</button>
                </div>
            ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;

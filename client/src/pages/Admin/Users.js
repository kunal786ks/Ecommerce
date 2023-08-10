import React,{useEffect, useState} from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from 'axios'
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
const Users = () => {
  const [allow,setAllow]=useState(false)
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
  
 
const deleteVendor=async(id)=>{
  try{
    //todo
    const { data } = await axios.delete(`/api/v1/auth/user/${id}`);
    if(data.success===true){
       return toast.success("Changes Updated Successfully") && setAllow(!allow)
    }
    setAllow(!allow)
    console.log(data)
    console.log(allow)
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  // getAllusers();
  if (auth?.token) getAllusers()
  console.log('useeffect')
},[auth?.token,allow])
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div  style={{marginTop:'80px'}} className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{textAlign:'center',backgroundColor:'blue',color:'white'}}>Vendors List</h1>
            {users?.map((p)=>(
              p.role===2 &&
              <div style={{display:'flex',justifyContent:'space-between',border:'1px dashed black',padding:'10px',marginBottom:'10px'}}>
                <div style={{fontWeight:'bold'}}>Vendor's Name: {p?.name}</div>
                <div style={{fontWeight:'bold'}}>Vendor's Email: {p?.email}</div>
                <div style={{fontWeight:'bold'}}>Joined At:{p?.createdAt}</div>
                <button className="mx-2 disable" onClick={()=>deleteVendor(p?._id)} >{p?.disabled?"Enable Vendor":"Disable vendor"}</button>
                </div>
            ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

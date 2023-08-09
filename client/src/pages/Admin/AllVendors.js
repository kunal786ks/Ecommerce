import React, { useState } from 'react'
import axios from 'axios'
const AllVendors = () => {
    const [users,setUsers]=useState([]);
    const getAllusers=async()=>{
        try{
            const { data } = await axios.get("/api/v1/auth/users");
            console.log(data);
            setUsers(data)
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div>
      <h1>See Number of Vendors in Your Site</h1>
    </div>
  )
}

export default AllVendors

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const VendorOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [stock,setStock]=useState(false);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const userId = auth.user._id
  console.log(userId)
  // console.log("user",,"type", typeof(auth.user._id))
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      console.log(data)      
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token,stock]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const updateStock=async(id)=>{
    try{
      const {data}=await axios.delete(`/api/v1/product/update/${id}`)
      setStock(!stock)
      console.log(data);
      toast.success(data.message)
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => (

            // return (
              userId === o.products[0]?.createdBy && 

              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container" >
                  {o?.products?.map((p, i) => (
                    auth.user._id===p.createdBy  && <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      {/* to display the order of specific vendor */}
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          style={{objectFit:'contain'}}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                        <p>No of items left in stock: {p.quantity}</p>
                        {p.quantity>0 && o.status==='deliverd' && <button style={{padding:'6px 22px',border:'none',borderRadius:'100px'}}onClick={()=>updateStock(p._id)}>stock</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            // );
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default VendorOrders;

import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth]=useAuth();
  console.log(auth.user)
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      console.log("this is products",data)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {auth?.user?.role===1 ? products?.map((p) => (
              <Link
                key={p?._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{width:'500px'}}>
                  <div  style={{ height: "110px", width:"100px" }} >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={'100%'}
                    style={{objectFit:'contain'}}
                  />
                  </div>
                  {console.log(p?._id)}
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text des">{p.description}</p>
                    <p>Added By = {p?.createdBy?.name}</p>
                    {/* <p>Added By: {p.createdBy.name}</p> */}
                  </div>
                </div>
              </Link>
            )):(products?.map((p) => (
              p.createdBy._id===auth.user._id &&
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{objectFit:'contain'}}
                  />
                  {console.log(p?._id)}
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p  className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            )))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

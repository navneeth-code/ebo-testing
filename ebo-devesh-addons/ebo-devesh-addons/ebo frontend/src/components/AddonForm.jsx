import React, { useState } from "react";
import '../App.css';
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const AddonForm = () => {
  const { initialState: { user } } = useContext(AuthContext);
  const cloud = REACT_APP_CLOUDINARY_CLOUD;
  const API_KEY = REACT_APP_CLOUDINARY_API_KEY;
  const API_URL = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;

  const [data, setData] = useState({
    productName: '',
    productImage: '',
    price: '',
    discount: '',
    productCategory: ''
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", data.productImage);
    formData.append("upload_preset", "ebo_project");
    formData.append("api_key", API_KEY);
    formData.append("cloud_name", cloud);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    try {
      const response = await axios.post(API_URL, formData);
      if(!response) return;
      setData({...data, productImage:  response.data.secure_url})
      await sendToBackend(data);
    } catch (error) {
      console.log(error.message)  
    }
  }

  const sendToBackend = async (data)=>{
    try {
      const addon = await axios.post("http://localhost:5000/api/addons", data, {
        headers: { "authorization": "Bearer "+ user.token }
      });
      console.log(addon);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="formDiv">
      <form className="form" onSubmit={handleSubmit}>
        <label> Addon Name </label>
        <input type="text" placeholder="Enter product name" onChange={(e)=>setData({...data, productName: e.target.value})}/>
        <label> Category </label>
        <input type="text" placeholder="Enter category" onChange={(e)=>setData({...data, productCategory: e.target.value})}/>
        <label> Price </label>
        <input type="text" placeholder="Enter price" onChange={(e)=>setData({...data, price: e.target.value})}/>
        <label> Discount </label>
        <input type="text" placeholder="Enter discount" onChange={(e)=>setData({...data, discount: e.target.value})}/>     
        <label> Product Image </label>
        <input className="img-selected" type="file" placeholder="Upload product image" onChange={(e)=>setData({...data, productImage: e.target.files[0]})}/>
        <button type="Submit" className="Submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddonForm;

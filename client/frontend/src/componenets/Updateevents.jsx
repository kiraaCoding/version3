/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Updateevents() {
  const [event,SetEvent] =useState({
    titreEv:"",
    descEv:"",
    datedebEv:"",
    datefinEv:"",
    coverEv:"",
    catEv:"",
  });
  const navigate =useNavigate();
  const location =useLocation();
  const eventID= location.pathname.split("/")[2];
  console.log(location.pathname.split("/")[2]);
  const handleClick= async(e) =>{
    e.preventDefault();
    try{
       await axios.put("http://localhost:8800/events/"+eventID,event);
      navigate("/Events");
    }catch(err){
      console.log(err);
    }

  }
  const handlechange =(e) =>{
    SetEvent((prev) => ({...prev,[e.target.name]:e.target.value}));
  };
  console.log(event);
  return (
    
      
      <div className="flex flex-col items-center gap-4">
        <h1>Update an event </h1>
        <input type="text" placeholder='title' onChange={handlechange} name="titreEv"/>
        <input type="text" placeholder='descreption' onChange={handlechange} name="descEv" />
        <input type="text" placeholder='begin Date'onChange={handlechange} name="datedebEv"/>
        <input type="text" placeholder='end Date' onChange={handlechange} name="datefinEv"/>
        <input type="text" placeholder='coverImage' onChange={handlechange} name="coverEv"/>
        <input type="text" placeholder='cat event' onChange={handlechange} name="catEv"/>
        <button className="rounded-full text-whitegray bg-beige px-4 py-1 " onClick={handleClick}>Update</button>
      </div>
         
      
  )
}
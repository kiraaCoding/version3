import  { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
const UpdateFormation =()=>{
    const[formation,setformation]=useState({
        imgform:"",
        datedebform:"",
        datefinform:"",
        typeform:"",
        localform:"",

    })
    const navigate=useNavigate()
    const location =useLocation()
    
    const numForm= location.pathname.split("/")[2]
    console.log(location.pathname.split("/")[2])
    

    const handleChange=(e)=>{
        setformation(prev=>({...prev,[e.target.name]:e.target.value}))

    }
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8800/formation/${numForm}`, formation);
            navigate("/")
        }catch(err){
            console.log(err)
        }
        
    } 
    console.log(formation)
    return(
        <div>
            <h1>Update the formation</h1>
            <input type="text" placeholder="imgform" onChange={handleChange} name="imgform"/>
            <input type="text" placeholder="datedebform" onChange={handleChange} name="datedebform"/>
            <input type="text" placeholder="datefinform" onChange={handleChange} name="datefinform"/>
            <input type="text" placeholder="typeform" onChange={handleChange} name="typeform"/>
            <input type="text" placeholder="localform" onChange={handleChange} name="localform"/>
            <button onClick={handleClick} >Update</button>
            
            
            
            </div>

    )
}
export default UpdateFormation;
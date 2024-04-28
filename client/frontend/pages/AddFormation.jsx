import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const AddFormation =()=>{
    const[formation,setformation]=useState({
        imgform:"",
        datedebform:"",
        datefinform:"",
        typeform:"",
        localform:"",
        userId:"",
    })
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setformation(prev=>({...prev,[e.target.name]:e.target.value}))

    }
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/Formations",formation)
            navigate("/formation")
        }catch(err){
            console.log(err)
        }
        
    } 
    console.log(formation)
    return(
        <div>
            <h1>Add new Formation</h1>
            <input type="text" placeholder="imgform" onChange={handleChange} name="imgform"/>
            <input type="text" placeholder="datedebform" onChange={handleChange} name="datedebform"/>
            <input type="text" placeholder="datefinform" onChange={handleChange} name="datefinform"/>
            <input type="text" placeholder="typeform" onChange={handleChange} name="typeform"/>
            <input type="text" placeholder="localform" onChange={handleChange} name="localform"/>
            <input type="text" placeholder="userId" onChange={handleChange} name="userId"/>
            <button onClick={handleClick} >Add</button>
            
            
            
            </div>

    )
}
export default AddFormation
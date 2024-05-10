import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateStage = () => {
    const [stage, setStage] = useState({
        datedebS: "",
        datefinS:"",
        themeS:"",

    });

    const navigate = useNavigate();
    const location = useLocation();

    const numS = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchStage = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/stages/${numS}`);
                setStage(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStage();
    }, [numS]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStage(prev => ({ ...prev, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/stages/${numS}`, stage);
            navigate("/stage");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Update the internship</h1>

            <input type="text" placeholder="Date Debut" onChange={handleChange} name="datedebS" />
            <input type="text" placeholder="Date Fin" onChange={handleChange} name="datefinS" />
            <input type="text" placeholder="Theme" onChange={handleChange} name="themeS" />
            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateStage;

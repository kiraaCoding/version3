import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdateAnnounce = () => {
    const [announce, setAnnounce] = useState({
        descriptionA: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const numA = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchAnnounce = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/announces/${numA}`);
                setAnnounce(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAnnounce();
    }, [numA]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnounce(prev => ({ ...prev, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/announces/${numA}`, announce);
            navigate("/announce");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Update the announcement</h1>

            <input type="text" placeholder="Description" onChange={handleChange} name="descriptionA" value={announce.descriptionA} />

            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateAnnounce;

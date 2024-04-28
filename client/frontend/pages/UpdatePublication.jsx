import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const UpdatePublication = () => {
    const [publication, setPublication] = useState({
        typeP: "",
        descriptionP: "",
        img: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/publications/${id}`);
                setPublication(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPublication();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublication(prev => ({ ...prev, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/publications/${id}`, publication);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Update the Publication</h1>
            <input type="text" placeholder="Type" onChange={handleChange} name="typeP" value={publication.typeP} />
            <input type="text" placeholder="Description" onChange={handleChange} name="descriptionP" value={publication.descriptionP} />
            <input type="text" placeholder="Image URL" onChange={handleChange} name="img" value={publication.img} />
            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdatePublication;

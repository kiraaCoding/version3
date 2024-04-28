import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddPublication = () => {
    const [publication, setPublication] = useState({
        dateP: new Date().toISOString().slice(0, 19).replace('T', ' '),
        typeP: "",
        descriptionP: "",
        img: "",
        userId: "",
        idens:"", 
    });

    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPublication(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Envoi de la publication à la base de données
            await axios.post("http://localhost:8800/publications", publication);
            // Redirection vers la page d'accueil après l'ajout réussi
            navigate("/publication");
        } catch (err) {
            // Gestion des erreurs
            setError("Failed to add publication. Please try again.");
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Add new Publication</h1>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Type" onChange={handleChange} name="typeP" />
            <input type="text" placeholder="Description" onChange={handleChange} name="descriptionP" />
            <input type="text" placeholder="Image URL" onChange={handleChange} name="img" />
            <input type="text" placeholder="UserId" onChange={handleChange} name="userId" />
            <input type="text" placeholder="Idens" onChange={handleChange} name="idens" />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddPublication;

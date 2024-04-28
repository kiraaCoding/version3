import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddAnnounce = () => {
    const [announce, setAnnounce] = useState({
        descriptionA: "",
        dateA: new Date().toISOString().slice(0, 19).replace('T', ' '), // Date automatique
        admin: "", 
        ens: "",
    });

    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAnnounce(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Envoi de la annonce à la base de données
            await axios.post("http://localhost:8800/announces", announce);
            // Redirection vers la page d'accueil après l'ajout réussi
            navigate("/announce");
        } catch (err) {
            // Gestion des erreurs
            setError("Failed to add announce. Please try again.");
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Add new Announcement</h1>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Description" onChange={handleChange} name="descriptionA" />
            <input type="text" placeholder="admin" onChange={handleChange} name="admin" />
            <input type="text" placeholder="ens" onChange={handleChange} name="ens" />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddAnnounce;

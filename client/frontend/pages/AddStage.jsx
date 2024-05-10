import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddStage = () => {
    const [stage, setStage] = useState({
        datedebS: "",
        datefinS:"", 
        themeS: "",
        userId: "",
    });

    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStage(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Envoi de la annonce à la base de données
            await axios.post("http://localhost:8800/stages", stage);
            // Redirection vers la page d'accueil après l'ajout réussi
            navigate("/stage");
        } catch (err) {
            // Gestion des erreurs
            setError("Failed to add stage. Please try again.");
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Add new internship</h1>
            {error && <p>{error}</p>}
            <input type="text" placeholder="Date Debut" onChange={handleChange} name="datedebS" />
            <input type="text" placeholder="Date Fin" onChange={handleChange} name="datefinS" />
            <input type="text" placeholder="Theme" onChange={handleChange} name="themeS" />
            <input type="text" placeholder="UserId" onChange={handleChange} name="userId" />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddStage;

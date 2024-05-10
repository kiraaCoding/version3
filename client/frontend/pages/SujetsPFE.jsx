import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SujetPFECard = ({ sujet_pfe, handleDelete }) => {
  return (
    <div className="bg-white text-left mt-auto rounded-lg shadow-md p-4 mb-6 relative overflow-hidden justify-center" style={{ width: "420px" }}>
      <div className="mb-4">
        <p><span className="font-bold text-gray-800">Nom de enseignant :</span> {sujet_pfe.encadrantInterne ? sujet_pfe.nomEnseignantInterne : sujet_pfe.nomEnseignantExterne}</p>
        <p><span className="font-bold text-gray-800">Type :</span> {sujet_pfe.encadrantInterne ? 'Interne' : 'Externe'}</p>
        {sujet_pfe.nomEmploye && sujet_pfe.entrepriseNom && (
          <>
            <p><span className="font-bold text-gray-800">Nom de employé :</span> {sujet_pfe.nomEmploye}</p>
            <p><span className="font-bold text-gray-800">Entreprise :</span> {sujet_pfe.entrepriseNom}</p>
            <p><span className="font-bold text-gray-800">Rôle de employé :</span> {sujet_pfe.roleEmploye}</p>
          </>
        )}
        <p><span className="font-bold text-gray-800">Rôle de enseignant :</span> {sujet_pfe.encadrantInterne ? sujet_pfe.roleEnseignantInterne : sujet_pfe.roleEnseignantExterne}</p>
        <p><span className="font-bold text-gray-800">Intitulé :</span> {sujet_pfe.intitulesujet}</p>
        <p><span className="font-bold text-gray-800">Résumé :</span> {sujet_pfe.resumesujet}</p>
        <p><span className="font-bold text-gray-800">Mots clés :</span> {sujet_pfe.motscle}</p>
        <p><span className="font-bold text-gray-800">Domaine :</span> {sujet_pfe.domainesujet}</p>
        <p><span className="font-bold text-gray-800">Année :</span> {sujet_pfe.datePFE}</p>
        <p><span className="font-bold text-gray-800">Etat :</span> {sujet_pfe.etat}</p>
      </div>
      <div className="flex justify-between mt-2">
        <button className="bg-beige hover:bg-red-600 text-white py-1 px-4 rounded-full mr-2" onClick={() => handleDelete(sujet_pfe.numsujet)}>Delete</button>
        <Link to={`/updatesujetpfe/${sujet_pfe.numsujet}`} className="bg-beige hover:bg-blue-600 text-white py-1 px-4 rounded-full">Update</Link>
      </div>

    </div>
  );
};

const SujetsPFE = () => {
  const [sujetpfes, setSujetpfes] = useState([]);

  useEffect(() => {
    const fetchSujetpfes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/sujetpfes");
        if (res.data && Array.isArray(res.data)) {
          setSujetpfes(res.data);
        } else {
          console.error("Les données ne sont pas au format attendu :", res.data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
      }
    };
    fetchSujetpfes();
  }, []);

  const handleDelete = async (numSujet) => {
    try {
      await axios.delete(`http://localhost:8800/sujetpfes/${numSujet}`);
      setSujetpfes(sujetpfes.filter((sujet) => sujet.numsujet !== numSujet));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="container mx-auto mt-auto  mb-36 flex flex-col items-center justify-center">
      <div className="text-center mt-6 mb-8 w-full bg-white z-10">
        <button className="bg-beige rounded-full py-1 px-4 text-white mb-8">
          <Link to="/addsujetpfe">Ajouter un nouveau sujet</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-12 mt-14">
        {sujetpfes.map((sujet_pfe) => (
          <SujetPFECard key={sujet_pfe.numsujet} sujet_pfe={sujet_pfe} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default SujetsPFE;

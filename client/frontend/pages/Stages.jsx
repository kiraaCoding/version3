import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Stages = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/stages");
        if (res.data && Array.isArray(res.data)) {
          setStages(res.data);
        } else {
          console.error("Les données des stages ne sont pas au format attendu :", res.data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des stages :", err);
      }
    };
    fetchStages();
  }, []);

  const handleDelete = async (numS) => {
    try {
      await axios.delete(`http://localhost:8800/stages/${numS}`);
      setStages(stages.filter(stage => stage.numS !== numS));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto mb-36 flex flex-col items-center justify-center p-4">
      <div className="text-center mt-6 mb-8 w-full bg-white z-10 fixed top-0">
        <button className="bg-beige rounded-full py-1 px-4 text-white mb-8">
          <Link to="/addstage">Add new internship</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 relative" key={stage.numS} style={{ width: "420px", height: "180px" }}>
            <div className="absolute top-0 right-0 mt-0 mr-4">
            </div>
            <div className="mb-2">
              <p className="text-gray-400 mt-2 text-lg font-semibold">Offert par : {stage.designationEntr}</p>
              <p className="text-gray-600">{stage.datedebS}</p>
              <p className="text-gray-600">{stage.datefinS}</p>
              <p className="text-gray-600">{stage.themeS}</p>
            </div>
            <div className="flex justify-between">
              <button className="bg-beige rounded-full py-1 px-4 text-white" onClick={() => handleDelete(stage.numS)}>Delete</button>
              <button className="bg-beige rounded-full py-1 px-4 text-white"><Link to={`/updatestage/${stage.numS}`}>Update</Link></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stages;

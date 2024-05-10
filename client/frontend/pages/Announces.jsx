import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// import "../App.css";



const Announces = () => {
  const [announces, setAnnounces] = useState([]);

  const [selectedAnnounce, setSelectedAnnounce] = useState(null);
  
  useEffect(() => {
    const fetchAnnounces = async () => {
      try {
        const res = await axios.get("http://localhost:8800/announces");
        setAnnounces(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnnounces();
  }, []);

  const handleDelete = async (numA) => {
    try {
      await axios.delete(`http://localhost:8800/announces/${numA}`);
      setAnnounces(announces.filter(announce => announce.numA !== numA));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateClick = (numA) => {
    window.location.href = `/updateannounce/${numA}`;
  };



  return (
    // style={{ maxHeight: "95vh", overflowY: "scroll", position: "fixed", paddingRight: "15px" }}
    <div className="container mx-auto mt-40 mb-36 flex flex-col items-center"  >

      <div className="text-center mt-6 mb-8 w-full bg-white z-10 fixed top-0">
        <button className="bg-beige rounded-full py-1 px-4 text-white mb-8">
        <Link to="/addannounce">Add new announcement</Link>
        </button>
      </div>
      <div className="pl-12 mt-14">
        {announces.map((announce) => (
          <div className="w-full max-w-md mb-8 relative" key={announce.numA}>
            <div className="card__article w-full bg-white rounded-lg shadow-md p-4 relative">
              <div className="absolute top-0 right-0 mt-0 mr-4">
                <div className="dots text-2xl font-bold" onClick={() => setSelectedAnnounce(announce)}style={{ cursor: 'pointer' }}>...</div>
                {selectedAnnounce === announce && (
                  <div className="dropdown-content bg-beige3  rounded-sm right-0 absolute top-0 mt-8" style={{ right: "0px" }}>
                    <p onClick={() => handleDelete(announce.numA)}style={{ cursor: 'pointer' }}>Delete</p>
                    <p onClick={() => handleUpdateClick(announce.numA)}style={{ cursor: 'pointer' }}>Update</p>
                    <p onClick={() => setSelectedAnnounce(null)}style={{ cursor: 'pointer' }}>Annuler</p>
                  </div>

                )}
              </div>
              <div>
                <p className="text-gray-400 mt-2 text-lg font-semibold">Publié par: {announce.nomUt}</p>
                <p className="text-gray-600">{announce.dateA}</p>    
                <p className="text-gray-600" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{announce.descriptionA}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announces;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Formations = () => {
    const [formations, setFormations] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const fetchAllFormations = async () => {
            try {
                const res = await axios.get("http://localhost:8800/Formations");
                setFormations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllFormations();
    }, []);

    const handleDelete = async (numform) => {
        try {
            await axios.delete(`http://localhost:8800/formation/${numform}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-auto mx-auto ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {formations.map((formation) => (
                    <div
                        className="card__article relative bg-white rounded-lg shadow-md object-cover overflow-hidden"
                        key={formation.numform}
                        onMouseEnter={() => setHoveredCard(formation.numform)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <img src={formation.imgform} alt="Formation" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <p className="text-sm text-black mb-1">{formation.datedebform} - {formation.datefinform}</p>
                            <p className="text-sm text-black mb-1">{formation.typeform}</p>
                            <p className="text-sm text-black mb-1">
                                <a
                                    href={formation.localform}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-bleu-nuit hover:underline">
                                    {formation.localform}
                                </a>
                            </p>
                            <div className="flex justify-between mt-2">
                                    <button className="bg-beige hover:bg-red-600 text-white py-1 px-4 rounded-full mr-2" onClick={() => handleDelete(formation.numform)}>Delete</button>
                                    <Link to={`/updateformation/${formation.numform}`} className="bg-beige hover:bg-blue-600 text-white py-1 px-4 rounded-full">Update</Link>
                                </div>
                        </div>
                        {hoveredCard === formation.numform && (
                            <div className="hover-card absolute top-0 left-0 right-0 bottom-0 bg-white p-4 text-black rounded-lg opacity-90 transition-opacity duration-300">
                                <p className="text-sm mb-1"><span className="font-bold">Date de début:</span> {formation.datedebform}</p>
                                <p className="text-sm mb-1"><span className="font-bold">Date de fin:</span> {formation.datefinform}</p>
                                <p className="text-sm mb-1"><span className="font-bold">Type de formation:</span> {formation.typeform}</p>
                                <p className="text-sm mb-1"><span className="font-bold">Localisation:</span> <a href={formation.localform} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{formation.localform}</a></p>

                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                <button className="bg-beige rounded-full py-1 px-4 text-white">
                    <Link to="/addformation">Add new workshop</Link>
                </button>
            </div>
        </div>
    );
};

export default Formations;

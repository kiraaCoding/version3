import React, { useState } from 'react';

const Workshop = ({ formation }) => {
    const [hoveredCard, setHoveredCard] = useState(false);

    return (
        <div className="container mx-auto mt-10 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                <div
                    className="card__article relative h-70 w-80 overflow-hidden bg-white rounded-lg shadow-md p-4 mt-3/1.5 mb-2/1.5"
                    key={formation.numform}
                    onMouseEnter={() => setHoveredCard(formation.numform)}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <div className="h-48 bg-white flex justify-center items-center" style={{ backgroundImage: `url(${formation.imgform})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <img src={formation.imgform} alt="Formation" className="hidden" />
                    </div>
                    <div className="absolute top-0 left-0 right-0 bg-white py-1 px-1 opacity-0 transition-opacity duration-300">
                        <div className="h-48 bg-white">
                            <img src={formation.imgform} alt="Formation" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-sm text-black mb-1">{formation.datedebform}</p>
                        <p className="text-sm text-black mb-1">{formation.datefinform}</p>
                        <p className="text-sm text-black mb-1">{formation.typform}</p>
                        <p className="text-sm text-black mb-1">
                            <a
                                href={formation.localform}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-bleu-nuit hover:underline">
                                localform
                            </a>
                        </p>
                    </div>
                    {hoveredCard && (
                        <div className="hover-card absolute top-0 left-1/2 -translate-x-1/2 bg-beige py-1 px-1 text-black rounded-lg w-2/3 h-2/2.5">
                            <p className="text-sm mb-1"><span className="font-bold">Date de début:</span> {formation.datedebform}</p>
                            <p className="text-sm mb-1"><span className="font-bold">Date de fin:</span> {formation.datefinform}</p>
                            <p className="text-sm mb-1"><span className="font-bold">Type de formation:</span> {formation.typeform}</p>
                            <p className="text-sm mb-1"><span className="font-bold">Localisation:</span> <a href={formation.localform} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{formation.localform}</a></p>
                        </div>
                    )}
                    
                </div>
            </div>
            
        </div>
    );

};

export default Workshop;
                 
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { CiHeart } from "react-icons/ci";

import "../src/App.css";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [likes, setLikes] = useState(0); // Ajoutez un état pour les likes

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await axios.get("http://localhost:8800/publications");
        console.log(res.data);

        if (Array.isArray(res.data)) {
          setPublications(res.data);
        }
        else{console.log("not array")}
      } catch (err) {
        console.log(err);
      }
    };
    fetchPublications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/publications/${id}`);
      setPublications(publications.filter(publication => publication.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateClick = (id) => {
    window.location.href = `/updatepublication/${id}`;
  };

  const handleLike = () => {
    // Logique pour gérer le like
    console.log("Like clicked");
  };

  return (
    //  style={{ maxHeight: "95vh", overflowY: "scroll", position: "fixed", paddingRight: "15px" }}
    <div className="container  mx-auto mt-auto  flex flex-col items-center" >
      <div className="text-center mt-6  mb-8 w-full bg-white z-10 fixed top-0">
        <button className="bg-beige rounded-full py-1 px-4 text-white mb-8">
          <Link to="/addpublication">Add new post</Link>
        </button>
      </div>
      <div className="pl-12 mt-14">
      {Array.isArray(publications) && publications.map((publication) => (
          <div className="w-full max-w-md mb-8 relative" key={publication.id}>
            <div className="card__article w-full bg-white rounded-lg shadow-md p-4 relative">
              <div className="absolute top-0 right-0 mt-0 mr-4">
                <div className="dots text-2xl font-bold" onClick={() => setSelectedPublication(publication)} style={{ cursor: 'pointer' }}>...</div>
                {selectedPublication === publication && (
                  <div className="dropdown-content bg-white rounded-sm right-0 absolute top-0 mt-8" style={{ right: "0px" }}>
                    <p onClick={() => handleDelete(publication.id)} style={{ cursor: 'pointer' }}>Delete</p>
                    <p onClick={() => handleUpdateClick(publication.id)} style={{ cursor: 'pointer' }}>Update</p>
                    <p onClick={() => setSelectedPublication(null)} style={{ cursor: 'pointer' }}>Annuler</p>
                  </div>
                )}
              </div>
              <div className='text-left'>
                <p className="text-gray-400 mt-2 text-lg font-semibold">Publié par: {publication.nomUt}</p>
                <p className="text-gray-600">{publication.dateP}</p>
                <div className="h-48 mt-8 bg-white flex justify-items-center">
                  <img src={publication.img} alt="Publication" className="w-full h-full object-cover" />
                </div>
                <div className="item " onClick={handleLike}>
                    {likes > publication.likes ? (<CiHeart className='text-right' style={{ color: "beige" }} />) : (<CiHeart />)}{publication.likes} Likes
                </div>
                <h2 className="text-lg font-semibold">Type: {publication.typeP}</h2>
                <p className="text-gray-600" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{publication.descriptionP}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
import  { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Post = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await axios.get("http://localhost:8800/publications");
        // Sort publications by date in descending order and take the first two
        const sortedPublications = res.data.sort((a, b) => new Date(b.dateP) - new Date(a.dateP)).slice(0, 2);
        setPublications(sortedPublications);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPublications();
  }, []);

  const handleLike = (id) => {
    // Logic to handle like
    console.log(`Like clicked for publication ${id}`);
  };

  return (
    <div className="container mx-auto mt-8">
      {publications.map((publication) => (
        <div className="w-full max-w-md mb-8 relative" key={publication.id}>
          <div className="card__article w-full bg-white rounded-lg shadow-md p-4 relative">
            <div>
              <p className="text-gray-400 mt-2 text-lg font-semibold">Publié par: {publication.nomUt}</p>
              <p className="text-gray-600">{publication.dateP}</p>
              <div className="h-48 mt-8 bg-white flex justify-items-center">
                <img src={publication.img} alt="Publication" className="w-full h-full object-cover" />
              </div>
              <div className="item" onClick={() => handleLike(publication.id)}>
                {publication.likes > 0 ? (<FavoriteOutlinedIcon style={{ color: "beige" }} />) : (<FavoriteBorderOutlinedIcon />)}{publication.likes} Likes
              </div>
              <h2 className="text-lg font-semibold">Type: {publication.typeP}</h2>
              <p className="text-gray-600" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{publication.descriptionP}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;

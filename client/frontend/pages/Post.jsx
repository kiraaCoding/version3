import { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Post = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await axios.get("http://localhost:8800/publications");
        // Extract the three most recent publications from the returned array
        const firstThreePublications = res.data.slice(0, 3);
        setPublications(firstThreePublications);
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
    <div className="container mt-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {publications.map((publication) => (
          <div className="max-w-md" key={publication.id}>
            <div className="card__article bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-400 mt-2 text-lg font-semibold">Publié par: {publication.nomUt}</p>
              <p className="text-gray-600">{publication.dateP}</p>
              <div className="h-48 mt-4 bg-white">
                <img src={publication.img} alt="Publication" className="w-full h-full object-cover" />
              </div>
              <div className="item mt-4" onClick={() => handleLike(publication.id)}>
                {publication.likes > 0 ? (<FavoriteOutlinedIcon style={{ color: "beige" }} />) : (<FavoriteBorderOutlinedIcon />)}{publication.likes} Likes
              </div>
              <h2 className="text-lg font-semibold mt-2">Type: {publication.typeP}</h2>
              <p className="text-gray-600 mt-2" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{publication.descriptionP}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;

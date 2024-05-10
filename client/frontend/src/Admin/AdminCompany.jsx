import { IoSearch } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
// import { Context } from "../context/Context";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";


export default function AdminCompany() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log(!isOpen);
  };



  // const [companyData, setcompanyData] = useState([]);
  // const [selectedProfile, setSelectedProfile] = useState('company');
  // const { user } = useContext(Context);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token && user.userId) {
  //     axios.get(`http://localhost:8800/etudiants/${user.userId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       // Update companyData state with fetched user information
  //       setcompanyData([response.data]);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user information:', error);
  //     });
  //   }
  // }, [user.userId]);

  const [companyData, setcompanyData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('company');
  const [editMode, setEditMode] = useState(false);
  const {search} =useLocation();
  // const { user } = useContext(Context);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token && user.userId) {
  //     axios.get(`http://localhost:8800/etudiants/${user.userId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       // Récupérer l'ID de l'utilisateur
  //       const numEt = response.data.numUt;
  
  //       // Utiliser l'ID de l'utilisateur pour récupérer les détails de l'étudiant
  //       axios.get(`http://localhost:8800/etudiants/${numEt}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       })
  //       .then(companyResponse => {
  //         // Mise à jour des données de l'étudiant avec les informations récupérées
  //         setcompanyData([companyResponse.data]);
  //         console.log(companyResponse.data);
  //       })
  //       .catch(companyError => {
  //         console.error('Erreur lors de la récupération des informations sur l\'étudiant :', companyError);
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des informations sur l\'utilisateur :', error);
  //     });
  //   }
  // }, [user.userId]);
  
  useEffect(() => {
    const fetchcompanyData = async () => {
        try {
            const res = await axios.get("http://localhost:8800/entreprises"+search);
            setcompanyData(res.data);
            console.log(res.data)
            // console.log(companyData[0].user.userId);
          } catch (err) {
            console.log(err);
        }
    };
    fetchcompanyData();
}, [search]); 

  // const fetchcompanyData = () => {
  //   fetch(`http://localhost:8800/etudiants/${user.userId}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setcompanyData(data);
  //     })
  //     .catch(error => console.error('Error fetching company data:', error));
  // };
  const handleUpdateClick = () => {
    // Activer le mode édition lors du clic sur le bouton "Update"
    setEditMode(true);
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/entreprises/${userId}`);
      // Mettre à jour l'état companyData après la suppression en filtrant les étudiants supprimés
      setcompanyData(companyData.filter(company => company.user.userId !== userId));
      console.log(`Étudiant avec l'ID ${userId} supprimé avec succès.`);
      window.location.reload()
      
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="mt-auto ml-24 flex flex-col  w-full lg:max-w-full justify-center bg-white p-0">
      <div className="pr-16 w-full right-0 z-10  bg-grey max-md:pr-5 max-md:max-w-full">
        <div className="flex w-full gap-5 max-md:flex-col max-md:gap-0">

        {/* <FaBars isOpen={isOpen}  className="menu-icon ml-96  absolute z-10 mt-6 h-6 w-6 mr-32" onClick={toggleSidebar} /> */}

          <Sidebar className="w-[20%]"  isOpen={isOpen} /> 
                   
          <div className="flex  flex-col flex-grow w-full max-md:ml-0 max-md:w-full mr-0 z-10 right-0" style={{paddingRight: '0px'}}>
            <div className="flex flex-col grow mt-6 max-md:mt-10 max-md:max-w-full">
              <div className="flex justify-center gap-5 items-center text-base font-semibold text-neutral-400 max-md:flex-wrap">
                <div className="flex flex-auto gap-3 items-center px-4 py-4 bg-beige bg-opacity-30 rounded-full max-md:flex-wrap max-md:px-5">
                <FaBars isOpen={isOpen}  className="menu-icon ml-[90%]  absolute z-10 mt-6 h-6 w-6 mr-32" onClick={toggleSidebar} />
                  <IoSearch className="w-6 h-6 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search here"
                    className="flex-auto text-center bg-beige bg-opacity-0 focus:outline-none placeholder-gray-500"
                  />
                </div>
                <div className="w-px h-14 rounded-lg" />
              </div>
              <Sidebar isOpen={isOpen} /> 


              <div className="self-center mt-14 text-4xl font-bold text-center text-primary max-md:mt-10 max-md:text-4xl">
                Users
              </div>

              <div className="flex justify-center items-center px-16 py-6 mt-12 font-semibold whitespace-nowrap bg-white rounded-[34px] text-neutral-400 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col sm:flex-row justify-around mb-4 sm:mb-10" >
                  <button
                    onClick={() => setSelectedProfile('student')}
                    className={`profileButton ${selectedProfile === 'student' ? 'selectedProfile' : ''}`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProfile('teacher');
                      window.location.href = "/AdminTeachers";
                  }}
                    className={`profileButton ${selectedProfile === 'teacher' ? 'selectedProfile' : ''}`}
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProfile('club');
                      window.location.href = "/AdminClubs";
                                    }}
                    className={`profileButton ${selectedProfile === 'club' ? 'selectedProfile' : ''}`}
                  >
                    Club
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProfile('company');
                      window.location.href = "/AdminCompany";
                                    }}
                    className={`profileButton ${selectedProfile === 'company' ? 'selectedProfile' : ''}`}
                  >
                    Company
                  </button>
                </div>
              </div>

      {companyData.map((company, index) => (
        <div key={index} className="flex mb-auto flex-col py-20 pr-20 pl-10 mt-24 bg-white rounded-[34px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="text-2xl">User Infos</div>
          <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
            {editMode ? (
        <UpdateForm company={company} />
           ) : (
        <>
          <div className="flex flex-col flex-grow">
            <label htmlFor="username" className="text-base font-medium text-primary">Username</label>
            <input type="text" id="username" className="input-field" value={company.user.username} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="email" className="text-base font-medium text-primary">Email</label>
            <input type="email" id="email" className="input-field" value={company.user.email} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="password" className="text-base font-medium text-primary">Password</label>
            <input type="password" id="password" className="input-field" value={company.user.password} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="designation" className="text-base font-medium text-primary">Designation</label>
            <input type="text" id="designation" className="input-field" value={company.entreprise.designation} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="domaine" className="text-base font-medium text-primary">Domaine</label>
            <input type="text" id="domaine" className="input-field" value={company.entreprise.domaine} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="siegesocial" className="text-base font-medium text-blue-950">Localisation</label>
            <input type="text" id="siegesocial" className="input-field" value={company.entreprise.siegesocial} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="telephone" className="text-base font-medium text-primary">Phone number</label>
            <input type="phone" id="telephone" className="input-field" value={company.entreprise.telephone} readOnly />
          </div>
        </>
      )}
    </div>
                  <div className="flex justify-center mt-4 gap-5">
                    {!editMode && (      
                    <button onClick={handleUpdateClick} className="mt-4 px-4 py-2 bg-beige rounded-lg shadow-md hover:bg-blue-600">
                      Update
                    </button>
                  )}
                  {!editMode && (
                    <button onClick={() => handleDelete(company.user.userId)} className="mt-4 px-4 py-2 bg-beige rounded-lg shadow-md hover:bg-blue-600">
                      Delete
                    </button>
                  )}
                  </div>
  </div>
                 
))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Composant de formulaire de mise à jour
const UpdateForm = ({ company }) => {
  // Définissez l'état pour les valeurs mises à jour du formulaire
  const [updatedValues, setUpdatedValues] = useState({
    userid : company.user.userId,
    username: company.user.username,
    email: company.user.email,
    password: company.user.password,
    designation: company.entreprise.designation,
    domaine: company.entreprise.domaine,
    siegesocial: company.entreprise.siegesocial,
    telephone: company.entreprise.telephone,
    // Ajoutez d'autres champs ici selon vos besoins
  });

  // Fonction de gestion de la soumission du formulaire de mise à jour
// Fonction de gestion de la soumission du formulaire de mise à jour
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    // Assurez-vous que company et updatedValues sont définis avant de les passer à updateData
    if (company && updatedValues) {
      // Supposons que company contient l'objet étudiant à mettre à jour et que company._id est l'ID de l'étudiant
      await updateData(company.user.userId, updatedValues);
      window.location.reload()
      // Mettre à jour l'état ou afficher un message de succès à l'utilisateur
    } else {
      console.error("Les données de l'étudiant ne sont pas définies");
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données :', error);
    // Affichez un message d'erreur à l'utilisateur si la mise à jour échoue
  }
};

const updateData = async (id, updatedData) => {
  try {
    console.log("Données mises à jour à envoyer au backend :", updatedData); // Vérifiez les données mises à jour
    const response = await axios.put(`http://localhost:8800/entreprises/${id}`,  { updatedData: updatedData });
    console.log("Réponse du backend :", response.data); // Affiche la réponse du backend dans la console
    // Vous pouvez également mettre à jour l'état de votre composant ou afficher un message de succès à l'utilisateur
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données :', error);
    // Affichez un message d'erreur à l'utilisateur si la mise à jour échoue
  }
};


  

  // Fonction de gestion du changement des champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedValues({
      ...updatedValues,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
        <div className="flex flex-col flex-grow">
          <label htmlFor="username" className="text-base font-medium text-primary">Username</label>
          <input type="text" id="username" name="username" className="input-field" value={updatedValues.username} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="email" className="text-base font-medium text-primary">Email</label>
          <input type="email" id="email" name="email" className="input-field" value={updatedValues.email} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="password" className="text-base font-medium text-primary">Password</label>
          <input type="password" id="password" name="password" className="input-field" value={updatedValues.password} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="designation" className="text-base font-medium text-primary">designation</label>
          <input type="text" id="designation" name="designation" className="input-field" value={updatedValues.designation} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="domaine" className="text-base font-medium text-primary">Domaine</label>
          <input type="text" id="domaine" name="domaine" className="input-field" value={updatedValues.domaine} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="siegesocial" className="text-base font-medium text-blue-950">Localisation</label>
          <input type="text" id="siegesocial" name="Cycle" className="input-field" value={updatedValues.siegesocial} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="telephone" className="text-base font-medium text-primary">Phone number</label>
          <input type="phone" id="telephone" name="telephone" className="input-field" value={updatedValues.telephone} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="mt-12 px-6 py-2 bg-beige rounded-lg shadow-md hover:bg-blue-600">
        Save
      </button>
    </form>
  );
};


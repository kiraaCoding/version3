import { IoSearch } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
// import { Context } from "../context/Context";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";


export default function AdminTeachers() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log(!isOpen);
  };



  // const [TeacherData, setTeacherData] = useState([]);
  // const [selectedProfile, setSelectedProfile] = useState('teacher');
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
  //       // Update TeacherData state with fetched user information
  //       setTeacherData([response.data]);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user information:', error);
  //     });
  //   }
  // }, [user.userId]);

  const [TeacherData, setTeacherData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('teacher');
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
  //       .then(teacherResponse => {
  //         // Mise à jour des données de l'étudiant avec les informations récupérées
  //         setTeacherData([teacherResponse.data]);
  //         console.log(teacherResponse.data);
  //       })
  //       .catch(teacherError => {
  //         console.error('Erreur lors de la récupération des informations sur l\'étudiant :', teacherError);
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la récupération des informations sur l\'utilisateur :', error);
  //     });
  //   }
  // }, [user.userId]);
  
  useEffect(() => {
    const fetchTeacherData = async () => {
        try {
            const res = await axios.get("http://localhost:8800/enseignants"+search);
            setTeacherData(res.data);
            console.log(res.data)
            // console.log(TeacherData[0].user.userId);
          } catch (err) {
            console.log(err);
        }
    };
    fetchTeacherData();
}, [search]); 

  // const fetchTeacherData = () => {
  //   fetch(`http://localhost:8800/etudiants/${user.userId}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setTeacherData(data);
  //     })
  //     .catch(error => console.error('Error fetching teacher data:', error));
  // };
  const handleUpdateClick = () => {
    // Activer le mode édition lors du clic sur le bouton "Update"
    setEditMode(true);
  };
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/enseignants/${userId}`);
      // Mettre à jour l'état TeacherData après la suppression en filtrant les étudiants supprimés
      setTeacherData(TeacherData.filter(teacher => teacher.user.userId !== userId));
      console.log(`enseignant avec l'ID ${userId} supprimé avec succès.`);
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
                    onClick={() => {
                      setSelectedProfile('student');
                      window.location.href = "/AdminStudent";
                  }} 
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

      {TeacherData.map((teacher, index) => (
        <div key={index} className="flex mb-auto flex-col py-20 pr-20 pl-10 mt-24 bg-white rounded-[34px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="text-2xl">User Infos</div>
          <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
            {editMode ? (
        <UpdateForm teacher={teacher} />
           ) : (
        <>
          <div className="flex flex-col flex-grow">
            <label htmlFor="username" className="text-base font-medium text-primary">Username</label>
            <input type="text" id="username" className="input-field" value={teacher.user.username} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="email" className="text-base font-medium text-primary">Email</label>
            <input type="email" id="email" className="input-field" value={teacher.user.email} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="password" className="text-base font-medium text-primary">Password</label>
            <input type="password" id="password" className="input-field" value={teacher.user.password} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="Department" className="text-base font-medium text-primary">Department</label>
            <input type="text" id="Department" className="input-field" value={teacher.teacher.department} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="Grade" className="text-base font-medium text-primary">Grade</label>
            <input type="Year" id="Grade" className="input-field" value={teacher.teacher.grade} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="OfficeNumber" className="text-base font-medium text-blue-950">OfficeNumber</label>
            <input type="text" id="OfficeNumber" className="input-field" value={teacher.teacher.officeNumber} readOnly />
          </div>
          <div className="flex flex-col flex-grow">
            <label htmlFor="scheduleLink" className="text-base font-medium text-primary">ScheduleLink</label>
            <input type="text" id="scheduleLink" className="input-field" value={teacher.teacher.scheduleLink} readOnly />
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
                    <button onClick={() => handleDelete(teacher.user.userId)} className="mt-4 px-4 py-2 bg-beige rounded-lg shadow-md hover:bg-blue-600">
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
const UpdateForm = ({ teacher }) => {
  // Définissez l'état pour les valeurs mises à jour du formulaire
  const [updatedValues, setUpdatedValues] = useState({
    userid : teacher.user.userId,
    username: teacher.user.username,
    email: teacher.user.email,
    password: teacher.user.password,
    department: teacher.teacher.department,
    grade: teacher.teacher.grade,
    officeNumber: teacher.teacher.officeNumber,
    scheduleLink: teacher.teacher.scheduleLink,
    // Ajoutez d'autres champs ici selon vos besoins
  });

  // Fonction de gestion de la soumission du formulaire de mise à jour
// Fonction de gestion de la soumission du formulaire de mise à jour
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    // Assurez-vous que teacher et updatedValues sont définis avant de les passer à updateData
    if (teacher && updatedValues) {
      // Supposons que teacher contient l'objet étudiant à mettre à jour et que teacher._id est l'ID de l'étudiant
      await updateData(teacher.user.userId, updatedValues);
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
    const response = await axios.put(`http://localhost:8800/enseignants/${id}`,  { updatedData: updatedData });
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
          <label htmlFor="department" className="text-base font-medium text-primary">Department</label>
          <input type="text" id="department" name="department" className="input-field" value={updatedValues.department} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="grade" className="text-base font-medium text-primary">Grade</label>
          <input type="Year" id="grade" name="grade" className="input-field" value={updatedValues.grade} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="officeNumber" className="text-base font-medium text-blue-950">OfficeNumber</label>
          <input type="text" id="officeNumber" name="officeNumber" className="input-field" value={updatedValues.officeNumber} onChange={handleChange} />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="scheduleLink" className="text-base font-medium text-primary">Matricule</label>
          <input type="text" id="scheduleLink" name="scheduleLink" className="input-field" value={updatedValues.scheduleLink} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="mt-12 px-6 py-2 bg-beige rounded-lg shadow-md hover:bg-blue-600">
        Save
      </button>
    </form>
  );
};


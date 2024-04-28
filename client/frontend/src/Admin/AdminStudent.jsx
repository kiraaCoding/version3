import { IoSearch } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import axios from "axios";

export default function AdminStudent() {
  // const [studentData, setStudentData] = useState([]);
  // const [selectedProfile, setSelectedProfile] = useState('student');
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
  //       // Update studentData state with fetched user information
  //       setStudentData([response.data]);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user information:', error);
  //     });
  //   }
  // }, [user.userId]);

  const [studentData, setStudentData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('student');
  const { user } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user.userId) {
      axios.get(`http://localhost:8800/etudiants/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // Récupérer l'ID de l'utilisateur
        const numEt = response.data.numUt;
  
        // Utiliser l'ID de l'utilisateur pour récupérer les détails de l'étudiant
        axios.get(`http://localhost:8800/etudiants/${numEt}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(studentResponse => {
          // Mise à jour des données de l'étudiant avec les informations récupérées
          setStudentData([studentResponse.data]);
          console.log(studentResponse.data);
        })
        .catch(studentError => {
          console.error('Erreur lors de la récupération des informations sur l\'étudiant :', studentError);
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations sur l\'utilisateur :', error);
      });
    }
  }, [user.userId]);
  
  

  // const fetchStudentData = () => {
  //   fetch(`http://localhost:8800/etudiants/${user.userId}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setStudentData(data);
  //     })
  //     .catch(error => console.error('Error fetching student data:', error));
  // };

  return (
    <div className="mt-auto flex flex-col w-full lg:max-w-full justify-center bg-white p-0">
      <div className="pr-16 w-full right-0 z-10 bg-grey max-md:pr-5 max-md:max-w-full">
        <div className="flex w-full gap-5 max-md:flex-col max-md:gap-0">
          <Sidebar />
          
          <div className="flex ml-96 flex-col flex-grow w-full max-md:ml-0 max-md:w-full mr-0 z-10 right-0" style={{paddingRight: '0px'}}>
            <div className="flex flex-col grow mt-6 max-md:mt-10 max-md:max-w-full">
              <div className="flex justify-center gap-5 items-center text-base font-semibold text-neutral-400 max-md:flex-wrap">
                <div className="flex flex-auto gap-3 items-center px-4 py-4 bg-beige bg-opacity-30 rounded-full max-md:flex-wrap max-md:px-5">
                  <IoSearch className="w-6 h-6 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search here"
                    className="flex-auto text-center bg-beige bg-opacity-0 focus:outline-none placeholder-gray-500"
                  />
                </div>
                <div className="w-px h-14 rounded-lg" />
              </div>

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
                    onClick={() => setSelectedProfile('teacher')}
                    className={`profileButton ${selectedProfile === 'teacher' ? 'selectedProfile' : ''}`}
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => setSelectedProfile('club')}
                    className={`profileButton ${selectedProfile === 'club' ? 'selectedProfile' : ''}`}
                  >
                    Club
                  </button>
                  <button
                    onClick={() => setSelectedProfile('company')}
                    className={`profileButton ${selectedProfile === 'company' ? 'selectedProfile' : ''}`}
                  >
                    Company
                  </button>
                </div>
              </div>

              {studentData.map(student => (
                <div key={student.numEt} className="flex mb-auto flex-col py-20 pr-20 pl-10 mt-24 bg-white rounded-[34px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <div className="text-2xl">User Infos</div>
                  <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="username" className="text-base font-medium text-bleu">Username</label>
                      <input type="text" id="username" className="input-field" value={student.nomUt} readOnly />
                      
                    </div>
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="email" className="text-base font-medium text-blue-950">Email</label>
                      <input type="email" id="email" className="input-field" value={student.emailUt} readOnly />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="password" className="text-base font-medium text-blue-950">Password</label>
                      <input type="password" id="password" className="input-field" value={student.passwordUt} readOnly />
                    </div>
                  </div>
                  <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="username" className="text-base font-medium text-bleu">Username</label>
                      <input type="text" id="username" className="input-field" value={student.specEt} readOnly />
                      
                    </div>
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="email" className="text-base font-medium text-blue-950">Email</label>
                      <input type="email" id="email" className="input-field" value={student.emailUt} readOnly />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <label htmlFor="password" className="text-base font-medium text-blue-950">Password</label>
                      <input type="password" id="password" className="input-field" value={student.passwordUt} readOnly />
                    </div>
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

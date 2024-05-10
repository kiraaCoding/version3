import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Register() {
    const [selectedProfile, setSelectedProfile] = useState('student');
    const [nomUt,SetUsername] = useState("");
    const [emailUt,SetEmail] = useState("");
    const [passwordUt,SetPassword] = useState("");
    const [specEt,SetSpeciality] = useState("");
    const [matricule,Setmatricule] = useState("");
    const [anneeEt,SetYear] = useState("");
    const [cycleEt,SetCycle] = useState("");
    const [showMoreFields, setShowMoreFields] = useState(false);
    const [error,SetError] = useState(false);
    
    const handleSubmit= async(e)=>{
       e.preventDefault();
       SetError(false);
       if (!nomUt || !emailUt || !passwordUt || !specEt || !matricule || !anneeEt || !cycleEt) {
        SetError(true);
        console.log("hello");
        return;
    }
       try{
        const res = await axios.post("http://localhost:8800/etudiants",{
        nomUt,
        emailUt,
        passwordUt,
        specEt,
        matricule,
        anneeEt,
        cycleEt,
       });
       console.log("weyyyy");
    //    res.data && window.location.replace("/login");
       console.log(res.data);
        }
       catch(err){
        SetError(true);
        console.log("hey",err);
       }
       
    };
      const toggleShowMoreFields = () => {
        setShowMoreFields(!showMoreFields);
     
    };

  
    return (
        <div className="flex flex-col mt-auto sm:flex-row items-stretch min-h-screen w-full " style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
        <div className="background sm:w-1/2 flex justify-center items-center p-6 sm:p-10">
            <h1 className="text-white text-3xl ">Welcome</h1>
        </div>
        <div className="formm sm:w-1/2 flex flex-col items-center justify-center bg-white sm:border-r-0 border-l border-t border-b border-gray-300 rounded-tl-3xl rounded-bl-3xl sm:rounded-bl-none sm:rounded-tr-none" >
            <h1 className='text-4xl pt-20 sm:mb-8 text-center sm:text-left '>Create Account</h1>
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
                        window.location.href = "/registerTeacher";
                    }}
                    className={`profileButton ${selectedProfile === 'teacher' ? 'selectedProfile' : ''}`}
                >
                    Teacher
                </button>
        <button
             onClick={() => {
                setSelectedProfile('club');
                window.location.href = "/RegisterClub";
                              }}
            className={`profileButton ${selectedProfile === 'club' ? 'selectedProfile' : ''}`}
        >
            Club
        </button>
        <button
            onClick={() => {
                setSelectedProfile('company');
                window.location.href = "/registerCompany";
                              }}
            className={`profileButton ${selectedProfile === 'company' ? 'selectedProfile' : ''}`}
        >
            Company
        </button>
    </div>

    <form className=" w-full sm:w-80 flex flex-col items-start mb-8 sm:mb-16" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="mt-4 hidden">Name FamilyName</label>
                    <input type="text" name='nomUt' id="nomUt" className="inputField outline-none" placeholder="Username" onChange={e => SetUsername(e.target.value)} />

                    <label htmlFor="email" className="mt-4 hidden">Email</label>
                    <input type="email" name='emailUt' id="emailUt" className="inputField mt-4 sm:mt-8 outline-none" placeholder="Email" onChange={e => SetEmail(e.target.value)} />

                    <label htmlFor="password" className="mt-4 hidden">Password</label>
                    <input type="password" name='passwordUt' id="passwordUt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Password" onChange={e => SetPassword(e.target.value)} />

                   
                    {showMoreFields && (
                        <>
                            <label htmlFor="spec" className="mt-4 hidden">Speciality</label>
                            <input type="text" name='specEt' id="specEt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Speciality" onChange={e => SetSpeciality(e.target.value)} />

                            <label htmlFor="matricule" className="mt-4 hidden">matricule</label>
                            <input type="text" name='matricule' id="matricule" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="matricule" onChange={e => Setmatricule(e.target.value)} />

                            <label htmlFor="year" className="mt-4 hidden">Year</label>
                            <input type="text" name='anneeEt' id="anneeEt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Year of study" onChange={e => SetYear(e.target.value)} />

                            <label htmlFor="cycle" className="mt-4 hidden">cycle</label>
                            <input type="text" name='cycleEt' id="cycleEt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="cycle" onChange={e => SetCycle(e.target.value)} />
                        </>
                    )}

                    <div className="mt-4 sm:mt-6 text-left">
                         <button type="button"  className="text-bleu text-left ml-1 mb-4 mt-0 pb-2" onClick={toggleShowMoreFields}>
                                {showMoreFields ? "Less" : "More"}
                            </button>
                        <button type='submit' className="createAccountButton text-white w-full sm:w-80 py-2  rounded-lg" style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
                            Create Account
                        </button>
                        <p className="mt-2 ml-2 text-center sm:text-left">Already have an account? <Link to="/Login" className=" text-bleu">Login</Link></p>
                        <p className="mt-2 ml-2 text-center sm:text-left">
                        </p>
                    </div>
                {error && <span className='ml-2  ' style={{ color: "red" }}>Something went wrong</span>}
                </form>
            </div>
        </div>
    );
}
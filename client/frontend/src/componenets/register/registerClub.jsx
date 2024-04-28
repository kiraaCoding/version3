import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function RegisterClub() {
    const [selectedProfile, setSelectedProfile] = useState('club');
    const [nomUt,SetUsername] = useState("");
    const [emailUt,SetEmail] = useState("");
    const [passwordUt,SetPassword] = useState("");
    const [designationCl,SetDesignation] = useState("");
    const [domaineCl,Setdomaine] = useState("");
    const [localCl,SetLocal] = useState("");
    const [showMoreFields, setShowMoreFields] = useState(false);
    const [error,SetError] = useState(false);
    
    const handleSubmit= async(e)=>{
       e.preventDefault();
       SetError(false);
       if (!nomUt || !emailUt || !passwordUt || !designationCl || !domaineCl || !localCl ) {
        SetError(true);
        return;
    }
       try{
        const res = await axios.post("http://localhost:8800/clubs",{
        nomUt,
        emailUt,
        passwordUt,
        designationCl,
        domaineCl,
        localCl,
       });
       res.data && window.location.replace("/login");
        }
       catch(err){
        SetError(true);
       }
       
    };
    const toggleShowMoreFields = () => {
        setShowMoreFields(!showMoreFields);
    };
    return (
    <div className="flex mt-auto flex-col sm:flex-row items-stretch min-h-screen w-full" style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
        <div className="background sm:w-1/2 flex justify-center items-center p-6 sm:p-52">
            <h1 className="text-white text text-3xl">Welcome</h1>
        </div>
        <div className="formm sm:w-1/2 flex flex-col items-center justify-center bg-white sm:border-r-0 border-l border-t border-b border-gray-300 rounded-tl-3xl rounded-bl-3xl sm:rounded-bl-none sm:rounded-tr-none">
    <h1 className='text-4xl mb-4 pt-20 sm:mb-8 text-center sm:text-left'>Create Account</h1>
    <div className="flex flex-col sm:flex-row justify-around mb-4 sm:mb-10">
        <button
            onClick={() => {
                setSelectedProfile('student');
                window.location.href = "/Register";
                              }}
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
            onClick={() => setSelectedProfile('club')}
            className={`profileButton ${selectedProfile === 'club' ? 'selectedProfile' : ''}`}
        >
            Club
        </button>
        <button
            onClick={() => {
                setSelectedProfile('company');
                window.location.href = "/RegisterCompany";
                                }}
            className={`profileButton ${selectedProfile === 'company' ? 'selectedProfile' : ''}`}
        >
            Company
        </button>
    </div>

    <form className="w-full sm:w-80 flex flex-col items-start mb-8 sm:mb-16" onSubmit={handleSubmit}>
        <label htmlFor="username" className="mt-4 hidden">Name FamilyName</label>
        <input type="text" name='nomUt' id="nomUt" className="inputField outline-none" placeholder="Username" onChange={e=>SetUsername(e.target.value)} />

        <label htmlFor="email" className="mt-4 hidden">Email</label>
        <input type="email"  name='emailUt' id="emailUt" className="inputField mt-4 sm:mt-8 outline-none" placeholder="Email" onChange={e=>SetEmail(e.target.value)} />

        <label htmlFor="password" className="mt-4 hidden">Password</label>
        <input type="password" name='passwordUt' id="passwordUt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Password" onChange={e=>SetPassword(e.target.value)}  />
        
        {showMoreFields && (
        <>
        <label htmlFor="designationCl" className="mt-4 hidden">Designation</label>
        <input type="text" name='designationCl' id="designationCl" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Designation" onChange={e=>SetDesignation(e.target.value)}  />
        
        <label htmlFor="domaineCl" className="mt-4 hidden">Domain</label>
        <input type="text" name='domaineCl' id="domaineCl" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="domain" onChange={e=>Setdomaine(e.target.value)}  />
        
        <label htmlFor="localCl" className="mt-4 hidden">year</label>
        <input type="text" name='localCL' id="localCL" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Local" onChange={e=>SetLocal(e.target.value)}  />
        </>
        
        )}
         <div className="mt-4 sm:mt-6 text-left">
                         <button type="button"  className="text-bleu text-left ml-1 mb-4 mt-0 pb-2" onClick={toggleShowMoreFields}>
                                {showMoreFields ? "Less" : "More"}
                            </button>
                        <button type='submit' className="createAccountButton text-white w-full sm:w-80 py-2  rounded-lg" style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
                            Create Account
                        </button>
                        <p className="mt-2 ml-2 text-center sm:text-left">Already have an account? <Link to="/login" className=" text-bleu">Login</Link></p>
                        <p className="mt-2 ml-2 text-center sm:text-left">
                        </p>
                    </div>
    {error && <span className='ml-2  ' style={{ color: "red" }}>Something went wrong</span>}
    </form>
   
    </div>

    </div>
    );
}

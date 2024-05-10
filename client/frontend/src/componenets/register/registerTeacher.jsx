import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';



export default function RegisterTeacher() {
    const [selectedProfile, setSelectedProfile] = useState('teacher');
    const [nomUt,SetUsername] = useState("");
    const [emailUt,SetEmail] = useState("");
    const [passwordUt,SetPassword] = useState("");
    const [depEn,SetDepartement] = useState("");
    const [numBurEn,SetNumBur] = useState("");
    const [gradeEn,SetGrade] = useState("");
    const [showMoreFields, setShowMoreFields] = useState(false);
    const [error,SetError] = useState(false);
    const params = new URLSearchParams();


    
    const handleSubmit= async(e)=>{
       e.preventDefault();
       SetError(false);
       if (!nomUt || !emailUt || !passwordUt || !depEn || !numBurEn || !gradeEn ) {
        SetError(true);
        console.log("hello");
        return;
    }
       try{
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post("http://localhost:8800/enseignants",{
        nomUt,
        emailUt,
        passwordUt,
        depEn,
        numBurEn,
        gradeEn,

       });
       params.append('nomUt', nomUt);
        params.append('emailUt', emailUt);
        params.append('passwordUt', passwordUt);
        params.append('depEn', depEn);
        params.append('numBurEn', numBurEn);
        params.append('gradeEn', gradeEn);

        window.location.href = `/VerifyCode?${params.toString()}`;

       console.log("weyyyy");
    //    res.data && window.location.replace("/login");
    //    res.data && window.location.replace("/VerifyCodePage") ; // Rediriger vers la page de confirmation

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
        <div className="flex mt-auto flex-col sm:flex-row items-stretch min-h-screen w-full" style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
        <div className="background sm:w-1/2 flex justify-center items-center p-6 sm:p-10">
            <h1 className="text-white text-3xl">Welcome</h1>
        </div>
        <div className="formm sm:w-1/2 flex flex-col items-center justify-center bg-white sm:border-r-0 border-l border-t border-b border-gray-300 rounded-tl-3xl rounded-bl-3xl sm:rounded-bl-none sm:rounded-tr-none">
            <h1 className='text-4xl mb-4 pt-20  sm:mb-8 text-center sm:text-left'>Create Account</h1>
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
            onClick={() => setSelectedProfile('teacher')}
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
                window.location.href = "/RegisterCompany";
                                }}
            className={`profileButton ${selectedProfile === 'company' ? 'selectedProfile' : ''}`}
        >
            Company
        </button>
    </div>

    <form className="w-full sm:w-80 flex flex-col items-start mb-8 sm:mb-16" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="mt-4 hidden">Name FamilyName</label>
                    <input type="text" name='nomUt' id="nomUt" className="inputField outline-none" placeholder="Username" onChange={e => SetUsername(e.target.value)} />

                    <label htmlFor="email" className="mt-4 hidden">Email</label>
                    <input type="email" name='emailUt' id="emailUt" className="inputField mt-4 sm:mt-8 outline-none" placeholder="Email" onChange={e => SetEmail(e.target.value)} />

                    <label htmlFor="password" className="mt-4 hidden">Password</label>
                    <input type="password" name='passwordUt' id="passwordUt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Password" onChange={e => SetPassword(e.target.value)} />

                   
                    {showMoreFields && (
                        <>
                            <label htmlFor="depEn" className="mt-4 hidden">Departement</label>
                            <input type="text" name='depEn' id="depEn" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Departement" onChange={e => SetDepartement(e.target.value)} />

                            <label htmlFor="numBur" className="mt-4 hidden">Bureaux</label>
                            <input type="text" name='numBurEn' id="numBurEn" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="bureaux" onChange={e => SetNumBur(e.target.value)} />

                            <label htmlFor="gradeEn" className="mt-4 hidden">Grade</label>
                            <input type="text" name='gradeEn' id="gradeEn" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="grade" onChange={e => SetGrade(e.target.value)} />

                           
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
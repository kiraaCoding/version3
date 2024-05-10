import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function VerifyCodePageC() {
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [nomUt, setNomUt] = useState("");
    const [emailUt, setEmailUt] = useState("");
    const [passwordUt, setPasswordUt] = useState("");
    const [designationEntr, setdesignationEntr] = useState("");
    const [siegesocEntr, setsiegesocEntr] = useState("");
    const [domaineEntr, setdomaineEntr] = useState("");
    const [telEntr, settelEntr] = useState("");

    // Extracting data from query parameters using URLSearchParams
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setNomUt(searchParams.get('nomUt'));
        console.log(nomUt);
        setEmailUt(searchParams.get('emailUt'));
        console.log(emailUt);
        setPasswordUt(searchParams.get('passwordUt'));
        setdesignationEntr(searchParams.get('designationEntr'));
        setsiegesocEntr(searchParams.get('siegesocEntr'));
        console.log(siegesocEntr);
        setdomaineEntr(searchParams.get('domaineEntr'));
        settelEntr(searchParams.get('telEntr')); // Set email state
        console.log(telEntr);
        setEmail(searchParams.get('emailUt')); // Set email state


    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("http://localhost:8800/checkVerificationCodeC", { 
                email,
                verificationCode,
                nomUt,
                emailUt,
                passwordUt,
                designationEntr,
                siegesocEntr,
                domaineEntr,
                telEntr
            });
            console.log(res.data);
            setSuccess(true); // Display success message
        } catch (err) {
            setError(true);
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col mt-auto sm:flex-row items-stretch min-h-screen w-full " style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
            <div className="background sm:w-1/2 flex justify-center items-center p-6 sm:p-10">
                <h1 className="text-white text-3xl">Welcome</h1>
            </div>
            <div className="formm sm:w-1/2 flex flex-col items-center justify-center bg-white sm:border-r-0 border-l border-t border-b border-gray-300 rounded-tl-3xl rounded-bl-3xl sm:rounded-bl-none sm:rounded-tr-none" >
                <h1 className='text-4xl pt-20 sm:mb-8 text-center sm:text-left '>Code Confirmation</h1>
    
                <form className=" w-full sm:w-80 flex flex-col items-start mb-8 sm:mb-16"onSubmit={handleSubmit}>
                    <label htmlFor="email" className="mt-4 hidden">Your email</label>
                    <input type="email" className="inputField outline-none"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
    
                    <label htmlFor="codeV" className="mt-4 hidden">Code </label>
                    <input type="text"  className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Code Verification" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
    
                    <div className="mt-4 sm:mt-6 text-left">
                    <button
                        type='submit'
                        className={`createAccountButton text-white w-full sm:w-80 py-2 rounded-lg `}
                        style={{
                            backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)',
                        }}
                    >
                        Verify
                    </button>
    
                    </div>
                    {error && <p style={{ color: "red" }}>Error verifying code. Please try again.</p>}
                {success && <p style={{ color: "green" }}>Code verified successfully. Account created!</p>}               
                 </form>
            </div>
        </div>
    );
}

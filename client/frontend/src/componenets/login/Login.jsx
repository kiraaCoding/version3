import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
// import { useDispatch } from 'react-redux';
// import { LoginSuccess } from '../../context/Actions';

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch,isFetching } = useContext(Context);
    const [error, setError] = useState(false);
    // const history = useHistory(); // Initialize useHistory


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        setError(false);
        const username = userRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError(true);
            console.log("Username or password is empty");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8800/login", {
                nomUt: username,
                passwordUt: password,
            });

            console.log("Response data:", res.data);

            if (res.data.token) {
                // Store the token in local storage
                localStorage.setItem('token', res.data.token);
                dispatch({ type: "LOGIN_SUCCESS", payload: { userId: res.data.userId, username: res.data.username, token: res.data.token } });

                let userType = '';

                try {
                    // Check if userId is associated with etudiants table
                    const token = localStorage.getItem('token');
                    await axios.get(`http://localhost:8800/etudiants/${res.data.userId}`, {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      })
                    userType = 'etudiants';
                } catch (error) {
                    try {
                        // Check if userId is associated with enseignants table
                        await axios.get(`http://localhost:8800/ensignants/${res.data.userId}`);
                        userType = 'enseignants';
                    } catch (error) {
                        try {
                            // Check if userId is associated with entreprises table
                            await axios.get(`http://localhost:8800/entreprises/${res.data.userId}`);
                            userType = 'entreprises';
                        } catch (error) {
                            try {
                                // Check if userId is associated with clubs table
                                await axios.get(`http://localhost:8800/clubs/${res.data.userId}`);
                                userType = 'clubs';
                            } catch (error) {
                                console.log("User type not recognized");
                            }
                        }
                    }
                }

                console.log("User type:", userType);


                console.log(res.data.userId);
                console.log(res.data.username);
                // Redirect to home page
                window.location.href = '/';

                // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                console.log("Login success");
            } else {
                dispatch({ type: "LOGIN_FAILURE" });
                setError(true);
                console.log("Empty response data");
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            setError(true);
            console.log("Error:", err);
        }
    };

    console.log(isFetching);


    return (
        <div className="flex flex-col mt-auto sm:flex-row items-stretch min-h-screen w-full " style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }}>
            <div className="background sm:w-1/2 flex justify-center items-center p-6 sm:p-10">
                <h1 className="text-white text-3xl">Welcome</h1>
            </div>
            <div className="formm sm:w-1/2 flex flex-col items-center justify-center bg-white sm:border-r-0 border-l border-t border-b border-gray-300 rounded-tl-3xl rounded-bl-3xl sm:rounded-bl-none sm:rounded-tr-none" >
                <h1 className='text-4xl pt-20 sm:mb-8 text-center sm:text-left '>Login Your Account</h1>

                <form className=" w-full sm:w-80 flex flex-col items-start mb-8 sm:mb-16" onSubmit={handleSubmit}>
                    <label htmlFor="nomUt" className="mt-4 hidden">Name FamilyName</label>
                    <input type="text" name='nomUt' id="nomUt" className="inputField outline-none" placeholder="Username" ref={userRef} />

                    <label htmlFor="password" className="mt-4 hidden">Password</label>
                    <input type="password" name='passwordUt' id="passwordUt" className="inputField mt-4 sm:mt-8 outline-none mb-2 sm:mb-4" placeholder="Password" ref={passwordRef} />

                    <div className="mt-4 sm:mt-6 text-left">
                    <button
    type='submit'
    disabled={isFetching} // Assuming isFetching is a state variable indicating the login process is ongoing
    className={`createAccountButton text-white w-full sm:w-80 py-2 rounded-lg ${isFetching ? 'disabledButton' : ''}`}
    style={{
        backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)',
        cursor: isFetching ? 'not-allowed' : 'pointer',
        borderColor: isFetching ? '#ccc' : '', // Change border color when disabled
    }}
>
    {isFetching ? 'Logging in...' : 'Login'}
</button>

                        <p className="mt-2 ml-2 text-center sm:text-left"></p>
                    </div>
                    {error && <span className='ml-2' style={{ color: "red" }}>Something went wrong</span>}
                </form>
            </div>
        </div>
    );
}

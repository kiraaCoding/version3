import Banner from "../shared/Banner";
import NavBar from "../shared/Navbar";
// eslint-disable-next-line no-unused-vars
import Card1 from "/src/assets/Card1.png"
import { Switch } from "./Switch";
import announcement  from "/src/assets/announcement.png"
import { FaArrowRight } from "react-icons/fa6";
import CodingWorkshop from "/src/assets/CodingWorkshop.gif"
import Footer from "../shared/Footer";
import RecentEvents from "../RecentEvents";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import axios from "axios";
import { Context } from "../context/Context";
import { useContext } from "react";
import Post from "../../pages/Post";
import axios from "axios";

export default function MyComponent() {
  const { user } = useContext(Context);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user.userId ) {
      // Make a request to the backend to get user information
      axios.get(`http://localhost:8800/etudiants/${user.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token as a header
        }
      })
        .then(response => {
          // Display the username in the UI
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [user.userId]);
  return (

    
    <div className="flex  relative bg-[#FEFDFB] flex-col items-center px-20 pt-10 mt-auto w-full  min-h-[4034px] max-md:px-5 max-md:max-w-full">
     <NavBar/>

      <div className="flex relative flex-col items-center w-full max-w-[1471px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3cd777575d22d77cc8fe5b392c9f23deacb15cd44f87a2ce63b97d6b87ea17d?"
          className="aspect-[25] w-[74px]"
        />
        <Banner/>  
       
        <div className=" mt-24 text-6xl font-bold text-center text-stone-400 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
          <span className=" text-primary">Events may </span>
          <span className=" text-beige">interest you.</span>
        </div>
        <RecentEvents/>
        <div>
            {/* Display user information */}
            {user && <p>Welcome, {user.userId}!</p>}
            
            {/* Other component content */}
        </div>
        {/* <div className="Events mt-24 w-full max-w-[1270px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-start px-6 pb-20 w-full bg-white rounded-3xl shadow-lg text-neutral-900 max-md:px-5 max-md:mt-10">
                <img
                src={Card1}
                
                  className="self-stretch mt-5 w-full aspect-[1.45]"
                />
                <div className="mt-7 ml-2.5 text-2xl font-bold tracking-tight leading-8">
                  GDG Algiers CTF
                </div>
                <div className="mt-2 ml-2.5 text-base tracking-tight leading-5">
                  ESI
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-start px-6 pb-20 w-full bg-white rounded-3xl shadow-lg text-neutral-900 max-md:px-5 max-md:mt-10">
                <img
                src={Card1}
                
                  className="self-stretch mt-5 w-full aspect-[1.45]"
                />
                <div className="mt-7 ml-2.5 text-2xl font-bold tracking-tight leading-8">
                  GDG Algiers CTF
                </div>
                <div className="mt-2 ml-2.5 text-base tracking-tight leading-5">
                  ESI
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-start pb-20 pl-6 w-full whitespace-nowrap bg-white rounded-3xl shadow-lg text-neutral-900 max-md:mt-10">
                <img
                  loading="lazy"
                  srcSet="..."
                  className="self-stretch mt-5 w-full aspect-[1.64]"
                />
                <div className="mt-9 ml-2.5 text-2xl font-bold tracking-tight leading-8">
                  Devfest
                </div>
                <div className="mt-3.5 ml-2.5 text-base tracking-tight leading-5">
                  ESI
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <button className="justify-center text-white bg-beige  px-9 py-3.5 mt-12 text-base font-semibold tracking-tight leading-6 text-center text-gray-50  rounded-[75.498px] max-md:px-5 max-md:mt-10">
        <Link to="/Events">More Data</Link>
        </button>
        <div className="flex gap-5 mt-24 w-full max-w-[1346px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex-auto  text-left text-7xl font-bold text-primary max-md:max-w-full max-md:text-4xl">
            Announcement
          </div>
          <div className="flex gap-5 mt-4  items-start self-start max-md:flex-wrap max-md:max-w-full">
            <div className="grow text-4xl font-bold  text-primary">
              Administration
            </div>
            <Switch className=" ml-14 self-end" />
            <div className="flex flex-col justify-center items-start self-stretch px-11 py-1.5 bg-stone-400 rounded-[48.17px] max-md:pl-5">
              <div className="shrink-0 bg-zinc-300 h-[38px] rounded-[48.17px]" />
            </div>
            <div className="flex-auto  text-4xl font-bold text-primary">
              Other
            </div>
          </div>
        </div>
        <div className="self-stretch mt-28 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-primary max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-2.5 pr-16 max-md:flex-wrap max-md:pr-5">
                  <img
                    src={announcement}
                    className="shrink-0 aspect-[1.04] w-[83px]"
                  />
                  <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                    <div className="text-3xl text-left font-medium leading-10 max-md:max-w-full">
                      Account name
                    </div>
                    <div className="text-3xl text-left leading-8 max-md:max-w-full">
                      @Handle
                    </div>
                  </div>
                </div>
                <div className="mt-10 text-2xl text-left leading-10 text-violet-950 max-md:mt-10 max-md:max-w-full">
                  <span className="text-neutral-900">
                    Lorem ipsum dolor sit amet illiet es ail consectetur
                    adipiscing elit. Ultrices et pulvinar id convallis quis
                    luctus forza
                  </span>
                  <br />
                  <span className="text-violet-950">
                    http://ow.ly/95IZ50z3bQP
                  </span>
                </div>
                <div className="mt-14 text-3xl text-primary text-left font-medium leading-10 max-md:mt-10 max-md:max-w-full flex items-center">
                    <Link to={"/announcement"} style={{ marginRight: '1rem' }}>Check announcement</Link> <FaArrowRight style={{ verticalAlign: 'middle' }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <img
                src={announcement}
                className="mt-12 w-full aspect-[1.47] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch mt-52 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
              <img
                src={CodingWorkshop}
                className="grow w-full aspect-[1.15] max-md:mt-10 max-md:max-w-full"
                
              />
              
            </div>
            <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-1 max-md:mt-10 max-md:max-w-full">
                <div className="text-7xl text-left font-bold text-primary max-md:max-w-full max-md:text-4xl">
                  Professional workshops
                </div>
                <div className="flex flex-col mt-16 ml-3 max-w-full w-[705px] max-md:mt-10">
                  <div className="text-2xl text-left leading-8 text-neutral-900 max-md:max-w-full">
                    enhance your professional life with workshops that can
                    benefit you in serval domains, don’t exploit university just
                    for studying
                  </div>
                  <div className="mt-14 text-3xl text-primary text-left font-medium leading-10 max-md:mt-10 max-md:max-w-full flex items-center">
                    <span style={{ marginRight: '1rem' }}>Check Workshops</span> <FaArrowRight style={{ verticalAlign: 'middle' }} />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-48 text-7xl text-primary font-bold tracking-wider text-center text-stone-400 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
          Discover similar <br />
          interests &{" "}
          <span className="text-stone-400 text-beige ">new utile Informations</span>
        </div>
        <div className="mt-12 text-2xl font-semibold text-center text-neutral-500 w-[778px] max-md:mt-10 max-md:max-w-full">
          A simple paragraph is comprised of three major components. The which
          is often a declarative sentence.
        </div>
      </div>
      {/* publications */}
      {/* <div className="relative mt-24 w-full max-w-[1550px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col grow px-3 py-6 mt-2.5 w-full shadow-2xl bg-white bg-opacity-0 rounded-[34.578px] max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-1.5 text-primary max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3201ab0aad6c189dcd62c58004c82b8947a70135f631eab8a5b474eab329756e?"
                  className="shrink-0 aspect-square w-[67px]"
                />
                <div className="flex text-left flex-col grow shrink-0 self-start basis-0 w-fit max-md:max-w-full">
                  <div className="text-2xl font-medium leading-9 max-md:max-w-full">
                    Account name
                  </div>
                  <div className="text-xl text-left leading-6 max-md:max-w-full">
                    <span className="text-primary">@</span>
                    <span className="text-primary">Handle</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-left text-2xl leading-9 text-violet-950 max-md:max-w-full">
                <span className="text-black">
                  hey i’m Walid Media , i was a computer science student and
                  this{" "}
                </span>
                <br />
                <span className="text-black">
                  is my experience with Graduation Project
                </span>
                <br />
                <span className="text-violet-950">
                  http://ow.ly/95IZ50z3bQP
                </span>
              </div>
              <img
                loading="lazy"
                srcSet="..."
                className="mt-14 w-full aspect-[1.69] max-md:mt-10 max-md:max-w-full"
              />
              <div className="mt-9 text-xl leading-6 text-stone-300 max-md:max-w-full">
                11:44 AM · Dec 10, 2020
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col grow px-3 py-7 w-full shadow-2xl bg-white bg-opacity-0 rounded-[35px] max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-1.5 text-primary max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/723d05455590bb2b5d5f9e90fa95b22cc7948c0f8b74914f283f91c1027a024d?"
                  className="shrink-0 aspect-square w-[68px]"
                />
                <div className="flex flex-col grow shrink-0 self-start basis-0 w-fit max-md:max-w-full">
                  <div className="text-2xl text-left font-medium leading-9 max-md:max-w-full">
                    Account name
                  </div>
                  <div className="text-xl text-left leading-6 max-md:max-w-full">
                    <span className="text-primary">@</span>
                    <span className="text-primary">Handle</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-2xl text-left leading-9 text-violet-950 max-md:max-w-full">
                <span className="text-black">
                  Hello i’m kheira computer science student , and i want to
                  share with you today my experience about choosing L2
                  specialties,{" "}
                </span>
                <br />
                <span className="text-black">...Read more </span>
                <br />
                <span className="text-violet-950">
                  http://ow.ly/95IZ50z3bQP
                </span>
              </div>
              <img
                loading="lazy"
                srcSet="..."
                className="mt-7 w-full aspect-[1.75] max-md:max-w-full"
              />
              <div className="mt-7 text-xl leading-6 text-stone-300 max-md:max-w-full">
                11:44 AM · Dec 10, 2020
              </div>
            </div>
          </div>
        </div>
      </div> */}
        <Post/>
      <Link className="relative z-10 justify-center items-center px-16 py-2.5 mt-20 mb-6 max-w-full text-xl font-bold text-white rounded-sm bg-beige w-[376px] max-md:px-5 max-md:mt-10 max-md:mb-2.5">
      More publications
    </Link>
    <div className="flex gradientBg w-[1710px] justify-center items-center px-16 py-20 mt-40  rounded-[30px_30px_188px_30px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-11 mb-3 w-full max-w-[1319px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[82%] max-md:ml-0 max-md:w-full">
            <div className="text-6xl font-bold text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">
              Each student had a story, & we are here to make it easy to write
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[18%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch my-auto text-2xl font-bold text-white max-md:mt-10">
              <div className="justify-center md:px-7 py-5 rounded-sm bg-beige max-md:px-5">
                Register Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   <Footer/>
    </div>
  );
}



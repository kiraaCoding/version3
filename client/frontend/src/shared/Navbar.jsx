import { useContext, useState } from "react";
import KiraLogo from "/src/assets/KiraLogo 1.png"
import { GrLanguage } from "react-icons/gr";
import { FaBars ,FaXmark} from "react-icons/fa6";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

const NavBar=() => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/events/"
  const WR = "http://localhost:5000/formation/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  
  const [isMenuOpen,SetIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    SetIsMenuOpen(!isMenuOpen);
  }


  const navItems = [
    {link : "Home",path:"Home"},
    {link : "Workshops",path:"formation"},
    {link : "Posts",path:"publication"},
    {link : "Events",path:"Events"},
    {link : "Announcements",path:"Announcements"},
    {link : "Contacts",path:"Contacts"},
    {link : "OtherFeature",path:"OtherFeature"},
  ]
  return (
    <>
     <nav className="bg-white md:px-14 p-4   md:w-[1690px] mx-auto text-primary fixed top-0 right-0 left-0 " >
    <div className="text-lg container mx-auto flex justify-between items-center font-semibold  ">
        <div className="flex space-x-14 items-center ">
            <a href="/" className="text-2xl font-semibold flex items-center space-x-3 text-primary" ><img src={KiraLogo}   alt="" className="w-10 inline-block items-center" />
            <span>XYZ</span>
            <div>
            {/* Display user information */}
            {user && <p>Welcome, {user.username}!</p>}
            
            {/* Other component content */}
        </div>
            </a>
            {/* showing navItems using map */}
            <ul className="md:flex space-x-12 hidden">
              {
                navItems.map(({link,path})=> <a key={link} href={path} className="  block hover:text-gray-300" >{link}</a>) 
              }
            </ul>
        </div>

        {/* language & sign up */}
        <div className="space-x-12 hidden md:flex items-center ">
          <a href="/" className="hidden lg:flex items-center hover:text-secondry " ><GrLanguage className="ml-4 mr-2 " /><span className="">Language</span></a>
          <button className="bg-secondry py-2 px-2 transition-all duration-300 rounded 
          hover:text-white hover:bg-indigo-600">Sign Up</button>
          <button className="bg-secondry py-2 px-2 transition-all duration-300 rounded 
          hover:text-white hover:bg-indigo-600" onClick={handleLogout}>{user&&"LOGOUT"}</button>
        </div>
        <div>
        {user ? (
          <Link to="/events">
            <img className="topImg" src={PF+user} alt="" />
          </Link>
        ) : 
        (
          <Link to="/workshops">
            <img className="topImg" src={WR+user} alt="" />
          </Link>
        )(
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        </div>
        <i className="topSearchIcon fas fa-search"></i>
        {/* buttto menu  */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-xl focus:outline-none focus:text-whitegray   ">
              {
                isMenuOpen ? (<FaXmark className="w-6 h-6 text-primary "/>) : (<FaBars className="w-6 h-6 text-primary"/>)
              }

          </button>

        </div>
    </div>
   </nav>
    
    {/* navItems for mobile devices  */}
    <div className={`space-y-4 px-4 pt-24 pb-5 bg-secondry ${isMenuOpen ? "block fixed top-0 right-0 left-0" :"hidden"}`}>
              
                 {
                  navItems.map(({link,path})=> <a key={link} href={path} className="block hover:text-gray-300" >{link}</a>) 
                 }
              
    </div>

    </>
  

  );
};

export default NavBar;

/* eslint-disable no-unused-vars */
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import "@fontsource/jost"; // Defaults to weight 400
import "@fontsource/jost/400.css"; // Specify weight
import "@fontsource/jost/400-italic.css"; // Specify weight and style
import './App.css';
import Events from "./componenets/Clubs/Events.jsx";
import Updateevents from "./componenets/Updateevents.jsx";
import Addevents from "./componenets/Addevents.jsx";
import Register from "./componenets/register/Register.jsx";
import RegisterTeacher from "./componenets/register/registerTeacher.jsx";
import RegisterClub from "./componenets/register/registerClub.jsx";
import RegisterCompany from "./componenets/register/registerCompany.jsx";
import Login from "./componenets/login/Login.jsx";
import { useContext } from "react";
import { Context } from "./context/Context.jsx";
import NavBar from "./shared/Navbar.jsx";
import Home from "./componenets/Home.jsx";
import EventsSansModif from "./shared/EventsSansModif.jsx";
import TeacherForS from "./componenets/Student/TeacherForS.jsx";
import CreatEvent from "./componenets/Clubs/CreatEvent.jsx";
import Updateevent from "./componenets/Clubs/Updateevent.jsx";
import AdminStudent from "./Admin/AdminStudent.jsx";
import AdminClubs from "./Admin/AdminClubs.jsx";
import AdminTeachers from "./Admin/AdminTeachers.jsx";
import AdminCompany from "./Admin/AdminCompany.jsx";
import Formations from "../pages/Formations.jsx";
import AddFormation from "../pages/AddFormation.jsx";
import UpdateFormation from "../pages/UpdateFormation.jsx";
import Publications from "../pages/Publications.jsx";
import AddPublication from "../pages/AddPublication.jsx";
import UpdatePublication from "../pages/UpdatePublication.jsx";
import AccueilEnr from "./componenets/Entreprises/Accueil.jsx";
export default function App() {
  const {user} = useContext(Context);
  return (
    <>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/Events" element={<Events />} />
        <Route path="/" element={<Home />} />
        <Route path="/Updateevents/:numEv" element={<Updateevents />} />
        <Route path="/Addevents" element={<Addevents />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RegisterTeacher" element={<RegisterTeacher />} />
        <Route path="/RegisterClub" element={<RegisterClub />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Navbar" element={<NavBar />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/EventsSansModif" element={<EventsSansModif />} />
        <Route path="/TeacherForS" element={<TeacherForS />} />
        <Route path="/CreatEvent" element={<CreatEvent/>} />
        <Route path="/AdminStudent" element={<AdminStudent/>} />
        <Route path="/AdminClubs" element={<AdminClubs/>} />
        <Route path="/AdminTeachers" element={<AdminTeachers/>} />
        <Route path="/AdminCompany" element={<AdminCompany/>} />
        <Route path="/Updateevent/:numEv" element={<Updateevent/>} />
        <Route path="/formation" element={<Formations/>}/>
        <Route path="/addformation" element={<AddFormation/>}/>
        <Route path="/updateformation/:numform" element={<UpdateFormation/>}/>

        <Route path="/publication" element={<Publications />} />
        <Route path="/addpublication" element={<AddPublication />} />
        <Route path="/updatepublication/:id" element={<UpdatePublication />} />
        <Route path="/AccueilEntr" element={<AccueilEnr />} />

        

      
        
      </Routes>
        
      
      
    </BrowserRouter>
    
    </div>
    
      
    </>
   
      
      
      
  )
}




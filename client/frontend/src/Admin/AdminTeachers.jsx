import { IoSearch } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AdminTeachers() {
  const [selectedProfile, setSelectedProfile] = useState('teacher');

  return (
    <div className=" mt-auto px-4 flex flex-col w-[1700px] lg:max-w-full justify-center bg-white p-0">
      <div className="pr-16 w-[1570px] right-0 z-10 bg-grey max-md:pr-5 max-md:max-w-full">
        <div className="flex w-full  gap-5 max-md:flex-col max-md:gap-0">
          {/* Sidebar */}
          <Sidebar />
          
          <div className="flex ml-96 flex-col flex-grow  w-[81%] max-md:ml-0 max-md:w-full mr-0 z-10 right-0"style={{paddingRight: '0px'}}>
            <div className="flex flex-col grow mt-6 max-md:mt-10 max-md:max-w-full">
            <div className="flex justify-center gap-5 items-center text-base font-semibold text-neutral-400 max-md:flex-wrap">
  <div className="flex flex-auto gap-3 items-center px-4 py-4 bg-beige bg-opacity-30 rounded-full max-md:flex-wrap max-md:px-5">
    <IoSearch className="w-6 h-6 text-gray-500" />
    <input
      type="text"
      placeholder="Search here"
      className="flex-auto text-center bg-beige bg-opacity-0   focus:outline-none placeholder-gray-500"
    />
  </div>
  <div className="w-px h-14 rounded-lg  " />
</div>

              <div className="self-center mt-14 text-4xl font-bold text-center text-primary max-md:mt-10 max-md:text-4xl">
                Users
              </div>
              <div className="flex justify-center items-center px-16 py-6 mt-12  font-semibold whitespace-nowrap bg-white rounded-[34px] text-neutral-400 max-md:px-5 max-md:mt-10 max-md:max-w-full">
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
              <div className="flex flex-col py-20 pr-20  pl-10 mt-24 bg-white rounded-[34px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-2xl">User Infos</div>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
        <div className="flex flex-col flex-grow">
          <label htmlFor="username" className="text-base font-medium text-blue-950">Username</label>
          <input type="text" id="username" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="email" className="text-base font-medium text-blue-950">Email</label>
          <input type="email" id="email" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="password" className="text-base font-medium text-blue-950">Password</label>
          <input type="password" id="password" className=" bg-grey text-center input-field" />
        </div>
      </div>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2">
        <div className="flex flex-col flex-grow">
          <label htmlFor="speciality" className="text-base font-medium text-blue-950">Speciality</label>
          <input type="text" id="speciality" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="matricule" className="text-base font-medium text-blue-950">Matricule</label>
          <input type="text" id="matricule" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="yearOfStudy" className="text-base font-medium text-blue-950">Year of Study</label>
          <input type="text" id="yearOfStudy" className="input-field" />
        </div>
      </div>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2">
        <div className="flex flex-col flex-grow">
          <label htmlFor="cycle" className="text-base font-medium text-blue-950">Cycle</label>
          <input type="text" id="cycle" className=" input-field" />
        </div>

      </div>
    </div>
    
    <div className="flex flex-col py-20 pr-20  pl-10 mt-24 bg-white rounded-[34px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="text-2xl">User Infos</div>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2 max-md:max-w-full">
        <div className="flex flex-col flex-grow">
          <label htmlFor="username" className="text-base font-medium text-blue-950">Username</label>
          <input type="text" id="username" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="email" className="text-base font-medium text-blue-950">Email</label>
          <input type="email" id="email" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="password" className="text-base font-medium text-blue-950">Password</label>
          <input type="password" id="password" className=" bg-grey text-center input-field" />
        </div>
      </div>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2">
        <div className="flex flex-col flex-grow">
          <label htmlFor="speciality" className="text-base font-medium text-blue-950">Speciality</label>
          <input type="text" id="speciality" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="matricule" className="text-base font-medium text-blue-950">Matricule</label>
          <input type="text" id="matricule" className="input-field" />
        </div>
        <div className="flex flex-col flex-grow">
          <label htmlFor="yearOfStudy" className="text-base font-medium text-blue-950">Year of Study</label>
          <input type="text" id="yearOfStudy" className="input-field" />
        </div>
      </div>
      <div className="flex gap-5 mt-10 max-md:flex-wrap max-md:mr-2">
        <div className="flex flex-col flex-grow">
          <label htmlFor="cycle" className="text-base font-medium text-blue-950">Cycle</label>
          <input type="text" id="cycle" className=" input-field" />
        </div>

      </div>
    </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



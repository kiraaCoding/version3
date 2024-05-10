import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import { MdOutlinePublic } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { SiCoursera } from "react-icons/si";
import { GiDiploma } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";


export default function Sidebar({isOpen}) {
  // const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  console.log(isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="relative">


      {isOpen && (
        <div className="sidebar">
          <div className="sidebar-content">
            <div className="flex fixed flex-col max-md:ml-0 max-md: z-10 top-0 left-0">
              <div className="flex h-screen ml-0 w-full flex-col pb-52 mb-52 bg-white shadow-2xl">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/37554aebd11fec1a3eb7f3284983e25743458a1d022edb023ef84f44fe5ec399?"
                  className="w-full aspect-[2.86]"
                />
                <div className="flex flex-col mt-5 ml-12 max-w-full w-[104px] max-md:ml-2.5">
                  <div className="text-base font-bold tracking-wider text-stone-300">
                    MAIN MENU
                  </div>
                </div>
                <div
                  className={`Item flex gap-5 px-12 py-2.5 mt-6 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5 ${
                    selectedItem === "Users" ? "selected" : ""
                  }`}
                  onClick={() => handleItemClick("Users")}
                >
                  <FaUsers className="shrink-0 aspect-square w-[30px]" />
                  <div className=" flex-auto my-auto">Users</div>
                </div>
                <div className={`Item flex gap-5 px-12 py-2.5 mt-6 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5 ${selectedItem === "Events" ? "selected" : ""}`} onClick={() => handleItemClick("Events")}>
                  <MdEventSeat className="shrink-0 aspect-square w-[30px]" />
                  <div className="flex-auto my-auto">Events</div>
                </div>
                <div className={`Item flex gap-5 px-12 py-2.5 mt-3.5 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5 ${selectedItem === "Workshops" ? "selected" : ""}`} onClick={() => handleItemClick("Workshops")}>
                  <GrWorkshop className="shrink-0 aspect-square w-[30px]" />
                  <div className="flex-auto my-auto">Workshops</div>
                </div>
                <div className=" Item flex gap-5 px-12 py-3 mt-3.5 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5">
                <MdOutlinePublic className="shrink-0 w-7 aspect-square"/>
                <div className="flex-auto my-auto">Posts</div>
                </div>
                <div className="Item flex gap-5 px-12 py-3 mt-3.5 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5">
                <GrAnnounce      
                className="shrink-0 w-7 aspect-square"
                />
                <div className="flex-auto my-auto">Announcement</div>
                </div>
                <div className="Item flex gap-5 px-12 py-2.5 mt-3.5 text-lg font-semibold bg-white text-primary max-md:px-5">
                <SiCoursera 
                className="shrink-0 aspect-square w-[30px]"
                />
                <div className="flex-auto my-auto">Courses & conferences</div>
                </div>
                <div className="Item flex gap-5 px-12 py-2.5 mt-3.5 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5">
                <GiDiploma 
                className="shrink-0 aspect-square w-[30px]"
                />
                <div className="flex-auto my-auto">PFEs</div>
                </div>
                <div className="Item flex gap-5 px-12 py-3 mt-2.5 text-lg font-semibold whitespace-nowrap bg-white text-primary max-md:px-5">
                <CgProfile 
                className="shrink-0 w-7 aspect-square"
                />
                <div className="flex-auto my-auto">Profiles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

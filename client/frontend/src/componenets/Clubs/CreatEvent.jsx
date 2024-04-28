import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { IoIosCloudUpload,IoIosCloseCircleOutline } from "react-icons/io";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CreatEvent() {
  const [event,SetEvent] =useState({
    titreEv:"",
    descEv:"",
    datedebEv:"",
    datefinEv:"",
    coverEv:"",
    catEv:"",
    userId:"",
    adminid:"",
    lieuEv:"",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  // const handleImageUpload = (event) => {
  //   const selectedImage = event.target.files[0];
  //   setImage(URL.createObjectURL(selectedImage));
  //   SetEvent((prevEvent) => ({ ...prevEvent, coverEv: selectedImage }));
  // };
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setImage(imageDataUrl);
      SetEvent((prevEvent) => ({ ...prevEvent, coverEv: imageDataUrl }));
    };
    reader.readAsDataURL(selectedImage);
  };
  // const handleImageUpload = (event) => {
  //   const selectedImage = event.target.files[0];
  //   setImage(URL.createObjectURL(selectedImage));
  //   SetEvent((prevEvent) => ({ ...prevEvent, coverEv: selectedImage }));
  // };
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    SetEvent((prevEvent) => ({ ...prevEvent, catEv: value }));
    if (value === "Others") {
      setCustomCategory(""); // Clear custom category input if "Others" is selected
    }
  };
  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value);
    setSelectedCategory("Others"); // Select "Others" when user starts typing a custom category
  };
  const categories = [
    "Hackathon",
    "Ideathon",
    "Datathon",
    "Collaboration",
    "Educatif",
    "Others",
  ];
  const navigate =useNavigate();
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   if (
  //     event.titreEv &&
  //     event.descEv &&
  //     event.datedebEv &&
  //     event.datefinEv &&
  //     event.coverEv && // Make sure coverEv is not empty
  //     event.catEv
  //   ) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('titreEv', event.titreEv);
  //       formData.append('descEv', event.descEv);
  //       formData.append('datedebEv', event.datedebEv);
  //       formData.append('datefinEv', event.datefinEv);
  //       formData.append('coverEv', event.coverEv); // Append the image file to the formData
  //       formData.append('catEv', event.catEv);
  //       console.log("hry");
  //       await axios.post("http://localhost:8800/events", formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       });
  //       navigate("/");
  //     } catch (err) {
  //       console.log(err);
  //       setError("An error occurred while creating the event.");
  //     }
  //   } else {
  //     alert("Please fill out all the required fields");
  //     setError("Please fill out all the required fields.");
  //   }
  // };
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (
        event.titreEv &&
        event.descEv &&
        event.datedebEv &&
        event.datefinEv &&
        event.catEv &&
        event.coverEv // Ensure coverEv is not empty
        && event.adminid
        && event.userId
        && event.lieuEv
    ) {
        try {
            const formData = new FormData();
            formData.append('titreEv', event.titreEv);
            formData.append('descEv', event.descEv);
            formData.append('datedebEv', event.datedebEv);
            formData.append('datefinEv', event.datefinEv);
            formData.append('catEv', event.catEv);
            formData.append('coverEv', event.coverEv); // Append the file directly
            formData.append('userId', event.userId);
            formData.append('adminid', event.adminid);
            formData.append('lieuEv', event.lieuEv);
            console.log("hey");

            const response = await axios.post("http://localhost:8800/events", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.status === 200) {
                console.log("Event created successfully");
                navigate("/Events");
            } else {
                console.error("Failed to create event:", response.data);
                setError("An error occurred while creating the event.");
            }
        } catch (err) {
            console.error("Error creating event:", err);
            setError("An error occurred while creating the event.");
        }
    } else {
        alert("Please fill out all the required fields");
        setError("Please fill out all the required fields.");
    }
};

  
  
  
  const handlechange =(e) =>{
    SetEvent((prev) => ({...prev,[e.target.name]:e.target.value}));
  };
  console.log(event);
  return (
    <div className="flex flex-col mt-auto items-end p-20 text-xs bg-white max-md:px-5">
    <div className="flex gap-5 justify-between self-center w-full text-base text-black max-w-[1226px] max-md:flex-wrap max-md:max-w-full">
      <div className="flex  text-left flex-col pt-6 pb-20 max-md:max-w-full">
        <div className="self-center lg: w-[1226px] text-7xl font-bold text-[#262598] leading-[86.25px] max-md:max-w-full max-md:text-4xl">
          Creat an event{" "}
        </div>
        <div className="mt-16 text-left max-md:mt-10 max-md:max-w-full">
          Event Title
        </div>
        <input type="text" placeholder="Enter the title" className="justify-center  items-start p-3.5 mt-4 text-black outline-none rounded-md bg-grey max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="titreEv">
        </input>
        <div className="mt-6 max-md:max-w-full">Event Discription</div>
        <input type="text" placeholder="Enter brief discreption" className="justify-center items-start p-3.5 mt-3 outline-none rounded-md bg-grey max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="descEv">
        </input>
        <div className="mt-6 max-md:max-w-full">Event userId</div>
        <input type="text" placeholder="Enter brief discreption" className="justify-center items-start p-3.5 mt-3 outline-none rounded-md bg-grey max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="userId">
        </input>
        <div className="mt-6 max-md:max-w-full">Event adminId</div>
        <input type="text" placeholder="Enter brief discreption" className="justify-center items-start p-3.5 mt-3 outline-none rounded-md bg-grey max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="adminid">
        </input>
        <div className="mt-6 max-md:max-w-full">Event lieu</div>
        <input type="text" placeholder="Enter brief discreption" className="justify-center items-start p-3.5 mt-3 outline-none rounded-md bg-grey max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="lieuEv">
        </input>
        <div className="flex gap-5 justify-between mt-6 max-w-full w-[627px] max-md:flex-wrap">
          <div>Start time</div>
          <div className=" text-left ">End time</div>
        </div>
        <div className="flex gap-5 mt-4 max-md:flex-wrap max-md:max-w-full">
          <input type="date" placeholder="Enter the start time" className="grow outline-none justify-center items-start p-3.5 rounded-md bg-grey w-fit max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="datedebEv">
          </input>
          <input type="date" placeholder="Enter the end date"  className="grow outline-none justify-center items-start p-3.5 rounded-md bg-grey w-fit max-md:pr-5 max-md:max-w-full"onChange={handlechange} name="datefinEv">
          </input>
        </div>
        <div type="image" className=" text-left mt-6 text-black max-md:max-w-full">Event Image</div>
          <label htmlFor="image-upload" className="mt-4 mb-6 max-w-full">
          <div className="relative max-w-full">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            {image ? (
            <div className="relative">
              <img src={image} alt="Event" className="max-w-full h-auto rounded-lg" />
              <button
                onClick={() => setImage(null)}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-500"
              >
                <FaDeleteLeft  className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-grey rounded-md h-48">
              <IoIosCloudUpload className="w-40 h-16" />
              <p className="mt-2 text-gray-500">Drag & drop or click to upload</p>
            </div>
          )}
          </div>
        </label>
        <div className="mt-6  text-red-500 max-md:mt-10 max-md:max-w-full">
          Event Cat<span className="text-red-500  ">*</span>
        </div>
      <div className="mt-2 relative">
        <select
        
          value={selectedCategory}
          onChange={handleCategoryChange}
          // className="justify-center outline-none text-left items-start px-7 py-5 mt-4 max-w-full rounded-2xl bg-grey text-slate-500 w-[1226px] max-md:px-5 max-md:mt-10
          className="block w-full px-7 py-5  mt-4  text-gray-700 bg-gray-200 border border-grey rounded-md focus:outline-none focus:bg-grey focus:border-gray-500"
        >
          <option  value="">Select a category...</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {selectedCategory === "Others" && (
          <input
            type="text"
            value={customCategory}
            onChange={handleCustomCategoryChange}
            placeholder="Enter other category..."
            className="absolute top-0 right-0 block w-full px-7 py-5 mt-24  text-gray-700 bg-gray-200 border border-grey rounded-md focus:outline-none focus:bg-grey focus:border-gray-500"
          />
        )}
      </div>
        </div>
        </div>
      {/* <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc6552af8032d915625ed179863785b1dbb6b1b1e8e3faf780e3199651934601?"
        className="shrink-0 my-auto w-5 aspect-square"
      /> */}
    <div className="justify-center mt-6 items-center px-7 py-5  max-w-full text-2xl font-medium tracking-widest leading-6 text-center text-white rounded-2xl w-[1226px] max-md:px-5 max-md:mt-10"style={{ backgroundImage: 'linear-gradient(132.25deg, #07005C 0%, #5961F9 89.67%)' }} onClick={handleClick}>
      Create Event
    </div>
    {error && <div className="text-red-500">{error}</div>}
  </div>

  );
}




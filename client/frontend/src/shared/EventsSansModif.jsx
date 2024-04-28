/* eslint-disable no-empty */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
// import { Context } from "../../context/Context";



export default function EventsSansModif() {
    const [events, setEvents] = useState([]);
    const {search} =useLocation();

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/events"+search);
                setEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEvents();
    }, [search]);

  
    // const handleUpdate = async (numEv) => {
    //     try{
            
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    return (
       
                <div className=' m-auto '>
            <h1 className=' text-5xl mb-16 font-bold mt-16 py-4'>
            <span className=" text-primary">Events may </span>
          <span className=" text-beige">interest you.</span>
                </h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
                {events.map(event => (
                    <div key={event.numEv} className="bg-white rounded-lg shadow-md p-4 mb-16 transition-transform duration-300 transform hover:scale-105" style={{ width: '392.43px', height: '420.06px', borderRadius: '21.57px' }}>
                        <div className="relative mb-4 " style={{ width: '347.19px', height: '221.1px', top: '22.65px', left: '10.65px', borderRadius: '19.41px' }}>
                            <img
                                src={event.coverEv}
                                alt="Event"
                                className="absolute inset-0   object-cover w-full h-full   "
                                style={{ borderRadius: '19.41px' }}
                            />
                        </div>
                        <div className="p-4">
                            <h1 className="text-xl font-bold mb-2 text-left">{event.titreEv}</h1>
                            <p className="text-sm mb-2 text-left">{event.descEv}</p>
                            <p className="text-sm text-left">Start Date: {event.datedebEv}</p>
                            <p className="text-sm  text-left">End Date: {event.datefinEv}</p>
                            <p className="text-sm  text-left">Category: {event.catEv}</p>
                            <div className="flex justify-between mt-4">
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* eslint-disable no-empty */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




export default function SingleEvent() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/events");
                setEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEvents();
    }, []);

    const handleDelete = async (numEv) => {
        try{
            await axios.delete("http://localhost:8800/events/"+numEv);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    const handleUpdate = async (numEv) => {
        try{
            
        }catch(err){
            console.log(err);
        }
    }

    return (
       
                <div>
            <h1 className='text-3xl font-bold  py-4'>Events that may interest you!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {events.map(event => (
                    <div key={event.numEv} className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105" style={{ width: '392.43px', height: '430.06px', borderRadius: '21.57px' }}>
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
                            <div className="flex justify-between mt-4">
                                
                                <button onClick={() => handleUpdate(event.numEv)}  className="rounded-full text-whitegray bg-beige px-4 py-1"> <Link to={`/Updateevents/${event.numEv}`}>Update</Link></button>
                                <button onClick={() => handleDelete(event.numEv)} className="rounded-full text-whitegray bg-beige px-4 py-1 cursor-pointer">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="rounded-full  text-whitegray bg-beige px-4 py-1"><a href="/Addevents">Add event</a></button>
        </div>
    );
}

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function Events() {
    const [events, setEvents] = useState([]);
    const { search } = useLocation();

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const res = await axios.get("http://localhost:8800/events" + search);
                const sortedEvents = res.data.sort((a, b) => new Date(b.datedebEv) - new Date(a.datedebEv));
                const latestEvents = sortedEvents.slice(0, 3);
                setEvents(latestEvents);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEvents();
    }, [search]);

    const handleDelete = async (numEv) => {
        try {
            await axios.delete("http://localhost:8800/events/" + numEv);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (numEv) => {
        try {
            // Handle update logic
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className=' m-auto '>
            <div className="grid grid-cols-1 mt-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 ">
                {events.map(event => (
                    <div key={event.numEv} className="bg-white rounded-lg shadow-lg p-4 transition-transform duration-300 transform hover:scale-105" style={{ width: '392.43px', height: '420.06px', borderRadius: '21.57px' }}>
                        <div className="relative mb-4  " style={{ width: '347.19px', height: '210.1px', top: '22.65px', left: '10.65px', borderRadius: '19.41px' }}>
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
                            {/* <div className="flex justify-between mt-4">
                                <button onClick={() => handleUpdate(event.numEv)} className="rounded-full text-whitegray bg-beige px-4 py-1"> <Link to={`/Updateevents/${event.numEv}`}>Update</Link></button>
                                <button onClick={() => handleDelete(event.numEv)} className="rounded-full text-whitegray bg-beige px-4 py-1 cursor-pointer">Delete</button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            {/* <button className="rounded-full  text-whitegray bg-beige px-4 py-1 mt-8"><a href="/Addevents">Add event</a></button> */}
        </div>
    );
}

import React, { useState } from "react";
import { useNavigate } from 'react-router'

function Notifications() {
    const navigate = useNavigate()

    const [notifications, setNotifications] = useState([
        { id: 1, type: 'user', content: 'New user registered', timestamp: new Date() },
        { id: 2, type: 'admin', content: 'Important announcement', timestamp: new Date() },
        { id: 3, type: 'doctor', content: 'Appointment reminder', timestamp: new Date() },
        { id: 4, type: 'option', content: 'Confirm or reject', timestamp: new Date(), showOptions: true },
    ]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filteredNotifications = notifications.filter(notification => {
        if (!startDate || !endDate) return true;

        const notificationDate = notification.timestamp;
        return notificationDate >= new Date(startDate) && notificationDate <= new Date(endDate);
    });

    const handleConfirm=()=>{
        
    }
    const handleReject=()=>{

    }

    return (
        <div className="w-full px-0 md:px-6 py-2">
            <div className="flex justify-between items-center px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                <div className="sm:flex items-center justify-between">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Notifications</p>
                </div>
                <div className="flex mb-4">
                    <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded mr-2"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
              
                {filteredNotifications.map(notification => (
                    <div key={notification.id} className="border-b border-gray-300 py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{notification.content}</p>
                                <p className="text-sm text-gray-500">
                                    {notification.timestamp.toLocaleString()}
                                </p>
                            </div>
                            {notification.showOptions && (
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleConfirm(notification.id)}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleReject(notification.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notifications;

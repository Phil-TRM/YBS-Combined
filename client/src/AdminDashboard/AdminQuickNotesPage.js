
import React, { useEffect, useLayoutEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import { DeleteNotes, FILE_URL, FormatDate, GetNotes } from "../utils/Const";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../Redux/Actions";

const status={
    0:"Pending",
    1:"Approved",
    2:"Rejected",
}

function AdminQuickNotes() {
    const Notes =  useSelector(state=>state.Notes);
    const Dispatch = useDispatch();  
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [dayInput, setDayInput] = useState("");
    const [notes, setNote] = useState([]);

    const navigate = useNavigate()


    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    useLayoutEffect(()=>{
        if(Notes.length>0){
            setNote(Notes)
        }else{
            GetNotes().then(d=>{
                if(d!=null){
                    Dispatch(setNotes(d.data))
                }
            })
        }
    },[Notes])


    const handleDltNote = (id) => {
        DeleteNotes(id).then(d=>{
            if(d!=null){
                NotificationManager.success("Deleted Successfully");
            }
        })
     };

    const handleEditNote = (id) => {
        navigate(`/edit/${id}`)

    };
    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };


    const filteredData = notes.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()) || item.creator.toLowerCase().includes(searchQuery.toLowerCase());


        const createdAtParts = item.createdAt;
        const createdAtDate = new Date(createdAtParts);

        const isWithinDateRange = (!startDate || createdAtDate >= new Date(startDate)) &&
            (!endDate || createdAtDate <= new Date(endDate));

        return matchesSearch && isWithinDateRange;
    });

    const handleSaveDay = () => {

        setOpenDialog(false);
    };

    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-3 py-2 border rounded-md  "
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-3 py-2 border rounded-md  ml-2"
                            />
                        </div>
                        <div className="flex space-x-4  items-center">


                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-3 py-2 border rounded-md "
                            />
                            <button
                                className="px-3 py-2 border rounded-md bg-[#452a72] text-white"
                                onClick={() => setOpenDialog(true)}
                            >
                                Day Limit
                            </button>
                            <button
                                className="px-3 py-2 border rounded-md bg-[#452a72] text-white"
                                onClick={() => navigate("add/category")}
                            >
                                Add Category
                            </button>

                        </div>

                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Quick Note</th>
                                <th className="font-normal text-left pl-8">Creator</th>
                                <th className="font-normal text-left pl-8">Category</th>
                                <th className="font-normal text-left pl-8">Status</th>
                                <th className="font-normal text-left pl-12">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {filteredData.map((note) => (
                                <tr
                                    key={note._id}
                                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                >

                                    <td className="px-0 2xl:px-0 mt-4 flex justify-center items-center">
                                        <div className="w-10 h-10 mr-2">
                                            <LazyLoadImage
                                                effect="blur"
                                                width="100%"
                                                height="100%"
                                                className="w-full h-full"
                                                src={FILE_URL+note.imgUrl}
                                            />
                                        </div>
                                        <p className="font-medium">{note.para.slice(0, 15)}...</p>
                                        <Tooltip content="View Description">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => {
                                                    setSelectedNote(note._id);
                                                    handleToggleDialog();
                                                }}
                                            >
                                                <InfoIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {note.userName}
                                        </p>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {note.cateName}
                                        </p>
                                    </td>
                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {status[note.status]}
                                        </p>
                                    </td>

                                    <td className="pl-8">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {FormatDate(note.createdAt)}
                                        </p>
                                    </td>

                                    <td className="px-7 2xl:px-0">
                                        <Tooltip content="Edit Post">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleEditNote(note._id)}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete Post">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleDltNote(note._id)}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Dialog open={isDialogOpen} onClose={handleToggleDialog}>
                        <DialogTitle>{selectedNote && notes.find(note => note.id === selectedNote).title}</DialogTitle>
                        <DialogContent>
                            {selectedNote && notes.find(note => note.id === selectedNote).description}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleToggleDialog}>Close</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Add Day Input</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Enter Day"
                                variant="outlined"
                                value={dayInput}
                                onChange={(e) => setDayInput(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)} sx={{ background: "#452a72", color: "#fff" }}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveDay} sx={{ background: "#452a72", color: "#fff" }}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    );
}

export default AdminQuickNotes;

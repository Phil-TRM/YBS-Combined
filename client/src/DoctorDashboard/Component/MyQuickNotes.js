import React, { useLayoutEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteNotes, FILE_URL, FormatDate, GetNotesByUser } from '../../utils/Const';
import { setNotes } from '../../Redux/Actions';
import { NotificationManager } from 'react-notifications';

const STATUS={
    0:"Pending",
    1:"Confirmed",
    2:"Rejected"
}
const MyQuickNotes = () => {
    const Basic = useSelector(state=>state.handleUserBasicData);
    const Notes = useSelector(state=>state.Notes);
    const Dispatch = useDispatch();
    const [notes, setNotesData] = useState([]);

    const [selectedNote, setSelectedNote] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate()

    useLayoutEffect(()=>{
        if(Notes.length>0){
            setNotesData(Notes)
        }else{
            let data= {
                uid:Basic.uid
            }
            GetNotesByUser(data).then(d=>{
                if(d!=null){
                    Dispatch(setNotes(d.data));
                }else{
                    setNotesData([])
                }
            })
        }
    },[Notes])


    const handleDltNote = (id) => { 
        DeleteNotes(id).then(d=>{
            NotificationManager.success("Deleted")
            let data= {
                uid:Basic.uid
            }
            GetNotesByUser(data).then(d=>{
                if(d!=null){
                    Dispatch(setNotes(d.data));
                }else{
                    setNotesData([])
                }
            })
        })
    };

    const handleEditNote = (id) => {
        navigate(`/edit/${id}`)

    };
    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <th className="font-normal text-left pl-4">Quick Note</th>
                        <th className="font-normal text-left pl-12">Description</th>
                        <th className="font-normal text-left pl-12">Status</th>
                        <th className="font-normal text-left pl-12">Created At</th>
                        <th className="font-normal text-left pl-12">Updated At</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {notes.map((note) => (
                        <tr
                            key={note._id}
                            className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                        >
                            <td className="pl-4 cursor-pointer">
                                <div className="flex items-center">
                                    <div className="w-10 h-10">
                                        <LazyLoadImage
                                            effect="blur"
                                            width="100%"
                                            height="100%"
                                            className="w-full h-full"
                                            src={FILE_URL+note.imgUrl}
                                        />
                                    </div>

                                    <div className="pl-4">
                                        <p className="font-medium">{note.title}</p>
                                        <p className="text-xs leading-3 text-gray-600 pt-2">
                                            {note.cateName}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-7 2xl:px-0 mt-4 flex justify-center items-center">
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
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {STATUS[note.status]}
                                </p>
                            </td>

                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {FormatDate(note.createdAt)}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {FormatDate(note.updatedAt)}
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
                <DialogTitle>{selectedNote && notes.find(note => note._id === selectedNote).title}</DialogTitle>
                <DialogContent>
                    {selectedNote && notes.find(note => note._id === selectedNote).para}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggleDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};



export default MyQuickNotes
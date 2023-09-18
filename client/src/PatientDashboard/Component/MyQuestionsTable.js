import React, { useLayoutEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import { DeleteQuestions, FormatDate, GetQuestionsByUser } from '../../utils/Const';
import { setQuistions } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { NotificationManager } from 'react-notifications';

const status = ["Pending","Confirmed","Rejected"]

const MyQuestionsTable = () => {
    const Basic =  useSelector(state=>state.handleUserBasicData);
    const Questions =  useSelector(state=>state.QandA);
    const Dispatch = useDispatch();
    const [questions, setQuestionsData] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate()

    useLayoutEffect(()=>{
        if(Questions.length>0){
            setQuestionsData(Questions)
        }else{
            let data ={
                uid:Basic.uid
            }
            GetQuestionsByUser(data).then(d=>{
                if(d!=null){
                    Dispatch(setQuistions(d.data));
                }else{
                    setQuestionsData([])
                }
            })
        }
    },[Questions])

    const handleDltNote = (id) => { 
        DeleteQuestions(id).then(d=>{
            if(d!=null){
                NotificationManager.success("Deleted")
                let data ={
                    uid:Basic.uid
                }
                GetQuestionsByUser(data).then(d=>{
                    if(d!=null){
                        Dispatch(setQuistions(d.data));
                    }else{
                        setQuestionsData([])
                    }
                })
            }
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
                        <th className="font-normal text-left pl-8">No.</th>
                        <th className="font-normal text-left pl-8">Question</th>
                        <th className="font-normal text-left pl-12">Category</th>
                        <th className="font-normal text-left pl-12">Status</th>
                        <th className="font-normal text-left pl-12">Created At</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {questions.map((cur,index) => (
                        <tr
                            key={cur._id}
                            className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                        >
                            <td className="pl-8">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    Que {index+1}.
                                </p>
                            </td>
                            <td className="px-0 2xl:px-0 mt-4 flex justify-center items-center">
                                <p className="font-medium">{cur.question.slice(0, 15)}...</p>
                                <Tooltip content="View Description">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => {
                                            setSelectedQuestion(cur._id);
                                            handleToggleDialog();
                                        }}
                                    >
                                        <InfoIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {cur.cateName}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {status[cur.status]}
                                </p>
                            </td>

                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {FormatDate(cur.createdAt)}
                                </p>
                            </td>
                           
                            <td className="px-7 2xl:px-0">
                                <Tooltip content="Edit Que">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => handleEditNote(cur._id)}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Delete Que">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => handleDltNote(cur._id)}
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
                <DialogContent>
                   Q. {selectedQuestion && questions.find(note => note._id === selectedQuestion).question}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggleDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};



export default MyQuestionsTable
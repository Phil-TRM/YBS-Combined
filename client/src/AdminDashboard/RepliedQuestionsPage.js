
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from 'react-router'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { DialogHeader, IconButton, Tooltip } from '@material-tailwind/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/Stop';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useDispatch, useSelector } from "react-redux";
import { DeleteQuestions, FormatDate, GetQuestions, UpdateAnswers, UpdateQuestions } from "../utils/Const";
import { setQuistions } from "../Redux/Actions";
import { NotificationManager } from "react-notifications";

function RepliedQuestionsPage() {
    const Repiled = useSelector(state=>state.QandA);
    const Dispatch =  useDispatch();
    const [questions,setQuestions]=useState([])
    const navigate = useNavigate()

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dayInput, setDayInput] = useState("");
    const [showReplied, setShowReplied] = useState(false); // New state variable for filtering


    useLayoutEffect(()=>{
        if(Repiled.length>0){
            setQuestions(Repiled)
        }else{
            GetQuestions().then(d=>{
                if(d!=null){
                    Dispatch(setQuistions(d.data));
                }
            })
        }
    },[Repiled])

    const handleDltQuestion = (id) => {
        DeleteQuestions(id).then(d=>{
            if(d!=null){
                NotificationManager.success("Deleted");
                GetQuestions().then(d=>{
                    Dispatch(setQuistions(d.data));
                })
            }
        })
    };
    const handleStatusChange = (datas,status) => {
        let data = datas;
        data.isAnsweringEnabled=status;
        UpdateQuestions(data).then(d=>{
            if(d!=null){
                NotificationManager.success("Updated");
                GetQuestions().then(d=>{
                    Dispatch(setQuistions(d.data));
                }) 
            }
        })
    };
    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const toggleAnswerUserVisibility = (selectedQuestion,index) => {
        const selectedQuestionData = questions.find((note) => note._id === selectedQuestion);
        let question = selectedQuestionData.replies[index]
        question.status =0;
        UpdateAnswers(question).then(d=>{
            if(d!=null){
                NotificationManager.success("Updated");
                GetQuestions().then(d=>{
                    Dispatch(setQuistions(d.data));
                }) 
            }
        })
    }

    const handleSaveDay = () => {

        setOpenDialog(false);
    };

    const renderAnswers = () => {
        const selectedQuestionData = questions.find((note) => note._id === selectedQuestion);
        if (selectedQuestionData && selectedQuestionData.replies) {
            return selectedQuestionData.replies.map((answer, index) => (
                <div key={index} className="mb-2">
                    Ans {index + 1}. <p>{answer.answer}</p>
                    <p>By: {answer.userData.name} {answer.createdAt}  </p>
                    <Button variant="contained" sx={{ textTransform: "capitalize", letterSpacing: "1px", fontFamily: "sans-serif" }} size="small" onClick={() => toggleAnswerUserVisibility(selectedQuestion, index)}>
                        {answer.status === 1 ? 'Visibility Off' : 'Visibility On'}
                    </Button>
                </div>
            ));
        }
        return null;
    };

    const filteredQuestions = questions.filter((cur) => {

        if (startDate && endDate) {
            const questionDate = new Date(cur.createdAt);
            const filterStartDate = new Date(startDate);
            const filterEndDate = new Date(endDate);
            return questionDate >= filterStartDate && questionDate <= filterEndDate;
        }
        return true;
    });

    return (
        <>
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Questions</p>
                        <div>


                            <div className="flex items-center space-x-4 mb-4">
                                <input
                                    type="date"
                                    className="border p-2"
                                    id="startDate"
                                    value={startDate || ''}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="border p-2"
                                    id="endDate"
                                    value={endDate || ''}
                                    onChange={(e) => setEndDate(e.target.value)}
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
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Question</th>
                                <th className="font-normal text-left pl-12">Category</th>
                                <th className="font-normal text-left pl-12">Asked By</th>
                                <th className="font-normal text-left pl-12">Created At</th>
                                <th className="font-normal text-left pl-12">Replied By</th>
                                <th className="font-normal text-left pl-12">Status</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {filteredQuestions?.map((cur, index) => (
                                <tr
                                    key={cur._id}
                                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                >

                                    <td className="px-0 2xl:px-0 mt-4 flex justify-center items-center">
                                        <p className="font-medium">{cur.question.slice(0, 25)}...</p>
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
                                            {cur.userData.name}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {FormatDate(cur.createdAt)}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur?.replies?.length > 0 ? `${cur?.replies?.length} Peoples` : 'None'}
                                        </p>
                                    </td>
                                    <td className="pl-12">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {cur.status==1?"On":"Off"}
                                        </p>
                                    </td>



                                    <td className="px-7 2xl:px-0">

                                        <Tooltip content="delete Question">
                                            <IconButton variant="text" color="blue-gray" onClick={() => handleDltQuestion(cur._id)}>
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        {cur.isAnsweringEnabled === true ?
                                            <Tooltip content="Stop answering">
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleStatusChange(cur,false)}>
                                                    <StopIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                            :
                                            <Tooltip content="Continue Answering">
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleStatusChange(cur,true)}>
                                                    <ArrowRightIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Dialog open={isDialogOpen} onClose={handleToggleDialog}>
                        <DialogHeader >
                            Q. {selectedQuestion && questions?.find(note => note._id === selectedQuestion).question}

                        </DialogHeader>
                        <DialogContent>
                            {renderAnswers()}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleToggleDialog}>Close</Button>
                        </DialogActions>


                    </Dialog>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Add Question Asked Limit</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth
                                label="Enter Questions No"
                                variant="outlined"
                                value={dayInput}
                                onChange={(e) => setDayInput(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="In A Month"
                                variant="outlined"
                                value={dayInput}
                                onChange={(e) => setDayInput(e.target.value)}
                                sx={{marginY:"10px"}}
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




export default RepliedQuestionsPage
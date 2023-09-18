import React, { useLayoutEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon } from "@heroicons/react/24/solid";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Import Material-UI components
import InfoIcon from '@mui/icons-material/Info';
import {

    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setQuistions } from '../../Redux/Actions';
import { FormatDate, GetQuestions, UpdateQuestions } from '../../utils/Const';
import { NotificationManager } from 'react-notifications';

const status={
    0:"Pending",
    1:"Confirm",
    2:"Rejected"
}

const AskedQuestionTable = () => {
    const Repiled = useSelector(state=>state.QandA);
    const Dispatch =  useDispatch();
    const [askQuestions,setAskQuestions]=useState([])
    const [show, setShow] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [currentFilter, setCurrentFilter] = useState('all'); // 'all', 'pending', 'confirm', 'rejected'
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const navigate = useNavigate()
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useLayoutEffect(()=>{
        if(Repiled.length>0){
            setAskQuestions(Repiled)
        }else{
            GetQuestions().then(d=>{
                if(d!=null){
                    Dispatch(setQuistions(d.data));
                }
            })
        }
    },[Repiled])

    const handleDltPost = () => {

    }
    const handleRejectPost = (data) => {
        let temp = data;
        temp.status=2;
        UpdateQuestions(temp).then(d=>{
            if(d!=null){
                NotificationManager.success("Rejected")
                GetQuestions().then(d=>{
                    if(d!=null){
                        Dispatch(setQuistions(d.data));
                    }
                })
            }
        })
    }
    const handleConfirmPost = (data) => {
        let temp = data;
        temp.status=1;
        UpdateQuestions(temp).then(d=>{
            if(d!=null){
                NotificationManager.success("Confirmed")
                GetQuestions().then(d=>{
                    if(d!=null){
                        Dispatch(setQuistions(d.data));
                    }
                })
            }
        })
    }
    // Filter and sort posts based on search query, sort order, and current filter
    const filteredPosts = askQuestions.filter((post) =>
        post.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedPosts = filteredPosts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.createdAt.localeCompare(b.createdAt);
        } else {
            return b.createdAt.localeCompare(a.createdAt);
        }
    });

    let displayedPosts = sortedPosts;
    if (currentFilter !== 'all') {
        displayedPosts = sortedPosts.filter(
            (post) => post.status === currentFilter
        );
    }

    // Pagination
    const totalPages = Math.ceil(displayedPosts.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = displayedPosts.slice(startIndex, endIndex);

    const handleFilter = (filter) => {
        setCurrentFilter(filter);
        setCurrentPage(1); // Reset to first page when changing filters
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };


    const handleToggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <div style={{ rowGap: '20px' }} className="flex justify-center md:justify-between items-center flex-wrap mb-4">
                <div className="flex">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === 'all' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } rounded-l-md focus:outline-none`}
                        onClick={() => handleFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === '0' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } focus:outline-none`}
                        onClick={() => handleFilter("0")}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === '1' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } focus:outline-none`}
                        onClick={() => handleFilter("1")}
                    >
                        Confirm
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${currentFilter === '2' ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                            } rounded-r-md focus:outline-none`}
                        onClick={() => handleFilter("2")}
                    >
                        Rejected
                    </button>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts..."
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                    />
                    <button
                        className="ml-2 px-4 py-2 text-sm font-medium bg-[#452a72] text-white rounded-md focus:outline-none"
                        onClick={handleSortOrder}
                    >
                        {sortOrder === 'asc' ? 'Latest' : 'Oldest'}
                    </button>
                </div>
            </div>

            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <th className="font-normal text-left pl-4">Question</th>
                        <th className="font-normal text-left pl-12">User</th>
                        <th className="font-normal text-left pl-12">Status</th>
                        <th className="font-normal text-left pl-12">Category</th>
                        <th className="font-normal text-left pl-12">Created At</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {currentPosts.map((post) => (
                        <tr
                            key={post._id}
                            className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                        >

                            <td className="px-0 2xl:px-0 mt-4 flex justify-center items-center">
                                <p className="font-medium">{post.question.slice(0, 25)}...</p>
                                <Tooltip content="View Description">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => {
                                            setSelectedQuestion(post._id);
                                            handleToggleDialog();
                                        }}
                                    >
                                        <InfoIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.userData.name}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {status[post.status]}
                                </p>
                            </td>

                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.cateName}
                                </p>
                            </td>

                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {FormatDate(post.createdAt)}
                                </p>
                            </td>


                            <td className="px-7 2xl:px-0">

                                {post.status === "0" ?
                                    (
                                        <>
                                            <Tooltip content="reject Post" >
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleRejectPost(post)}>
                                                    <ClearIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Confirm Post">
                                                <IconButton variant="text" color="blue-gray" onClick={() => handleConfirmPost(post)}>
                                                    <DoneIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </>

                                    )
                                    : post.status === "1" && null
                                }

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog open={isDialogOpen} onClose={handleToggleDialog}>
                <DialogContent>
                    Q. {selectedQuestion && askQuestions.find(note => note._id === selectedQuestion).question}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggleDialog}>Close</Button>
                </DialogActions>
            </Dialog>

            <div className="flex justify-center mt-5">
                <div className="flex">
                    <p className='text-[#452a72]'>Total Pages -</p>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${currentPage === index + 1
                                ? 'bg-[#452a72] text-white'
                                : 'text-[#452a72]'
                                }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AskedQuestionTable;

import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { DeleteCategroies, FormatDate } from "../utils/Const";

import {
    IconButton,
    Tooltip,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import AddCat2 from './Components/AddCat2';
import UpdateCat2 from './Components/UpdateCat2';
import { useDispatch, useSelector } from 'react-redux';

const QuickNotesAddCat = () => {
    const MasterData = useSelector(state=>state.handleMasterData);
    const Basic = useSelector(state=>state.handleUserBasicData);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [updateCatId, setUpdateCatId] = useState("");
    const [data, setData] = useState([]);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const Dispatch = useDispatch();

    useLayoutEffect(()=>{
        if(MasterData.categroies!=null){
            let temp = [];
            for (let i = 0; i < MasterData.categroies.length; i++) {
                const element = MasterData.categroies[i];
                if(element.cateType!=null){
                    if(element.cateType=="Notes"){
                        temp.push(element)
                    }
                }
            }
            setData(temp)
        }
    },[MasterData])


    const handleDeleteCategory = (id) => {
        DeleteCategroies(id).then(d=>{
            if(d!=null){
                
            }
        })
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination variables
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleUpdateCategory = (data) => {
        setUpdateCatId(data)
        setOpen2(true)
    }

    return (
        <>
            <AddCat2 open={open} setOpen={setOpen} />
            <UpdateCat2 open={open2} setOpen={setOpen2} data={updateCatId} />
            <div className="w-full px-0 md:px-6 py-2">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#452a72]">Category</p>
                        <div>

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search category..."
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                            />

                            <button onClick={() => setOpen(true)} className="inline-flex text-white sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-[#452a72] hover:bg-transparent border border-[#452a72] hover:text-[#452a72] focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none">Add Category</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">

                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Name</th>
                                <th className="font-normal text-left pl-16">Created At</th>
                                <th className="font-normal text-left pl-16">Updated At</th>
                                <th className="font-normal text-left pl-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {currentItems.map((item) => (
                                <tr
                                    key={item._id}
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
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="pl-4">
                                                <p className="font-medium">{item.name}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="pl-16">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {FormatDate(item.createdAt)}
                                        </p>
                                    </td>
                                    <td className="pl-16">
                                        <p className="text-sm font-medium leading-none text-gray-800">
                                            {FormatDate(item.updatedAt)}
                                        </p>
                                    </td>
                                    <td className="px-7 2xl:px-0">
                                        <Tooltip content="Update Category">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleUpdateCategory(item)}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete Category">
                                            <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={() => handleDeleteCategory(item._id)}
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <nav>
                            <ul className="flex items-center">
                                <p className='text-[#452a72]'>Total Pages -</p>
                                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                                    <li key={index}>
                                        <button
                                            className={`px-3 py-1 text-sm font-medium mx-1 rounded-md focus:outline-none ${index + 1 === currentPage ? 'bg-[#452a72] text-white' : 'text-[#452a72]'
                                                }`}
                                            onClick={() => paginate(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    );
};

export default QuickNotesAddCat;


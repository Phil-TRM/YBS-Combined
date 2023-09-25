import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon } from "@heroicons/react/24/solid";

import {
    IconButton,
    Tooltip,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { HANDLE_CATEGORIES, JSON_HEADER, Masterhandler } from '../../utils/Const';
import { setMasterData, setPosts } from '../../Redux/Actions';

const CategoryTable = () => {
    const MasterData = useSelector(state=>state.handleMasterData);
    const Basic = useSelector(state=>state.handleUserBasicData);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [data,setData] = useState(new Array());

    const Dispatch = useDispatch();
    useLayoutEffect(()=>{
        if(MasterData.categroies!=null){
            let temp = [];
            for (let i = 0; i < MasterData.categroies.length; i++) {
                const element = MasterData.categroies[i];
                if(element.cateType==null){
                    temp.push(element)
                }
            }
            setData(temp)
        }
    },[MasterData])

    const handleDeleteCategory = (id) => {
       let data ={
        _id:id
       }
       fetch(HANDLE_CATEGORIES,{
        method:"DELETE",
        headers:JSON_HEADER,
        body:JSON.stringify(data)
       }).then(res=>{
            if(res.ok){
                let data ={
                    _id:Basic.uid,
                    userType:Basic.userType
                  }
                  fetch(Masterhandler,{
                    method:"POST",
                    headers:JSON_HEADER,
                    body:JSON.stringify(data)
                  }).then(res=>{
                    if(res.ok){
                      res.json().then(D=>{
                        Dispatch(setPosts(D.posts))
                        Dispatch(setMasterData(D));
                      })
                    }
                  })
            }
       })
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };
    // Filter categories based on search query
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination variables
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate=(string)=>{
        return moment(string).format('DD MMM, YYYY');
    }

    return (
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <div className="flex justify-end mb-4">

                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search category..."
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#452a72] focus:border-[#452a72]"
                />
            </div>
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <th className="font-normal text-left pl-4">Name</th>
                        <th className="font-normal text-left pl-8">Parent</th>
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
                                            src={'https://cdn.tuk.dev/assets/templates/olympus/projects.png'}
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="pl-4">
                                        <p className="font-medium">{item.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-4 cursor-pointer">
                                <div className="flex items-center">
                                    <div className="pl-4">
                                        <p className="font-medium">{item.pname}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-16">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {formatDate(item.createdAt)}
                                </p>
                            </td>
                            <td className="pl-16">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {formatDate(item.updatedAt)}
                                </p>
                            </td>
                            <td className="px-7 2xl:px-0">
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
    );
};

export default CategoryTable;

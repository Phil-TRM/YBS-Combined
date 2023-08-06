import React, { useEffect, useLayoutEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import { useSelector ,useDispatch} from 'react-redux';
import { FILE_URL, GET_POST_BY_USER_ID, JSON_HEADER, POST_HANDLER } from '../../utils/Const';
import moment from 'moment';
import { setUserPosts } from '../../Redux/Actions';
import { createSearchParams } from 'react-router-dom';

const status={
    0:"Pending",
    1:"Confirmed",
    3:"Rejected"
}

const PostTable = () => {
   
    const UserPosts =  useSelector(state=>state.handleUserPosts);
    const [show, setShow] = useState(null);
    const [posts,setPosts]=useState(new Array())
    const BasicData =  useSelector(state=>state.handleUserBasicData)
    const navigate = useNavigate()
    const Dispatch =useDispatch();

    useLayoutEffect(()=>{
        if(UserPosts!=null){
            setPosts(UserPosts)
        }
        
    },[UserPosts])

    const handleDltPost = (id) => { 
        let data ={
            _id:id
        }

        fetch(POST_HANDLER,{
            method:"DELETE",
            headers:JSON_HEADER,
            body:JSON.stringify(data)
        }).then(res=>{
            if(res.ok){
                let d ={
                    uid:BasicData.uid
                }
                fetch(GET_POST_BY_USER_ID,{
                    method:"POST",
                    headers:JSON_HEADER,
                    body:JSON.stringify(d)
                }).then((res)=>{
                    if(res.ok){
                        res.json().then(ds=>{
                            let data = ds.data;
                            Dispatch(setUserPosts(data))
                        })
                    }
                })
            }
        })
    };

    const handleEditPost = (id) => {
        navigate({
            pathname:`edit`,
            search:createSearchParams({
                id:id
            }).toString()
        })

    };

    const formatDate=(string)=>{
        return moment(string).format('DD MMM, YYYY');
     }
     
    return (
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <th className="font-normal text-left pl-4">Posts</th>
                        <th className="font-normal text-left pl-12">Status</th>
                        <th className="font-normal text-left pl-12">Description</th>
                        <th className="font-normal text-left pl-12">Created At</th>
                        <th className="font-normal text-left pl-12">Updated At</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {posts.length>0?posts.map((post) => (
                        <tr
                            key={post._id}
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
                                            src={FILE_URL+post.image1Url}
                                        />
                                    </div>
                                    <div className="pl-4">
                                        <p className="font-medium">{post.title}</p>
                                        <p className="text-xs leading-3 text-gray-600 pt-2">
                                            {post.categoriesName}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {status[post.status]}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.description.slice(0,20)}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {formatDate(post.createdAt)}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {formatDate(post.updatedAt)}
                                </p>
                            </td>
                            <td className="px-7 2xl:px-0">
                                <Tooltip content="Edit Post">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => handleEditPost(post._id)}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Delete Post">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => handleDltPost(post._id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    )):null}
                </tbody>
            </table>
        </div>
    );
};

export default PostTable;

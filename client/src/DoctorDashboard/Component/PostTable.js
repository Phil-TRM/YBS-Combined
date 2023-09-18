import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { IconButton, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router';

const PostTable = () => {
    const [show, setShow] = useState(null);
    const navigate = useNavigate()

    const handleDltPost = () => { };

    const handleEditPost = (id) => {
        navigate(`${id}/edit`)

    };

    // Array of post data
    const posts = [
        {
            id: 1,
            imageSrc: 'https://cdn.tuk.dev/assets/templates/olympus/projects.png',
            title: 'UX Design & Visual Strategy',
            category: 'Category 1',
            status: 'Pending',
            description: 'Heart disease a...',
            createdAt: '20/03/23',
            updatedAt: '23/03/23',
        },
        {
            id: 2,
            imageSrc: 'https://cdn.tuk.dev/assets/templates/olympus/projects(1).png',
            title: 'Title',
            category: 'Category 2',
            status: 'Confirmed',
            description: 'In this world tod...',
            createdAt: '20/03/23',
            updatedAt: '23/03/23',
        },
        {
            id: 3,
            imageSrc: 'https://cdn.tuk.dev/assets/templates/olympus/projects(1).png',
            title: 'Title',
            category: 'Category 2',
            status: 'Rejected',
            description: 'In this world tod...',
            createdAt: '20/03/23',
            updatedAt: '23/03/23',
        },
        // Add more post objects as needed
    ];

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
                    {posts.map((post) => (
                        <tr
                            key={post.id}
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
                                            src={post.imageSrc}
                                        />
                                    </div>
                                    <div className="pl-4">
                                        <p className="font-medium">{post.title}</p>
                                        <p className="text-xs leading-3 text-gray-600 pt-2">
                                            {post.category}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.status}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.description}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.createdAt}
                                </p>
                            </td>
                            <td className="pl-12">
                                <p className="text-sm font-medium leading-none text-gray-800">
                                    {post.updatedAt}
                                </p>
                            </td>
                            <td className="px-7 2xl:px-0">
                                <Tooltip content="Edit Post">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => handleEditPost(post.id)}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Delete Post">
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                        onClick={() => handleDltPost(post.id)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostTable;

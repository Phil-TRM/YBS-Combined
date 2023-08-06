import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Input, TextField } from '@mui/material';
import { Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { HANDLE_CATEGORIES, JSON_HEADER, Masterhandler } from '../../utils/Const';
import { setMasterData, setPosts } from '../../Redux/Actions';
import { NotificationManager } from 'react-notifications';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, color: "#452a72" }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: "#452a72",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AddCat({ open, setOpen }) {
    const [category, setCategory] = useState("");
    const [selectedParent, setSelectedParent] = useState("");
    const [pid, setpid] = useState(null);
    const MasterData = useSelector(state=>state.handleMasterData);
    const Basic = useSelector(state=>state.handleUserBasicData);
    const [data,setData] = useState(new Array());
    const [isExisted,setExisted] = useState(false);
    const Dispatch =useDispatch();
    useLayoutEffect(()=>{
        if(MasterData.categroies!=null){
            let arr = new Array();
            for (let i = 0; i < MasterData.categroies.length; i++) {
                const element = MasterData.categroies[i];
                if(element.pid==null){
                    arr.push(element)
                }
            }
            setData(arr)
        }
    },[MasterData,open])

    useEffect(()=>{
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if(element.name.toLowerCase()==category.toLowerCase()){
                setExisted(true)
            }else{
                setExisted(false);
            }
            
        }
    },[category])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isExisted){
            NotificationManager.error("This category already exists")
            return
        }
        let data ;
        if(pid!=null){
            data = {
                name:category,
                pid:pid
            }
        }else{
            data = {
                name:category,
            }
        }
        fetch(HANDLE_CATEGORIES,{
            method:"POST",
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
                        setOpen(false)
                        setCategory("")
                        setSelectedParent("")
                        setpid(null)
                      })
                    }
                  })
            }
        })
       
    };

    const handleParentSelect = (e) => {
        setSelectedParent(e.target.value);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if(element.name==e.target.value){
                setpid(element._id)
            }
            
        }
    };

    return (
        <div>
            <BootstrapDialog
                sx={{ zIndex: "11000" }}
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                    Add Category
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers className='grid grid-row-1 gap-6'>
                        <div>
                            <input required placeholder='Category Name' type="text" className="w-full p-3  border border-gray-300 rounded outline-none focus:bg-gray-50" value={category} onChange={(e) => setCategory(e.target.value)} />
                            <div className="w-72 mt-5 relative zIndex-1000">
                                <select
                                    className="w-full p-3 cursor-pointer border border-gray-300 rounded outline-none focus:bg-gray-50"
                                    value={selectedParent}
                                    onChange={handleParentSelect}
                                >
                                    <option defaultValue={""}>Select Parent</option>
                                    {data.map((item)=>{
                                        return <option key={item._id} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type='submit' className="bg-[#452a72] font-medium transition duration-150 ease-in-out hover:bg-transparent rounded text-white hover:text-[#452a72] px-6 py-2 text-sm border border-[#452a72]  focus:outline-none">Add</button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}

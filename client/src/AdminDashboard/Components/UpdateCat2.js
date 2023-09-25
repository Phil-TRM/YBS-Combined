import React, { useEffect, useState } from 'react';
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
import { GetMasterData, UpdateCategroies } from '../../utils/Const';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { setMasterData } from '../../Redux/Actions';

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

export default function UpdateCat2({ open, setOpen,data }) {
    const Basic = useSelector(state=>state.handleUserBasicData);
    const Dispatch =  useDispatch();
    const [category, setCategory] = useState("");

    useEffect(()=>{
        if(data!=null){
            setCategory(data.name);
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = data;
        temp.name=category
        UpdateCategroies(temp).then(async d=>{
            if(d!=null){
                
                let data = {
                    _id: Basic.uid,
                    userType: Basic.userType,
                  };
                  await GetMasterData(data).then(D=>{
                      if(D!=null){
                          Dispatch(setMasterData(D));
                      }
                  })
                setOpen(false)
            }
        })
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
                    Update Category
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers className='grid grid-row-1 gap-6'>
                        <div>
                            <input required placeholder='Category Name' type="text" className="w-full p-3  border border-gray-300 rounded outline-none focus:bg-gray-50" value={category} onChange={(e) => setCategory(e.target.value)} />
                            
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button type='submit' className="bg-[#452a72] font-medium transition duration-150 ease-in-out hover:bg-transparent rounded text-white hover:text-[#452a72] px-6 py-2 text-sm border border-[#452a72]  focus:outline-none">Update</button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}

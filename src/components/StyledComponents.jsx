import React from 'react'
import { Divider, Button, Tooltip, Zoom, Box } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import styled from "styled-components";


export const StyledButton = (props) => {
    return (
        <Button
            variant="contained"
            size={props.size ? props.size : ''}
            sx={{
                mt: 3, mr: 1, mb: 2, backgroundColor: 'rgb(59, 96, 100)', "&:hover": {
                    backgroundColor: 'rgb(85, 130, 139)'
                },
            }}
            onClick={() => props.onClick ? props.onClick() : props.setOpenForm(!props.openForm)}
        > {props.text}</Button>
    )
}

export const StyledSubmitButton = (props) => {
    return (
        <Button
            variant="contained"
            type='submit'
            sx={{
                mt: 3,
                mr: 1,
                mb: 2,
                backgroundColor: 'rgb(59, 96, 100)',
                "&:hover": {
                    backgroundColor: 'rgb(85, 130, 139)'
                },

            }}
            onClick={() => props.onClick}
        > {props.text}</Button>
    )
}


export const StyledDivider = () => {
    return (
        <Divider
            orientation='vertical'
            sx={{
                backgroundColor: 'rgb(82, 121, 111)',
                height: '70vh',
                borderRightWidth: 4,
                borderTopLeftRadius: '3px',
                borderTopRightRadius: '3px',
                display: { xs: 'none', lg: 'block' }
            }} />
    )
}


export const DeleteIcon = (props) => {
    return (
        <Tooltip TransitionComponent={Zoom} title="Delete" placement={props.tooltip}>
            <Button onClick={props.onClick} >
                <DeleteOutlineOutlinedIcon
                    sx={{
                        borderRadius: '10px',
                        fontSize: props.size ? props.size : "35px",
                        backgroundColor: 'rgb(53, 79, 82)',
                        color: 'white'
                    }} />
            </Button>
        </Tooltip>
    )
}

export const EditIconButton = (props) => {
    return (
        <Tooltip TransitionComponent={Zoom} title="Edit" placement={props.tooltip}>
            <Button onClick={props.onClick} >
                <DriveFileRenameOutlineOutlinedIcon
                    sx={{
                        borderRadius: '10px',
                        fontSize: props.size ? props.size : "35px",
                        backgroundColor: 'rgb(53, 79, 82)',
                        color: 'white'
                    }} />
            </Button>
        </Tooltip>
    )
}





export const SLinkNotification = styled.div`
font-size: 16px;
padding: 4px 8px;
border-radius: 50%;
background: red;
color: white;
`

export const SBox = styled(Box)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: left;
height: 50px; 
transition: width 800ms;
`
import { Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { StyledButton } from './StyledComponents'
import DropDownFilterMenu from './DropDownFilterMenu'

export const ItemContainer = ({ children, ...props }) => {
    return (
        <>
            <Typography
                variant='h4'
                sx={{
                    textAlign: 'center',
                    borderRadius: '5px',
                    marginBottom: '30px',
                    marginTop: '30px',
                    backgroundColor: 'rgba(132, 169, 140, 0.5)',
                    color: 'rgb(53, 79, 82)'
                }}>
                {props.containerName}
            </Typography>
            {props.text && <SButtonContainer> <StyledButton {...props} /> {props.containerName !== "Workshop Items" && <DropDownFilterMenu {...props} />}</SButtonContainer>}

            <SContainer>{children}</SContainer>
        </>
    )
}

const SContainer = styled.div`
display: flex;
flex-direction: column;
align-items:center;
width: 350px;
height: 70vh;
overflow-y: scroll;
background-color: rgba(132, 169, 140, 0.5);
border-radius: 5px;

`

const SButtonContainer = styled.div`
display: flex;
flex-direction; row;
`

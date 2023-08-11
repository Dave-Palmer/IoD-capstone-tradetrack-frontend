import { Typography } from '@mui/material'
import React from 'react'
import { useProSidebar } from 'react-pro-sidebar';
import { SBox } from '../StyledComponents';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';



export const Header = ({ page }) => {
    const { collapseSidebar, toggleSidebar} = useProSidebar();
    return (
        <SBox sx={{ width: "100%"}} >
            <MenuRoundedIcon
                onClick={() => { collapseSidebar(); toggleSidebar() }}
                sx={{
                    fontSize: 40,
                    color: 'rgb(59, 96, 100)'
                }}
            />
            <Typography sx={{ fontFamily: 'Roboto' }} ml='30px' color='rgb(59, 96, 100)' variant='h4' >{page}</Typography>
        </SBox>
    )
}

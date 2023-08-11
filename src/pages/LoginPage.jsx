import React, { useContext, useEffect } from 'react'
import LoginForm from '../components/Forms/LoginForm'
import { Box } from '@mui/material'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        if (currentUser.firstName && currentUser.admin) { navigate('/home') }
        else if (currentUser.firstName && !currentUser.admin) { navigate('/dashboard') }
    })

    return (

        <Box
            sx={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(135, 187, 162)',
            }}>
            <LoginForm />
        </Box>

    )
}


export default LoginPage
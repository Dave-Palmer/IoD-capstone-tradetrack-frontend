import React, { useContext, useEffect } from 'react'
import { Header } from '../components/SideBar/Header'
import { AlertsContext } from '../context/alertsContext'
import axios from 'axios'
import { Box, Typography } from '@mui/material'
import { UserContext } from '../context/userContext'


const HomePage = () => {
    const { currentUser } = useContext(UserContext)
    const { alerts, setAlerts } = React.useContext(AlertsContext)
    let itemAlerts = 0
    let vehicleAlerts = 0

    const alertsCounter = (data) => {
        let numOfAlerts = data.filter((item) => item.alert === true).length
        return numOfAlerts
    }

    useEffect(() => {
        axios('/items')
            .then(response => { itemAlerts = alertsCounter(response.data.data) })
            .then(axios('/vehicles')
                .then(response => { vehicleAlerts = alertsCounter(response.data.data) })
                .finally(() => setAlerts(itemAlerts + vehicleAlerts))
                .catch(e => console.log(e)))
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <Header page='Home Page' />
            <div className='alerts-display-box'>
                <Typography color='rgb(59, 96, 100)' variant='h2'>Welcome back {currentUser.firstName}!</Typography>
                <Typography color='rgb(59, 96, 100)' mt="50px" variant='h4'>Today you have {alerts ? alerts : 'no'} {alerts >= 2 || !alerts ? 'alerts' : 'alert'} </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 200,
                            height: 200,
                        },
                    }}
                >
                </Box>

            </div>
        </>
    )
}

export default HomePage
import React, { useEffect, useState, useContext } from 'react'
import { Header } from '../components/SideBar/Header'
import { ItemContainer } from '../components/ItemContainer'
import { Grid } from '@mui/material'
import ToolItem from '../components/ItemCards/ToolItem'
import VehicleItem from '../components/ItemCards/VehicleItem'
import MessageDialog from '../components/Forms/MessageDialog'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { StyledDivider } from '../components/StyledComponents'


const StaffDashboardPage = () => {
    const [userItems, setUserItems] = useState([])
    const [vehicle, setVehicle] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [message, setMessage] = useState('')
    const { currentUser } = useContext(UserContext)
    const user = `${currentUser.firstName} ${currentUser.lastName}`



    useEffect(() => {
        axios('/items')
            .then(response => setUserItems(response.data.data))
            .catch((e) => console.log(e))
        axios('/vehicles')
            .then(response => setVehicle(response.data.data.filter(vehicle => vehicle.assignedTo === user)))
            .catch((e) => console.log(e))
        console.log('Staff Dashboard useEffect')
    }, [openDialog])

    return (
        <>
            <Header page="Dashboard" />
            <MessageDialog setOpenDialog={setOpenDialog} openDialog={openDialog} message={message} />
            <Grid height={'calc(100% - 50px)'} container justifyContent={'space-evenly'} alignItems={'flex-end'}>
                <Grid>
                    <ItemContainer containerName="Your Items">

                        {userItems.filter(item => item.assignedTo === user).map(item =>
                            <ToolItem
                                key={item._id}
                                userType='staff'
                                {...item}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                                user={user}
                            />
                        )}
                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer containerName="Your Vehicle">
                        {vehicle.map(vehicle =>
                            <VehicleItem
                                key={vehicle._id}
                                userType='staff'
                                {...vehicle}
                                setMessage={setMessage}
                                openDialog={openDialog}
                                setOpenDialog={setOpenDialog}
                            />
                        )}
                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer containerName="Borrowed Items">
                        {userItems.filter(item => item.lentTo === user).map((item =>
                            <ToolItem
                                key={item._id}
                                userType='staff'
                                {...item}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                                user={user}
                            />))}
                    </ItemContainer>
                </Grid>
            </Grid>

        </>
    )
}

export default StaffDashboardPage
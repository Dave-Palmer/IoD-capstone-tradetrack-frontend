import React, { useState, useEffect } from 'react'
import { Header } from '../components/SideBar/Header'
import { ItemContainer } from '../components/ItemContainer'
import { Grid } from '@mui/material'
import ToolItem from '../components/ItemCards/ToolItem'
import VehicleItem from '../components/ItemCards/VehicleItem'
import axios from 'axios'
import MessageDialog from '../components/Forms/MessageDialog'
import { StyledDivider } from '../components/StyledComponents'


const AlertsPage = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [message, setMessage] = useState('')
    const [items, setItems] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [updateOdo, setUpdateOdo] = useState(0)



    useEffect(() => {
        axios('/items')
            .then(response => { setItems(response.data.data.filter((item) => item.alert === true)) })
            .catch((e) => console.log(e))
        axios('/vehicles')
            .then(response => { setVehicles(response.data.data.filter((vehicle) => vehicle.alert === true)) })
            .catch((e) => console.log(e))

    }, [openDialog])

    return (
        <>
            <Header page="Alerts Page" />
            <MessageDialog
                message={message}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
            />
            <Grid height={'calc(100% - 50px)'} container justifyContent={'space-evenly'} alignItems={'flex-end'}>
                <Grid>
                    <ItemContainer containerName="Staff Items">
                        {items.filter(item => item.assignedTo != 'workshop').map(item =>
                            <ToolItem
                                key={item._id}
                                userType='admin'
                                {...item}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                            />
                        )}
                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer containerName="Workshop Items">
                        {items && items.filter(item => item.assignedTo === 'workshop').map(item =>
                            <ToolItem
                                key={item._id}
                                userType='admin'
                                {...item}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                            />
                        )}
                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer containerName="Vehicles">
                        {vehicles.map(vehicle =>
                            <VehicleItem
                                key={vehicle._id}
                                {...vehicle}
                                userType='admin'
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                                updateOdo={updateOdo}
                                setUpdateOdo={setUpdateOdo}
                            />
                        )}
                    </ItemContainer>
                </Grid>
            </Grid>

        </>
    )
}
export default AlertsPage
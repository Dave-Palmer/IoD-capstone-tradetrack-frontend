import { useState, useEffect, useContext } from 'react'
import { Header } from '../components/SideBar/Header'
import { ItemContainer } from '../components/ItemContainer'
import { Grid } from '@mui/material'
import AdminToolItem from '../components/ItemCards/AdminToolItem'
import AdminVehicleItem from '../components/ItemCards/AdminVehicleItem'
import ItemFormDialog from '../components/Forms/ItemForm'
import VehicleFormDialog from '../components/Forms/VehicleForm'
import MessageDialog from '../components/Forms/MessageDialog'
import axios from 'axios'
import { StyledDivider } from '../components/StyledComponents'
import { UserContext } from '../context/userContext'



const InventoryPage = () => {
    const [allItems, setAllItems] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [message, setMessage] = useState('')
    const [openItemForm, setOpenItemForm] = useState(false)
    const [openWorkshopForm, setOpenWorkshopForm] = useState(false)
    const [openVehicleForm, setOpenVehicleForm] = useState(false)
    const [userFilter, setUserFilter] = useState('')
    const [vehicleUserFilter, setVehicleUserFilter] = useState('')
    const [userNames, setUserNames] = useState([])
    const { currentUser } = useContext(UserContext)


    useEffect(() => {
        axios("/items")
            .then((response) => setAllItems(response.data.data))
            .catch((e) => console.log(e))

        axios("/vehicles")
            .then((response) => setVehicles(response.data.data))
            .catch((e) => console.log(e))
    }, [openDialog]) // this is the dialog that displays everytime an item or vehicle is added, edited, or deleted

    //this gets all the user names of the current users in the database and stores them in an array to pass down as a prop to components
    useEffect(() => {
        axios("/users/usernames", { headers: { 'x-access-token': currentUser.token } })
            .then(response => setUserNames(response.data.data))
            .catch(e => console.log(e))

    }, [])

    return (
        <>
            <Header page="Inventory Page" />
            <Grid
                height={'calc(100% - 50px)'}
                container
                justifyContent={{ xs: 'center', sm: 'space-between', lg: 'space-evenly' }}
                alignItems={'flex-end'}>

                <Grid>
                    <MessageDialog
                        setOpenDialog={setOpenDialog}
                        openDialog={openDialog}
                        message={message} />

                    <ItemContainer
                        text='Add Item'
                        containerName="Staff Items"
                        openForm={openItemForm}
                        setOpenForm={setOpenItemForm}
                        setUserFilter={setUserFilter}
                        userNames={userNames}  //passing all the usenames for the dropdown filter staff menu
                    >
                        <ItemFormDialog
                            new={true}
                            setOpenDialog={setOpenDialog}
                            setMessage={setMessage}
                            openForm={openItemForm}
                            setOpenForm={setOpenItemForm}
                            userNames={userNames}
                        />
                        {/* User filter from dropdown select in Item container */}
                        {allItems.filter(item => userFilter ? item.assignedTo === userFilter : item.assignedTo !== 'workshop').map((item) =>
                            <AdminToolItem
                                key={item._id}
                                {...item}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                                userNames={userNames}
                            />
                        )}

                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer
                        openForm={openWorkshopForm}
                        setOpenForm={setOpenWorkshopForm}
                        text='Add Item'
                        containerName="Workshop Items"
                    >
                        <ItemFormDialog
                            workshop={true}
                            new={true}
                            setOpenDialog={setOpenDialog}
                            setMessage={setMessage}
                            openForm={openWorkshopForm}
                            setOpenForm={setOpenWorkshopForm}
                            assignedTo={'workshop'}
                        />
                        {allItems.filter((item) => item.assignedTo === 'workshop').map((item) =>
                            <AdminToolItem
                                workshop={true}
                                key={item._id}
                                {...item}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                            />
                        )}
                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer
                        text="Add Vehicle"
                        containerName="Vehicles"
                        openForm={openVehicleForm}
                        setOpenForm={setOpenVehicleForm}
                        setUserFilter={setVehicleUserFilter}
                        userNames={userNames}
                    >
                        <VehicleFormDialog
                            new={true}
                            setMessage={setMessage}
                            setOpenDialog={setOpenDialog}
                            openForm={openVehicleForm}
                            setOpenForm={setOpenVehicleForm}
                            userNames={userNames}
                        />
                        {vehicles.filter((vehicle) => vehicleUserFilter ? vehicle.assignedTo === vehicleUserFilter : vehicle.assignedTo !== '').map((vehicle) =>
                            <AdminVehicleItem
                                key={vehicle._id}
                                {...vehicle}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                                userNames={userNames}
                            />
                        )}
                    </ItemContainer>
                </Grid>
            </Grid>

        </>
    )
}

export default InventoryPage
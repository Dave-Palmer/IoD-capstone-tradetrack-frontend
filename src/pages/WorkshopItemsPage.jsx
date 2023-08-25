import { useState, useContext, useEffect } from 'react'
import { Header } from '../components/SideBar/Header'
import { ItemContainer } from '../components/ItemContainer'
import { Grid } from '@mui/material'
import ToolItem from '../components/ItemCards/ToolItem'
import MessageDialog from '../components/Forms/MessageDialog'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { StyledDivider } from '../components/StyledComponents'

const WorkshopItemsPage = () => {
    const [workshopItems, setWorkshopItems] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [message, setMessage] = useState('')
    const { currentUser } = useContext(UserContext)
    const user = `${currentUser.firstName} ${currentUser.lastName}`

    useEffect(() => {
        axios('/items')
            .then(response => setWorkshopItems(response.data.data.filter(item => item.assignedTo === 'workshop')))
            .catch(e => console.log(e.message))
    }, [openDialog])


    return (
        <>
            <Header page="Inventory Page" />
            <MessageDialog openDialog={openDialog} setOpenDialog={setOpenDialog} message={message} />
            <Grid height={'calc(100% - 50px)'} container justifyContent={'space-evenly'} alignItems={'flex-end'}>
                <Grid>
                    <ItemContainer containerName="Workshop Items">
                        {workshopItems.filter(item => item.lent === false).map(item =>
                            <ToolItem
                                key={item._id}
                                {...item}
                                user={user}
                                workshopItem={true}
                                setMessage={setMessage}
                                setOpenDialog={setOpenDialog}
                            />
                        )}
                    </ItemContainer>
                </Grid>
                <StyledDivider />
                <Grid>
                    <ItemContainer containerName="Unavailable Items">
                        {workshopItems.filter(item => item.lent === true).map(item =>
                            <ToolItem
                                key={item._id}
                                {...item}
                            />
                        )}
                    </ItemContainer>
                </Grid>
            </Grid>

        </>
    )
}

export default WorkshopItemsPage
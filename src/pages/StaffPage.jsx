import React, { useContext, useEffect } from 'react'
import { Header } from '../components/SideBar/Header'
import { Box } from '@mui/material'
import styled from 'styled-components'
import MessageDialog from '../components/Forms/MessageDialog'
import StaffFormDialog from '../components/Forms/StaffForm'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { StaffCard } from '../components/StaffCard'


const StaffPage = () => {
    const [users, setUsers] = React.useState([])
    const [openDialog, setOpenDialog] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        axios.get("/users", { headers: { 'x-access-token': currentUser.token } })
            .then(response => setUsers(response.data.data))
            .catch(e => console.log(e.message))
    }, [openDialog])


    return (
        <>

            <Header page='Staff Page' />
            <MessageDialog setOpenDialog={setOpenDialog} openDialog={openDialog} message={message} />
            <SBox>
                <StaffFormDialog currentUser={currentUser} new={true} setMessage={setMessage} openDialog={openDialog} setOpenDialog={setOpenDialog} />
            </SBox>
            <section>
                {users.map((user) =>
                    <StaffCard
                        key={user._id}
                        _id={user._id}
                        currentUser={currentUser}
                        setOpenDialog={setOpenDialog}
                        setMessage={setMessage}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        email={user.email}
                        password={user.password}
                        phone={user.phone}
                    />
                )}
            </section>
        </>
    )
}

export default StaffPage

const SBox = styled(Box)`
display: flex;
justify-content: center;
align-items: center;
margin: 1.5em;
`
import React from 'react'
import styled from 'styled-components'
import { Box, Button, Divider, Typography } from '@mui/material'
import AvatarStaffCard from './AvatarStaffCard';
import StaffFormDialog from './Forms/StaffForm';
import DeleteDialog from './Forms/DeleteDialog';
import axios from "axios"
import { DeleteIcon } from './StyledComponents';

export const StaffCard = ({ _id, firstName, lastName, email, phone, password, setMessage, setOpenDialog, currentUser }) => {

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
    let id = _id
    const handleDelete = () => {
        axios.delete('/users/' + id, { headers: { 'x-access-token': currentUser.token } })
            .then(response => console.log(response))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <SBox>
            <SAvatarBox>
                <AvatarStaffCard name={firstName + " " + lastName} />
            </SAvatarBox>
            <SInfoBox>
                <Typography variant='overline'>First Name</Typography>
                <Divider sx={{ backgroundColor: 'grey', width: '100%' }} />
                <Typography variant='subtitle1'>{firstName}</Typography>
            </SInfoBox>
            <SInfoBox>
                <Typography variant='overline'>Last Name</Typography>
                <Divider sx={{ backgroundColor: 'grey', width: '100%' }} />
                <Typography variant='subtitle1'>{lastName}</Typography>
            </SInfoBox>
            <SInfoBox>
                <Typography variant='overline'>Email</Typography>
                <Divider sx={{ backgroundColor: 'grey', width: '100%' }} />
                <Typography variant='subtitle1'>{email}</Typography>
            </SInfoBox>
            <SInfoBox>
                <Typography variant='overline'>Phone</Typography>
                <Divider sx={{ backgroundColor: 'grey', width: '100%' }} />
                <Typography variant='subtitle1'>{phone}</Typography>
            </SInfoBox>
            <SButtonBox>
                <StaffFormDialog
                    id={_id}
                    edit={true}
                    currentUser={currentUser}
                    setMessage={setMessage}
                    setOpenDialog={setOpenDialog}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    password={password}
                    phone={phone}
                />
                <DeleteIcon tooltip='right' onClick={() => setOpenDeleteDialog(true)} />
                <DeleteDialog
                    message={'Are you sure you want to delete ' + firstName + '?'}
                    handleDelete={handleDelete}
                    openDeleteDialog={openDeleteDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                    setMessage={setMessage}
                    setOpenDialog={setOpenDialog}
                    name={firstName}
                />

            </SButtonBox>
        </SBox>
    )
}



const SBox = styled(Box)`
display: flex;
flex-direction: row;
// justify-content: space-between;
align-items: center;
width: auto;
border-radius: 5px;
// height: 100px;
background-color: white;
margin: 10px 10px 10px 3px;
@media (max-width: 1336px) {
    flex-direction: column;
    width: 300px;
  }
`

const SAvatarBox = styled(Box)`
display: flex;
justify-content: center;
align-items: center;
width: 150px;
`

const SInfoBox = styled(Box)`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width: 150px;
`
const SButtonBox = styled(Box)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100px;

`


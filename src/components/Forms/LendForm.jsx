import { useContext, useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, Select, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { UserContext } from '../../context/userContext';
import { StyledButton, StyledSubmitButton } from '../StyledComponents';
import axios from 'axios';


export default function LendFormDialog(props) {
    let id = props._id

    const [staffRecipient, setStaffRecipient] = useState('')
    const [userNames, setUserNames] = useState([])
    const [open, setOpen] = useState(false);
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        axios('/users/usernames', { headers: { 'x-access-token': currentUser.token } })
            .then(response => setUserNames(response.data.data),)
            .catch(e => console.log(e.message))
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleRespone = (response) => {
        handleClose();
        let message;
        if (response.data) { message = `Item lent to ${staffRecipient}` }
        else { message = response }
        props.setMessage(message);
        props.setOpenDialog(true)
        console.log(response)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`/items/${id}`, { lentTo: staffRecipient, lent: true })
            .then(response => { handleRespone(response) })
            .catch(e => { handleRespone(e.message) })
    }

    return (
        <div>
            <StyledButton text='Lend' onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Lend To</DialogTitle>

                <DialogContent>
                    <Box minWidth='300px' component="form" onSubmit={handleSubmit}>
                        <InputLabel id="assignedTo">Lend To</InputLabel>
                        <Select
                            variant="standard"
                            labelId="lentTo"
                            id="lentTo"
                            value={staffRecipient}
                            onChange={(e) => setStaffRecipient(e.target.value)}
                            label="lentTo"
                            fullWidth
                            required
                        >
                            {userNames.filter(user => user.firstName !== currentUser.firstName).map((user) =>
                                <MenuItem key={user.lastName} value={user.firstName + ' ' + user.lastName}>{user.firstName} {user.lastName}</MenuItem>
                            )}
                        </Select>
                        <StyledSubmitButton text='submit' />
                        <StyledButton text='cancel' onClick={handleClose} />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
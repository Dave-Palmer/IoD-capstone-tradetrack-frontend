import { useState } from 'react';
import { Box, DialogTitle, Dialog, DialogContent, TextField } from '@mui/material';
import { StyledButton, StyledSubmitButton, EditIconButton } from '../StyledComponents';
import axios from 'axios';

// This component is used to add/edit staff in the database

export default function StaffFormDialog(props) {
    let userId = props.id
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState(props.firstName ? props.firstName : '')
    const [lastName, setLastName] = useState(props.lastName ? props.lastName : '')
    const [email, setEmail] = useState(props.email ? props.email : '')
    const [password, setPassword] = useState(props.password ? props.password : '')
    const [phone, setPhone] = useState(props.phone ? props.phone : '')

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleRespone = (response) => {
        handleClose();
        let message;
        if (response.data && props.new) { message = `Successfully added ${firstName}` }
        else if (response.data && props.edit) { message = `Successfully updated ${firstName}` }
        else { message = response }
        props.setMessage(message);
        clearStates();
        props.setOpenDialog(true)
    }

    const handleSubmitNew = (e) => {
        e.preventDefault()
        // let newUser = { firstName: firstName, lastName: lastName, email: email, password: password, phone: phone }
        // axios.post('/users/create', newUser, { headers: { 'x-access-token': props.currentUser.token } })
        //     .then(response => { handleRespone(response) })
        //     .catch(e => { handleRespone(e.response.data.result); console.log(e.message) })
        handleClose()
        clearStates()
        props.setMessage("Staff can't be added on this demo! :(")
        props.setOpenDialog(true)
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        // let updatedUser = { firstName: firstName, lastName: lastName, email: email, password: password, phone: phone }
        // axios.put('/users/' + userId, updatedUser, { headers: { 'x-access-token': props.currentUser.token } })
        //     .then(response => { handleRespone(response) })
        //     .catch(e => { handleRespone(e); console.log(e.response.data.result) })
        handleClose()
        clearStates()
        props.setMessage("Staff details can't be updated on this demo! :(")
        props.setOpenDialog(true)
    }

    const clearStates = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setPhone("")
    }

    return (
        <div>
            {props.edit && <EditIconButton tooltip='right' onClick={handleClickOpen} />}
            {props.new && <StyledButton size='large' text='Add Staff' onClick={handleClickOpen} />}
            <Dialog open={open} onClose={handleClose}>
                {props.new && <DialogTitle>Add Staff Member</DialogTitle>}
                {props.edit && <DialogTitle>Edit Staff Member</DialogTitle>}
                <DialogContent>
                    <Box component="form" onSubmit={props.new ? handleSubmitNew : handleSubmitUpdate}>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setFirstName(e.target.value)}
                            defaultValue={firstName ? firstName : ''}

                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setLastName(e.target.value)}
                            defaultValue={lastName ? lastName : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={email ? email : ''}
                        />
                        {props.new && <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setPassword(e.target.value)}
                            defaultValue={password ? password : ''}
                        />}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phone"
                            label="Phone"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setPhone(e.target.value)}
                            defaultValue={phone ? phone : ''}
                        />
                        {props.edit && <StyledSubmitButton text='Save' ></StyledSubmitButton>}
                        {props.new && <StyledSubmitButton text='Add' ></StyledSubmitButton>}
                        <StyledButton text="Cancel" onClick={handleClose}></StyledButton>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
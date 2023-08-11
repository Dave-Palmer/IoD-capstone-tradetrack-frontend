import { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Dialog, DialogContent, DialogTitle, Select, InputLabel, MenuItem, } from '@mui/material';
import { EditIconButton, StyledButton, StyledSubmitButton } from '../StyledComponents';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import axios from 'axios';

//This component is used for adding/editing equipment items in the database

export default function ItemFormDialog(props) {

    let itemId = props._id
    const [open, setOpen] = useState(false);
    const [assignedTo, setAssignTo] = useState(props.assignedTo ? props.assignedTo : '')
    const [brand, setBrand] = useState(props.brand ? props.brand : '')
    const [type, setType] = useState(props.type ? props.type : '')
    const [description, setDescription] = useState(props.description ? props.description : '')
    const [image, setImage] = useState({ preview: '', data: '' })


    const handleClickOpen = () => {
        setOpen(true)
        props.setOpenForm ? props.setOpenForm(true) : {}; // The add item button was shifted to the item container, so the open form state was moved to a parent component
    };

    const handleClose = () => {
        setOpen(false);
        props.setOpenForm ? props.setOpenForm(false) : {}

    };

    const handleRespone = (response) => {
        handleClose();
        let message;
        if (response.data && props.new) { message = `Successfully added ${brand} ${type}` }
        else if (response.data && props.edit) { message = `Successfully updated ${brand} ${type}` }
        else { message = response }
        props.setMessage(message);
        props.setOpenDialog(true)
    }

    const handleSubmitNew = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("assignedTo", assignedTo)
        formData.append("file", image.data)
        formData.append("brand", brand)
        formData.append("type", type)
        formData.append("description", description)

        axios.post('/items/create', formData)
            .then(response => { handleRespone(response) })
            .catch(e => { handleRespone(e.message) })
    }
    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        let updatedItem = { assignedTo: assignedTo, brand: brand, type: type, description: description }
        axios.put('/items/' + itemId, updatedItem)
            .then(response => { handleRespone(response) })
            .catch(e => { handleRespone(e.message) })
    }
    //This creates an object with data from uploaded image and URL to preview it
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    return (
        <div>
            {props.edit && <EditIconButton tooltip='top' onClick={handleClickOpen} />}

            <Dialog open={props.openForm || open} onClose={handleClose}>
                {props.new && <DialogTitle>Add New Item</DialogTitle>}
                {props.edit && <DialogTitle>Edit Item</DialogTitle>}
                <DialogContent>
                    <Box component="form" onSubmit={props.new ? handleSubmitNew : handleSubmitUpdate}>
                        <InputLabel id="assignedTo">Assign To</InputLabel>
                        <Select
                            variant="standard"
                            labelId="assignedTo"
                            id="assignedTo"
                            value={props.workshop ? 'workshop' : assignedTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            label="AssignedTo"
                            fullWidth
                            required
                        >
                            {/* This uses the array with all the user names (apart from admin) and then displays them individually as a menu item, if
                            this is in the workshop container it will just have the one option for assigned the item to the workshop */}
                            {!props.workshop ? props.userNames.map((user) =>
                                <MenuItem key={user.firstName} value={user.firstName + ' ' + user.lastName}>{user.firstName} {user.lastName}</MenuItem>
                            ) : <MenuItem value="workshop">Workshop</MenuItem>}
                        </Select>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="brand"
                            label="Brand"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setBrand(e.target.value)}
                            defaultValue={brand ? brand : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="type"
                            label="Type"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setType(e.target.value)}
                            defaultValue={type ? type : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            multiline
                            rows={2}
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setDescription(e.target.value)}
                            defaultValue={description ? description : ''}
                        />
                        {/* Image preview box at the bottom of the form */}
                        {image.preview && <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
                            <img src={image.preview} width='200px' />
                            <Button color='error' onClick={() => setImage({ preview: '', data: '' })}><HighlightOffRoundedIcon />Remove</Button>
                        </Box>}
                        <label htmlFor="photo">
                            <input
                                style={{ display: 'none' }}
                                id="photo"
                                name="photo"
                                type="file"
                                onChange={handleFileChange}
                            />
                            {/* If there is no image uploaded (image.preview is empty), the file input button will be displayed at the bottom of the form  */}
                            {!image.preview && !props.edit &&
                                <Button
                                    variant='contained'
                                    sx={{
                                        display: 'flex',
                                        margin: '10px',
                                        backgroundColor: 'rgb(59, 96, 100)',
                                        "&:hover": {
                                            backgroundColor: 'rgb(85, 130, 139)'
                                        },
                                    }}
                                    component='div'>
                                    <AddCircleOutlineRoundedIcon /> Add Photo
                                </Button>}
                        </label>
                        {props.edit && <StyledSubmitButton text='Save' />}
                        {props.new && <StyledSubmitButton text='Add Item' />}
                        <StyledButton onClick={handleClose} text='Cancel' />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
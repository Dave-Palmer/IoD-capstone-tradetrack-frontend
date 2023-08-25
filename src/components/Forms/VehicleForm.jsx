import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Select, InputLabel, MenuItem, Button, TextField } from '@mui/material';
import { StyledButton, StyledSubmitButton, EditIconButton } from '../StyledComponents';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import axios from 'axios';


export default function VehicleFormDialog(props) {
    let itemId = props._id

    const [open, setOpen] = useState(false);
    const [assignedTo, setAssignTo] = useState(props.assignedTo ? props.assignedTo : '')
    const [make, setMake] = useState(props.make ? props.make : '')
    const [model, setModel] = useState(props.model ? props.model : '')
    const [plate, setPlate] = useState(props.plate ? props.plate : '')
    const [odo, setOdo] = useState(props.odo ? props.odo : '')
    const [wof, setWof] = useState(props.wof ? props.wof : '')
    const [rego, setRego] = useState(props.rego ? props.rego : '')
    const [rucs, setRucs] = useState(props.rucs ? props.rucs : '')
    const [image, setImage] = useState({ preview: '', data: '' })



    const handleClickOpen = () => {
        setOpen(true);
        props.setOpenForm ? props.setOpenForm(true) : {}
    };

    const handleClose = () => {
        setOpen(false);
        props.setOpenForm ? props.setOpenForm(false) : {}
    };

    const handleRespone = (response) => {
        handleClose();
        let message;
        if (response.data && props.new) { message = `successfully added ${make} ${model}` }
        else if (response.data && props.edit) { message = `Successfully updated ${make} ${model}` }
        else { message = response }
        props.setMessage(message);
        props.setOpenDialog(true);
        clearStates()
    }

    const handleSubmitNew = (e) => {
        e.preventDefault()
        const formData = new FormData()
        // formData.append("assignedTo", assignedTo)
        // formData.append("make", make)
        // formData.append("model", model)
        // formData.append("plate", plate)
        // formData.append("odo", odo)
        // formData.append("wof", wof)
        // formData.append("rego", rego)
        // formData.append("rucs", rucs)
        // formData.append("file", image.data)

        // axios.post('/vehicles/create', formData)
        //     .then(response => { handleRespone(response) })
        //     .catch(e => { handleRespone(e.message) })
        handleClose()
        clearStates()
        props.setMessage("Vehicles can't be added on this demo! :(")
        props.setOpenDialog(true)
    }
    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        // let updatedVehicle = { assignedTo: assignedTo, make: make, model: model, plate: plate, odo: odo, wof: wof, rego: rego, rucs: rucs }
        // axios.put('/vehicles/' + itemId, updatedVehicle)
        //     .then(response => { handleRespone(response) })
        //     .catch(e => { handleRespone(e.message) })
        handleClose()
        clearStates()
        props.setMessage("Vehicls can't be updated on this demo! :(")
        props.setOpenDialog(true)
    }

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        // create object with data from uploaded image and URL to preview it
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    const clearStates = () => {
        setAssignTo("")
        setMake("")
        setModel("")
        setPlate("")
        setOdo("")
        setWof("")
        setRego("")
        setRucs("")
        setImage({ preview: '', data: '' })
    }



    return (
        <div>
            {props.edit && <EditIconButton tooltip='top' onClick={handleClickOpen} />}
            <Dialog open={props.openForm || open} onClose={handleClose}>
                {props.new && <DialogTitle>Add New Vehicle</DialogTitle>}
                {props.edit && <DialogTitle>Edit Vehicle</DialogTitle>}
                <DialogContent>
                    <Box component="form" onSubmit={props.new ? handleSubmitNew : handleSubmitUpdate}>
                        <InputLabel id="assignedTo">Assign To</InputLabel>
                        <Select
                            required
                            variant="standard"
                            labelId="assignedTo"
                            id="assignedTo"
                            value={assignedTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            label="AssignedTo"
                            fullWidth
                        >
                            {props.userNames.map((user) =>
                                <MenuItem key={user.firstName} value={user.firstName + ' ' + user.lastName}>{user.firstName} {user.lastName}</MenuItem>
                            )}
                        </Select>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="make"
                            label="Make"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setMake(e.target.value)}
                            defaultValue={make ? make : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="model"
                            label="Model"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setModel(e.target.value)}
                            defaultValue={model ? model : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="plate"
                            label="Plate"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setPlate(e.target.value)}
                            defaultValue={plate ? plate : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="odo"
                            label="Odo"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setOdo(e.target.value)}
                            defaultValue={odo ? odo : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="wof"
                            label="Wof"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setWof(e.target.value)}
                            defaultValue={wof ? wof : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="rego"
                            label="Rego"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setRego(e.target.value)}
                            defaultValue={rego ? rego : ''}
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="rucs"
                            label="Rucs"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setRucs(e.target.value)}
                            defaultValue={rucs ? rucs : ''}
                        />

                        {image.preview && <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
                            <img src={image.preview} width='200' />
                            <Button onClick={() => setImage({ preview: '', data: '' })}><HighlightOffRoundedIcon />Remove</Button>
                        </Box>}
                        <label htmlFor="photo">
                            <input
                                style={{ display: 'none' }}
                                id="photo"
                                name="photo"
                                type="file"
                                onChange={handleFileChange}
                            />

                            {!image.preview && !props.edit &&
                                <Button
                                    component='div'
                                    variant='contained'
                                    sx={{
                                        display: 'flex',
                                        margin: '10px',
                                        backgroundColor: 'rgb(59, 96, 100)',
                                        "&:hover": {
                                            backgroundColor: 'rgb(85, 130, 139)'
                                        },
                                    }} >
                                    <AddCircleOutlineRoundedIcon /> Add Photo
                                </Button>}
                        </label>

                        {props.edit && <StyledSubmitButton text='Save' />}
                        {props.new && <StyledSubmitButton text='Add' />}
                        <StyledButton text='Cancel' onClick={handleClose} />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
import { useContext, useState } from 'react';
import { Box, ButtonGroup, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { StyledButton, StyledSubmitButton } from '../StyledComponents';
import { AlertsContext } from '../../context/alertsContext';
import axios from 'axios';

const ButtonStyles = {
    backgroundColor: 'rgb(59, 96, 100)',
    "&:hover": { backgroundColor: 'rgb(85, 130, 139)' }
}


export default function ReportFromDialog(props) {
    let id = props._id

    const [open, setOpen] = useState(false);

    const [alertDescription, setAlertDescription] = useState(props.alertDescription ? props.alertDescription : '')
    const { alerts, setAlerts } = useContext(AlertsContext)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleRespone = (response, type) => {
        handleClose();
        let message;
        if (response.data && type === 'clear') { message = `Alert cleared`; setAlerts(alerts - + 1) }
        else if (response.data && type === 'update') { message = `Report saved` }
        else { message = response }
        props.setMessage(message);
        props.setOpenDialog(true)
    }


    const handleSubmitUpdate = (e) => {
        let type = 'update'
        e.preventDefault()
        let editedAlertDescription = `${alertDescription}`
        axios.put(`/${props.collection}/${id}`, { alertDescription: editedAlertDescription, alert: true })
            .then(response => { handleRespone(response, type) })
            .catch(e => { handleRespone(e.message) })
    }

    const handleClear = () => {
        let type = 'clear'
        axios.put(`/${props.collection}/${id}`, { alertDescription: '', alert: false })
            .then(response => { handleRespone(response, type) })
            .catch(e => { handleRespone(e.message) })
    }

    return (
        <div>
            {props.userType === 'admin' &&
                <> <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <ButtonGroup variant="contained" aria-label="outlined button group">
                        <Button sx={ButtonStyles} onClick={handleClickOpen} type='submit'>Edit</Button>
                        <Button sx={ButtonStyles} onClick={handleClear} size="small">Clear</Button>
                        <Button sx={ButtonStyles} onClick={() => props.setReportShow(!props.reportShow)} size="small">close</Button>
                    </ButtonGroup>
                </Box>
                </>}
            {props.userType === 'staff' && <StyledButton text='report' onClick={handleClickOpen} />}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Report</DialogTitle>

                <DialogContent>
                    <Box component="form" onSubmit={handleSubmitUpdate}>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="alertDescription"
                            label="description"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setAlertDescription(e.target.value)}
                            defaultValue={alertDescription ? alertDescription : ''}
                        />
                        <StyledSubmitButton text='Submit' />
                        <StyledButton text='Cancel' onClick={handleClose} />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}



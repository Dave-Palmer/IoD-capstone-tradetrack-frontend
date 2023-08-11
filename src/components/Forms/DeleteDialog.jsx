import * as React from 'react';
import { Dialog, DialogActions, DialogContent, Slide } from '@mui/material';
import { StyledButton } from '../StyledComponents';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog(props) {

    const handleCloseYes = () => {
        props.handleDelete()
        props.setOpenDeleteDialog(false);
        props.setMessage(`${props.name} deleted!`)
        props.setOpenDialog(true)
    };
    const handleCloseCancel = () => {
        props.setOpenDeleteDialog(false);
    };

    return (
        <div>
            <Dialog
                open={props.openDeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseCancel}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <Typography variant='h5' id="alert-dialog-slide-description">
                        {props.message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <StyledButton text='Yes' onClick={handleCloseYes} />
                    <StyledButton text='cancel' onClick={handleCloseCancel} />
                </DialogActions>
            </Dialog>
        </div>
    );
}
import * as React from 'react';
import { Typography, Dialog, DialogActions, DialogContent, Slide } from '@mui/material';
import { StyledButton } from '../StyledComponents';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageDialog(props) {

    const handleClose = () => {
        props.setOpenDialog(false);
    };

    return (
        <div>
            <Dialog
                open={props.openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <Typography sx={{ width: '300px' }} variant='h5' id="alert-dialog-slide-description">
                        {props.message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <StyledButton text="close" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    );
}
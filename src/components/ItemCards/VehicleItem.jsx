import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ReportFromDialog from '../Forms/ReportForm';
import { StyledButton } from '../StyledComponents';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';

/* This component is used to display a vehicle item on the staff page and the admin alerts page, 
  it has multiple conditionals in order to render the appropiate elements*/


//if no image path is found in the database file it will use this path instead
const backupImageUrl = "https://www.creativefabrica.com/wp-content/uploads/2019/05/Van-icon-by-marco.livolsi2014-13-580x386.jpg"

export default function VehicleItem(props) {
    let vehicleId = props._id
    const [odoUpdate, setOdoUpdate] = React.useState(0)
    const [odoInput, setOdoInput] = React.useState(false)
    const [reportShow, setReportShow] = React.useState(false)

    const handleOdoUpdate = () => {
        if (odoUpdate) {
            axios.put('/vehicles/' + vehicleId, { odo: odoUpdate });
            setOdoInput(!odoInput);
            props.setMessage('ODO Updated! 👍')
            props.setOpenDialog(true)
            setTimeout(() => setToggleNote(false), 2000)
        }
        else { setOdoInput(!odoInput); return }
    }

    /*each time this component loads it will check to see if the ODO reading is within 1000kms of the RUCs, 
      if so, it will set an alert on the item in the database
      and show as an alert on the admin alerts page*/
    useEffect(() => {
        let odoRucsCompare = props.rucs - props.odo
        if (odoRucsCompare <= 1000) {
            axios.put('/vehicles/' + vehicleId, { alert: true, alertDescription: 'Please order more Road User Charges' });
        }
        else if (odoRucsCompare >= 1000) {
            axios.put('/vehicles/' + vehicleId, { alert: false, alertDescription: '' });
        }
    }, [props.openDialog])

    return (
        <Card sx={{
            display: 'flex',
            height: 'auto',
            position: 'relative',
            overflow: 'visible',
            minWidth: 280,
            maxWidth: 280,
            flexDirection: 'column',
            marginTop: '15px'
        }}>
            {props.alert &&
                <ErrorIcon sx={{ fontSize: '70px', position: 'absolute', right: 0 }} color='error' />}
            <CardMedia
                component="img"
                alt="Vehicle"
                sx={{
                    width: '280px',
                }}
                image={props.photo.url || props.photo || backupImageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.make} {props.model}
                </Typography>
                <Divider />
                <Typography gutterBottom variant="subtitle1" component="div">
                    PLATE: {props.plate}
                </Typography>
                <Divider />
                <Typography variant="subtitle1" color="text.secondary">
                    ODO: {props.odo.toLocaleString("en-US")} kms
                </Typography>
                <Divider />
                <Typography variant="subtitle1" color="text.secondary">
                    WOF: {props.wof}
                </Typography>
                <Divider />
                <Typography variant="subtitle1" color="text.secondary">
                    REGO: {props.rego}
                </Typography>
                <Divider />
                <Typography variant="subtitle1" color="text.secondary">
                    RUCs: {props.rucs.toLocaleString("en-US")} kms
                </Typography>
                <Divider />
                <Typography variant="subtitle1" color="text.secondary">
                    Assigned To: {props.assignedTo}
                </Typography>
                <Divider />
                {odoInput && <TextField
                    autoFocus
                    color='success'
                    margin="dense"
                    label="Odometer Reading"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setOdoUpdate(e.target.value)}
                    defaultValue={props.odo}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button sx={{ color: 'rgb(59, 96, 100)' }} onClick={handleOdoUpdate} >Ok</Button>
                            </InputAdornment>
                        ),
                    }}
                />}
                {reportShow &&
                    <>
                        <Typography textAlign='center' mt='30px' variant="h6" color="error">{props.alertDescription}</Typography>
                        <ReportFromDialog
                            reportShow={reportShow}
                            setReportShow={setReportShow} //For the close button inside the dialog
                            {...props}
                            collection='vehicles'
                        />
                    </>
                }
            </CardContent>
            {/*If the user is an admin user it will have an option to check the 
            the report that is logged from another user, if a normal user, it will give the option to do an ODO update*/}
            <CardActions sx={{ marginTop: '10%' }}>
                {props.userType === 'staff' && <StyledButton text='Update ODO' onClick={(() => setOdoInput(!odoInput))} size="small" />}
                {props.userType === 'admin' && !reportShow && <StyledButton text='Check Report' onClick={() => setReportShow(!reportShow)} size="small" />}
            </CardActions>
        </Card>
    );
}
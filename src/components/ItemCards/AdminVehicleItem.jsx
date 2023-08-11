import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import DeleteDialog from '../Forms/DeleteDialog';
import VehicleFormDialog from '../Forms/VehicleForm';
import axios from 'axios';
import { DeleteIcon } from '../StyledComponents';


// This component is used to display vehicle information, edit, and delete buttons on the admin inventory page. 


//if no image path is found in the database file it will use this path instead
const backupImageUrl = "https://www.creativefabrica.com/wp-content/uploads/2019/05/Van-icon-by-marco.livolsi2014-13-580x386.jpg"

export default function VehicleItem(props) {

    let vehicleId = props._id

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

    const handleDelete = () => {
        axios.delete('/vehicles/' + vehicleId)
            .then(response => console.log(response))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    return (
        <Card sx={{
            display: 'flex',
            height: 'auto',
            overflow: 'visible',
            minWidth: 280,
            maxWidth: 280,
            flexDirection: 'column',
            marginTop: '15px'
        }}>
            <CardMedia
                component="img"
                alt="vehicle"
                sx={{
                    objectFit: 'contain',
                    width: '280px',
                }}
                image={props.photo ? props.photo : backupImageUrl}

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
            </CardContent>
            <CardActions sx={{ marginTop: 'auto' }}>
                <VehicleFormDialog
                    edit={true}
                    {...props}
                />

                <DeleteIcon tooltip='top' onClick={() => setOpenDeleteDialog(true)} />
                <DeleteDialog
                    message={`Are you sure you want to delete ${props.make} ${props.model} ${props.plate}?`}
                    handleDelete={handleDelete}
                    openDeleteDialog={openDeleteDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                    setMessage={props.setMessage}
                    setOpenDialog={props.setOpenDialog}
                    name={`${props.make} ${props.model}`}
                />
            </CardActions>
        </Card>
    );
}
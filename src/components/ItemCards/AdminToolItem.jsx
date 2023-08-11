import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Tooltip } from '@mui/material';
import ItemFormDialog from '../Forms/ItemForm';
import DeleteDialog from '../Forms/DeleteDialog';
import axios from 'axios';
import { DeleteIcon } from '../StyledComponents';

// This component is used to display equipment information, edit, and delete buttons on the admin inventory page. 

//if no image path is found in the database file it will use this path instead
const backupImageUrl = "https://img.freepik.com/premium-vector/wrench-metal-spanner-icon-vector-design-automotive-repair-tool-vector_654297-253.jpg"


export default function ToolItem(props) {
    let itemId = props._id
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

    const handleDelete = () => {
        axios.delete('/items/' + itemId)
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
                alt="tool"
                sx={{
                    objectFit: 'contain',
                    width: '280px',
                }}
                image={props.photo.url || props.photo || backupImageUrl}

            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.brand}
                </Typography>
                <Divider />
                <Typography sx={{ fontWeight: '300' }} gutterBottom variant="h6" component="div">
                    {props.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Divider />
                {!props.workshop && <Typography marginTop={3} variant="body1" color="text.secondary">
                    Assigned to: {props.assignedTo}
                </Typography>}
                <Divider />
            </CardContent>

            <CardActions disableSpacing sx={{ mt: 'auto' }}>
                <ItemFormDialog
                    _id={props._id}
                    edit={true}
                    workshop={props.workshop ? true : false}
                    {...props}
                    openForm={false}
                />
                <DeleteIcon tooltip='top' onClick={() => setOpenDeleteDialog(true)} />
                <DeleteDialog
                    message={`Are you sure you want to delete ${props.brand} ${props.type}?`}
                    handleDelete={handleDelete}
                    openDeleteDialog={openDeleteDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                    setMessage={props.setMessage}
                    setOpenDialog={props.setOpenDialog}
                    name={`${props.brand} ${props.type}`}
                />
            </CardActions>
        </Card>
    );
}
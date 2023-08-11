import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import ReportFromDialog from '../Forms/ReportForm';
import LendFormDialog from '../Forms/LendForm';
import axios from 'axios';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { StyledButton } from '../StyledComponents';

/* This component is used to display a tool/equipment item on the staff page and the admin alerts page, 
  it has multiple conditionals in order to render the appropiate elements*/

//if no image path is found in the database file it will use this path instead
const backupImageUrl = "https://img.freepik.com/premium-vector/wrench-metal-spanner-icon-vector-design-automotive-repair-tool-vector_654297-253.jpg"

export default function ToolItem(props) {
    let id = props._id
    const [reportShow, setReportShow] = React.useState(false)

    const handleRespone = (response, type) => {

        let message;
        if (response.data && type === "return") {
            message = `Returned to ${props.assignedTo}`
        }
        else if (response.data && type === "borrow") {
            message = `Borrowed ${props.brand} ${props.type} from the ${props.assignedTo}`
        }
        else { message = response }
        props.setMessage(message);
        props.setOpenDialog(true)

    }


    const handleReturn = () => {
        let type = 'return'
        axios.put(`/items/${id}`, { lentTo: '', lent: false })
            .then(response => { handleRespone(response, type) })
            .catch(e => { handleRespone(e.message) })
    }

    const handleBorrow = () => {
        let type = 'borrow'
        axios.put(`/items/${id}`, { lentTo: props.user, lent: true })
            .then(response => { handleRespone(response, type) })
            .catch(e => { handleRespone(e.message) })
    }

    return (
        <Card sx={{
            display: 'flex',
            position: 'relative',
            height: 'auto',
            overflow: 'visible',
            minWidth: 280,
            maxWidth: 280,
            flexDirection: 'column',
            marginTop: '15px',
        }}>
            {/* This makes sure the icon doesn't display in the users borrowed items or in the workshop unavailable items */}
            {props.lent && props.assignedTo !== 'workshop' && props.lentTo !== props.user &&
                < InfoIcon sx={{ fontSize: '70px', position: 'absolute', left: 0 }} color='info' />}
            {props.alert &&
                <ErrorIcon sx={{ fontSize: '70px', position: 'absolute', right: 0 }} color='error' />}
            <CardMedia
                component="img"
                alt="tool"
                sx={{ width: '280px' }}
                image={props.photo.url || props.photo || backupImageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{props.brand}</Typography>
                <Divider />
                <Typography sx={{ fontWeight: '300' }} gutterBottom variant="h6" component="div">{props.type}</Typography>
                <Typography variant="body2" color="text.secondary">{props.description}</Typography>
                <Divider />
                {props.lent && props.lentTo !== props.user &&
                    <Typography textAlign='center' variant="h6" color="#1e88e5">
                        {props.lentTo} has borrowed this item
                    </Typography>}
                {props.userType !== 'admin' && props.lentTo === props.user &&
                    <Typography textAlign='center' variant="h6" color="#1e88e5">
                        You have borrowed this from {props.assignedTo === 'workshop' ? 'the' : ''} {props.assignedTo}
                    </Typography>}
                {reportShow &&
                    <>
                        <Typography textAlign='center' mt='30px' variant="h6" color="error">{props.alertDescription}</Typography>
                        <ReportFromDialog
                            reportShow={reportShow}
                            setReportShow={setReportShow}
                            {...props}
                            collection='items' //this is used for the axios request
                        />
                    </>
                }
            </CardContent>
            <CardActions sx={{ marginTop: 'auto' }}>
                {/*This here uses conditionals to check if the current user is the one borrowing the item, if so a 'Return' button is displayed  */}
                {props.lent && props.user === props.lentTo &&
                    <>
                        <StyledButton text="return" onClick={handleReturn} />
                        <ReportFromDialog {...props} collection='items' />
                    </>}
                {/*These conditionals check user type and if the item is currently lent (a boolean in the database). 
                    If the item is lent, the "Lend" button won't show, also the 'Check Report' button will only show if the user is admin
                    */}
                {props.userType === 'staff' && !props.lent && <LendFormDialog {...props} />}
                {props.userType === 'staff' && !props.lent && <ReportFromDialog {...props} collection='items' />}
                {props.userType === 'admin' && !reportShow && <StyledButton text='Check report' onClick={() => setReportShow(!reportShow)} size="small" />}
                {props.workshopItem && <StyledButton text='Borrow' onClick={handleBorrow} size="small" />}
            </CardActions>
        </Card>

    );
}




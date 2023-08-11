import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { currentUser, handleUpdateUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(email && password)) {
            setErrorMessage('All inputs are required');
            return
        }
        let loggedInUser = null;

        try {
            let response = await axios.post('/users/user/login', { email: email, password: password })
            loggedInUser = response.data.data
            handleUpdateUser(loggedInUser)
            loggedInUser.admin ? navigate('/home') : navigate('/dashboard')
        }
        catch (error) { error.response.data.result ? setErrorMessage(error.response.data.result) : setErrorMessage('Something went wrong') }
    };

    return (

        <Box
            sx={{
                height: '70vh',
                width: '450px',
                backgroundColor: 'rgb(245,245,245)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
            }}
        >
            <Typography
                component="h1"
                variant="h3"
                sx={{
                    color: 'rgb(59, 96, 100)',
                    fontSize: '4em',
                    marginBottom: '60px'
                }}>
                TradeTrack
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'rgb(59, 96, 100)' }}><LockOutlinedIcon /></Avatar>
            <Typography color='rgb(59, 96, 100)' component="h2" variant="h5">
                Please Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    color='success'
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
                />
                <TextField
                    margin="normal"
                    required
                    color='success'
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
                />

                <Typography sx={{ color: 'red' }} >
                    {errorMessage}
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3, mb: 2, backgroundColor: 'rgb(59, 96, 100)', "&:hover": {
                            backgroundColor: 'rgb(85, 130, 139)'
                        },
                    }}
                >
                    Sign In
                </Button>

            </Box>
        </Box>


    );
}
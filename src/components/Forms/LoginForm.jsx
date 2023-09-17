import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingSpinner from '../loaderSpinner/LoadingSpinner';
import axios from 'axios';

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { handleUpdateUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

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
    
    const handleDemoLogin = async (userType) => {
        setIsLoading(true)
        let response = await axios.get(`/users/demo${userType}login`)
        setEmail(response.data.email)
        setPassword(response.data.password)
        setIsLoading(false)
    }

    return (

        <Box
            sx={{
                minHeight: '70vh',
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
                    marginBottom: '60px',
             
                }}>
                TradeTrack
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: 'rgb(59, 96, 100)' }}><LockOutlinedIcon /></Avatar>
            <Typography color='rgb(59, 96, 100)' component="h2" variant="h5">
                Please Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, p:2 }}>
                <TextField
                    value={email}
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
                    value={password}
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
                    disabled={isLoading}
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
                <Box
                    sx={{display: "flex", justifyContent:"center", alignItems: "center",  height: '50px'}}
                >
                {isLoading ? <LoadingSpinner/> :
                <Typography color='rgb(59, 96, 100)' textAlign='center'>For Demo purposes, click one to add credentials</Typography>}
                </Box>
                <Box
                sx={{display: 'flex', justifyContent: 'space-between'}}
                >
                <Button
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                        mt: 3, mb: 1, backgroundColor: 'rgb(59, 96, 100)', "&:hover": {
                        backgroundColor: 'rgb(85, 130, 139)'},
                           }}
                    onClick={() => handleDemoLogin("admin")}
                >
                    admin credentials
                </Button>
                <Button
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                        mt: 3, mb: 1, backgroundColor: 'rgb(59, 96, 100)', "&:hover": {
                        backgroundColor: 'rgb(85, 130, 139)'},
                           }}
                    onClick={() => handleDemoLogin("staff")}
                >
                    staff credentials
                </Button>
                </Box>
            </Box>
        </Box>


    );
}
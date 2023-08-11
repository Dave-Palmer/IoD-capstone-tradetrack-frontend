import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export default function DropDownFilterMenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClickTwo = event => {
        const { value } = event.currentTarget.dataset;
        props.setUserFilter(value)
        handleClose()
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <Button
                variant="contained"
                type='submit'
                sx={{
                    mt: 3,
                    mr: 1,
                    mb: 2,
                    backgroundColor: 'rgb(59, 96, 100)',
                    "&:hover": {
                        backgroundColor: 'rgb(85, 130, 139)'
                    },

                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Filter Staff
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { props.setUserFilter(''); setAnchorEl(null) }}>All Staff</MenuItem>
                {props.userNames.map((user) =>
                    <MenuItem data-value={user.firstName + ' ' + user.lastName} onClick={handleClickTwo} key={user.firstName} >{user.firstName} {user.lastName}</MenuItem>
                )}
            </Menu>
        </div>
    );
}

import { useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import AvatarName from '../AvatarName';
import { UserContext } from '../../context/userContext';


export const SidebarHeader = ({ children, ...rest }) => {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      <Stack marginBottom={7} direction="column" alignItems="center">
        <Typography component='div' margin={3} variant="h4" fontWeight={1000} color="rgb(201, 228, 202)">
          TRADETRACK
        </Typography>
        <AvatarName name={currentUser.firstName + ' ' + currentUser.lastName} />
      </Stack>
    </>
  );
};




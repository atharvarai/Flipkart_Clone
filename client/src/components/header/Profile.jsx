import { Typography, Box, Menu, MenuItem, styled } from "@mui/material";
import { useState } from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 15px;
`;

const Profile = ({ account, setAccount }) => {

    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget); // setting open's value to true, we are writting here event.currentTarget instead of true (both mean same), the former is written to show in whose respect we want to open the menu
    }

    const handleClose = () => {
        setOpen(false);
    }

    const logoutuser = () => {
        setAccount(''); // emptying the account value, i.e. removing the firstname value
    }

    return (
        <>
            <Box onClick={handleClick}>
                <Typography style={{ marginTop: 2, cursor: 'pointer' }}>{account}</Typography>
            </Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                {/* onClick calls two functions handleClose and logoutuser */}
                <MenuItem onClick={ () => { handleClose(); logoutuser(); } }> 
                    <PowerSettingsNewIcon color="primary" fontSize="small" />
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )
}

export default Profile;
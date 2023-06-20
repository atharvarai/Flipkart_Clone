import { useState, useContext } from 'react';


import { Box, Button, Typography, styled, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DataContext } from '../../context/DataProvider';

// components
import LoginDialog from '../login/LoginDialog';
import Profile from './Profile';


const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '0 3% 0 auto',

    /* In CSS, the ampersand symbol (&) is a special character that is used as a placeholder for the current selector or parent selector. */
    /* The > symbol is the child combinator selector in CSS, which selects only the immediate child elements of a parent element. This means that elements that are nested deeper in the HTML hierarchy and are not direct children of the parent element will not be affected by this rule. */
    /* Button, Typography, Box are button,p,div */

    '& > *' : {
        marginRight:'40px !important',
        fontSize: '16px',
        alignItems: 'center'
    }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit'
}));

const LoginButton = styled(Button)`
    background: #fff;
    color: #2874f0;
    text-transform: none;
    border-radius: 2px;
    padding: 5px 40px;
    box-shadow: none;
    font-weight: 600;
    height: 32px;
`;

const CustomButtons = () => {

    const [open,setOpen] = useState(false);

    const { account, setAccount } = useContext(DataContext);

    const { cartItems } = useSelector(state => state.cart);

    const openDialog = () => {
        setOpen(true);
    }

    return(
        <Wrapper>

            {
                // if account has the value of the firstname, then display the profile section else display the usual Login section
                account ? <Profile account={account} setAccount={setAccount}/> :
                <LoginButton variant='contained' onClick={() => openDialog()}>
                    Login
                </LoginButton>
            }

            <Typography style={{ marginTop: 3, width: 135}}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3}} >More</Typography>
            <Container to="/cart">
                <Badge badgeContent={cartItems?.length} color='secondary'>
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Container>
            {/* when the LoginDialog is clicked outside its region, then onClose is triggered which sets the setOpen() back to false */}
            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
    );
}

export default CustomButtons;
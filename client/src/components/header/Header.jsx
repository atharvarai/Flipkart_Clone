// div tag's mui replacement is Box, p tag's mui replacement is Typography


import {AppBar,Toolbar,Box,Typography,styled} from '@mui/material';

import { Link } from "react-router-dom";


// components
import Search from './Search';
import CustomButtons from './CustomButtons';


// styling the AppBar of the mui and storing it in StyledHeader component
const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
`;

const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    text-decoration: none;
    color: inherit;
`;

const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`;

// whenever we want to put html element tag inside styled component we write it inside quotation marks
const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginTop: 1
});

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 2%'
}));

const Header = () => {

    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    return(
        <StyledHeader>
            <Toolbar style={{ minHeight: 55}}>
                <Component to='/'>
                    {/* we use {} when we put a variable value */ }
                    {/* two {{}} in style since the outer one is for it being a variable and the inner one is for the style sheet object we are putting in */}
                    <img src={logoURL} alt='logo' style={{ width: 75 }}/>
                    <Box style={{ display: 'flex'}}>
                        <SubHeading>
                            Explore&nbsp;
                            <Box component="span" style={{ color: '#ffe500'}}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt='sub-logo'/>
                    </Box>
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    );
}

export default Header;
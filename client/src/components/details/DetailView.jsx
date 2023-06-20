import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";

import { Box, styled, Grid } from '@mui/material';

const Component = styled(Box)`
    background: #f2f2f2;
    margin-top: 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#ffffff',
    display: 'flex',
    gap: '5px',
    [theme.breakpoints.down('md')]:{
        margin: 0
    }
}))



const RightContainer = styled(Grid)(({ theme }) => ({
    width: '50%',
    marginTop: '50px',
    marginLeft: '20px',
    [theme.breakpoints.down('md')]:{
        // leftMargin: '20px'
    }
}))



const DetailView = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const {loading, product} = useSelector(state => state.getProductDetails);

    useEffect(() => {
        // to avoid infinite loop
        if(product && id !== product.id) 
            dispatch(getProductDetails(id))
    }, [dispatch, id, product, loading])

    console.log(product);

    return (
        <Component>
                {/* The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names. */}
            {
                    product && Object.keys(product).length > 0 && (
                    <Container container>
                        <Grid item lg={4} md={4} sm={8} xs={12}>
                            <ActionItem product={product} />
                        </Grid>
                        <RightContainer item lg={7} md={6} sm={8} xs={12}>
                            <ProductDetail product={product} />
                        </RightContainer>
                    </Container>
                )
            }
        </Component>
    )
}

export default DetailView;
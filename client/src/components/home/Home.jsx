// import { Fragment } from "react";

import React, { useEffect } from "react";

// components
import Navbar from "./Navbar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";

import { styled,Box } from '@mui/material';

import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector} from 'react-redux';

const Component = styled(Box)`
    padding: 10px;
    background: #f2f2f2;
`;

const Home= () => {

    const { products } = useSelector(state => state.getProducts);
    console.log(products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return(

// since we've to return multiple components, but jsx doesn't allow that so we've to wrap all the components in a single tag like div
// but the problem with using div to wrap is, it creates an extra unnecessary node
// using Fragment solves this problem, it doesn't create an extra node. It also is faster than div
        // <Fragment>
        //     <Navbar />
        //     <Banner />
        // </Fragment>
// in the recent improvement in Fragment, we don't have to write Fragments in tags, we can leave it empty

        <>
            <Navbar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                <MidSection />
                <Slide products={products} title="Discounts for You" timer={false} />
                <Slide products={products} title="Suggesting Items" timer={false} />
                <Slide products={products} title="Top Selection" timer={false} />
                <Slide products={products} title="Recommended Items" timer={false} />
                <Slide products={products} title="Trending Offers" timer={false} />
                <Slide products={products} title="Season's Top picks" timer={false} />
                <Slide products={products} title="Top Deals on Accessories" timer={false} />
            </Component>
        </>

    );
}


export default Home;
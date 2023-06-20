import Product from "./model/product-schema.js";
import { products } from "./constants/data.js";

const DefaultData = async () => {
    try{

        // deleting the whole database enteries before inserting the updated products to prevent duplicate enteries, however we don't do this irl since this is impractical
        // await Product.deleteMany({});

        await Product.insertMany(products); // writing await since insertMany returns a promise
        console.log("Data imported Successfully");
    }
    catch(error){
        if(error!== undefined)
            console.log("Error while inserting default data ", error.message);
    }
}

export default DefaultData;
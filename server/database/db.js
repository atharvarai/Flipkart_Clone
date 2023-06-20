import mongoose from 'mongoose';


const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@ecommercedb.damf8xv.mongodb.net/`;
    try{
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        // if the above connection fails then the control directly goes to the catch block where the error is printed
        console.log("Database Connected Successfully");
    }
    catch(error){
        if(error!== undefined)
            console.log('Error while connecting with the database ', error.message);
    }
}

export default Connection;
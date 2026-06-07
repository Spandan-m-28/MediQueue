import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongoDB successfully ;)`)
    }catch(error){
        console.log(`Error Connecting to MongoDB :(`);
        process.exit(1);
    }
}

export default connectDB;
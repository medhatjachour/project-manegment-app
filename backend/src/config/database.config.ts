import { config } from "./app.config";
import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('Database connection error:', error);
        process.exit(1);
        
    }
}
export default connectDatabase;
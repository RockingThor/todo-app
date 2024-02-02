import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log("Connection established");
    }
  } catch (err) {
    console.log("Error in connectToDatabase: ", err);
    throw err;
  }
};

export default connectToDataBase;

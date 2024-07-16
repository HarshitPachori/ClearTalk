import mongoose from "mongoose";

const connectDB = async () => {
  const dbUrl = process.env.DATABASE_URL;
  try {
    const connectionResponse = await mongoose.connect(dbUrl);
    console.log(
      `Database connected successfully : ` +
        connectionResponse.connection.db.databaseName
    );
    console.log(
      `MongoDB connected to host : ` + connectionResponse.connection.host
    );
  } catch (error) {
    console.log(`Unable to connect with db : ` + error.message);
    process.exit(1);
  }
};

export default connectDB;

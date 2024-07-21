import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import { app } from "./app.js";
import setupSocket from "./socket.js";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () =>
      console.log(`Server Started at http://localhost:${port}`)
    );
    setupSocket(server);
  })
  .catch((error) => console.log(`MongoDB connection failed Error : ${error}`));

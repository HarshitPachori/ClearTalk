import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/dbConfig.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then((response) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`Server Started at http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(`MongoDB connection failed Error : ${error}`));

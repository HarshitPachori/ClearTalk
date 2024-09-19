import { v2 as cloudinary } from "cloudinary";
import stream from "stream";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file, res_type) => {
  try {
    if (!file) {
      return null;
    }
    const b64 = Buffer.from(file.buffer).toString("base64");

    let dataURI = "data:" + file.mimetype + ";base64," + b64;

    const response = await cloudinary.uploader.upload(
      dataURI,
      {
        resource_type: res_type,
      },
      (err, res) => {
        if (err) {
          console.error(
            `error in uploading file to cloudinary server : Error ${err.message}`
          );
          return null;
        } else {
          return res;
        }
      }
    );
    return response;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

const deleteFromCloudinary = async (public_id, res_type) => {
  try {
    await cloudinary.uploader.destroy(public_id, {
      resource_type: res_type,
    });
  } catch (error) {
    console.error({ error });
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

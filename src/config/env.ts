import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT),

  databaseUrl: process.env.DATABASE_URL!,

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
};
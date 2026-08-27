import { Readable } from "stream";
import crypto from "crypto";
import cloudinary from "@/config/cloudinary";

class CloudinaryService {
  async uploadFile(file: Express.Multer.File) {
    return new Promise<{ url: string; publicId: string }>(
      (resolve, reject) => {
        const publicId = crypto.randomUUID();

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "file-storage-api",
            public_id: publicId,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            if (!result) {
              return reject(new Error("Upload failed"));
            }

            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        );

        Readable.from(file.buffer).pipe(uploadStream);
      }
    );
  }

  async deleteFile(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  }
}

export default new CloudinaryService();
import { Readable } from "stream";
import cloudinary from "@/config/cloudinary";

class CloudinaryService {
    async uploadFile(file: Express.Multer.File){
        return new Promise <{url: string,publicId: string}>((resolve,reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: ' file-storage-api',
                    resource_type: "image"
                },
                (error,results) => {
                    if(error) {
                        return reject(error)
                    }

                    if(!results) { 
                        return reject(new Error('Upload failed'))
                    }

                    resolve ({
                        url: results.secure_url,
                        publicId: results.public_id
                    })
                }
            )
            
            Readable.from(file.buffer).pipe(uploadStream)
        })
    }

    async deleteFile(publicId: string) {
         await cloudinary.uploader.destroy(publicId)   
    }
}

export default new CloudinaryService()
import cloudinary from "@/config/cloudinary";
import fileRepository from "./file.repository";
import cloudinaryService from "@/services/cloudinary.service";

class FileService {
    async uploadFile(file: Express.Multer.File) {
        const uploadedFile = await cloudinaryService.uploadFile(file);

        const createdFile = await fileRepository.create({
            filename: file.filename ?? file.originalname,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url: uploadedFile.url,
            publicId: uploadedFile.publicId,
        });

        return createdFile
    }

    async getAllFiles() {
        return fileRepository.findAll()
    }

    async getFileById(id: string) {
        return fileRepository.findById(id)
    }
}

export default new FileService()
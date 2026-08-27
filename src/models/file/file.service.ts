import fileRepository from "./file.repository";
import storageService from "@/services/storage.service";

class FileService {
  async uploadFile(file: Express.Multer.File, userId?: string) {
    void userId;
    const uploadedFile = await storageService.upload(file);

    const createdFile = await fileRepository.create({
      filename: file.originalname,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
    });

    return createdFile;
  }

  async getAllFiles() {
    return fileRepository.findAll();
  }

  async getFileById(id: string) {
    return fileRepository.findById(id);
  }

  async deleteFile(id: string) {
    const file = await fileRepository.findById(id);

    if (!file) {
      throw new Error("File not found");
    }

    await storageService.delete(file.publicId);

    await fileRepository.delete(id);

    return {
      message: "File deleted successfully",
    };
  }
}

const fileService = new FileService();

export const uploadFile =
  fileService.uploadFile.bind(fileService);

export const getAllFiles =
  fileService.getAllFiles.bind(fileService);

export const getFileById =
  fileService.getFileById.bind(fileService);

export const deleteFile =
  fileService.deleteFile.bind(fileService);

export default fileService;
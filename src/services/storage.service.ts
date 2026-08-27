import cloudinaryService from "./cloudinary.service";

class StorageService {
  async upload(file: Express.Multer.File) {
    return cloudinaryService.uploadFile(file);
  }

  async delete(publicId: string) {
    return cloudinaryService.deleteFile(publicId);
  }
}

export default new StorageService();
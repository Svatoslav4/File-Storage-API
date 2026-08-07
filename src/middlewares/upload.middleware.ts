import { upload } from "@/config/multer";

export const uploadImage = upload.single('image')
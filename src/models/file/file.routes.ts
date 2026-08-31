import { Router } from "express";
import fileController from "./file.controller";
import { uploadImage } from "@/middlewares/upload.middleware";
import { validate } from "@/middlewares/validation.middleware";
import { uploadLimiter } from "@/middlewares/rateLimit.middleware";
import { fileIdSchema } from "./file.validation";

const router = Router();


router.post("/upload", uploadLimiter, uploadImage, fileController.upload);
router.get("/", fileController.getAll);
router.get("/:id", validate(fileIdSchema), fileController.getById);
router.delete("/:id", validate(fileIdSchema), fileController.delete);

export default router;
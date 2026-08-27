import { Request, Response, NextFunction } from "express";
import fileService from "./file.service";

class FileController {
  async upload(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const file = await fileService.uploadFile(req.file, req.user?.id);

      return res.status(201).json({
        success: true,
        data: file,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const files = await fileService.getAllFiles();

      return res.status(200).json({
        success: true,
        data: files,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid file ID",
        });
      }

      const file = await fileService.getFileById(id);

      if (!file) {
        return res.status(404).json({
          success: false,
          message: "File not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: file,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid file ID",
        });
      }

      const result = await fileService.deleteFile(id);

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
import multer from 'multer';
import path from 'path';

const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
];

const allowedExtensions = [
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
];

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    console.log('FILE:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    const extension = file.originalname
      ? path.extname(file.originalname).toLowerCase()
      : '';

    if (
      !allowedMimeTypes.includes(file.mimetype) &&
      !allowedExtensions.includes(extension)
    ) {
      return cb(
        new Error('Only PNG, JPEG and WEBP images are allowed'),
      );
    }

    cb(null, true);
  },
});
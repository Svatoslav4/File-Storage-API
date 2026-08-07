import multer from 'multer'

const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp"
]

export const upload = multer({
    storage: multer.memoryStorage(),
    
    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter(req,file,cb) {
        if(!allowedMimeTypes.includes(file.mimetype)){
            return cb(new Error('Only images are allowed'))
        }
        cb(null,true)
    }
})


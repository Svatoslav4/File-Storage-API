import { Router } from 'express'
import fileController from './file.controller'
import { uploadImage } from '@/middlewares/upload.middleware'

const router = Router()

router.post('/upload',uploadImage,fileController.upload)
router.get('/',fileController.getAll)
router.get('/:id',fileController.getById)
router.delete('/:id',fileController.delete)

export default router
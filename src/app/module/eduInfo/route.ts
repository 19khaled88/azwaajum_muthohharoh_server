import express from 'express'
import { EduInfoController } from './controller'



const router = express.Router()


router.post('/create', EduInfoController.create)
router.get('/getAll', EduInfoController.getAll)
router.get('/getSingle/:id', EduInfoController.getSingle)
router.delete('/delete/:id', EduInfoController.deleteEduInfo)
router.patch('/update/:id', EduInfoController.updateEduInfo)



export const EduRouter = router
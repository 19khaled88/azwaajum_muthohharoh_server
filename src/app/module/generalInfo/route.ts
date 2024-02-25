import express from 'express'
import { GeneralInfoController } from './controller'



const router = express.Router()


router.post('/create', GeneralInfoController.create)
router.get('/getAll', GeneralInfoController.getAll)
router.get('/getSingle/:id', GeneralInfoController.getSingle)
router.delete('/delete/:id', GeneralInfoController.deleteGeneralInfo)
router.patch('/update/:id', GeneralInfoController.updateGeneralInfo)



export const GeneralRouter = router
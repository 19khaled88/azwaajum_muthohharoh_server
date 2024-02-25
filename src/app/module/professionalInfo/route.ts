import express from 'express'
import { ProfessionalInfoController } from './controller'



const router = express.Router()


router.post('/create', ProfessionalInfoController.create)
router.get('/getAll', ProfessionalInfoController.getAll)
router.get('/getSingle/:id', ProfessionalInfoController.getSingle)
router.delete('/delete/:id', ProfessionalInfoController.deleteProfessionalInfo)
router.patch('/update/:id', ProfessionalInfoController.updateProfessionalInfo)



export const ProfessionalRouter = router
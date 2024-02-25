import express from 'express'
import { PersonalInfoController } from './controller'



const router = express.Router()


router.post('/create', PersonalInfoController.create)
router.get('/getAll', PersonalInfoController.getAll)
router.get('/getSingle/:id', PersonalInfoController.getSingle)
router.delete('/delete/:id', PersonalInfoController.deletePersonalInfo)
router.patch('/update/:id', PersonalInfoController.updatePersonalInfo)



export const PersonalInfoRouter = router
import express from 'express'
import { FamilyInfoController } from './controller'



const router = express.Router()


router.post('/create', FamilyInfoController.create)
router.get('/getAll', FamilyInfoController.getAll)
router.get('/getSingle/:id', FamilyInfoController.getSingle)
router.delete('/delete/:id', FamilyInfoController.deleteFamilyInfo)
router.patch('/update/:id', FamilyInfoController.updateFamilyInfo)



export const FamilyRouter = router
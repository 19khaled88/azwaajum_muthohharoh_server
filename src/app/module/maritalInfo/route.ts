import express from 'express'
import { MaritalInfoController } from './controller'



const router = express.Router()


router.post('/create', MaritalInfoController.create)
router.get('/getAll', MaritalInfoController.getAll)
router.get('/getSingle/:id', MaritalInfoController.getSingle)
router.delete('/delete/:id', MaritalInfoController.deleteMaritalInfo)
router.patch('/update/:id', MaritalInfoController.updateMaritalInfo)



export const MaritalRouter = router
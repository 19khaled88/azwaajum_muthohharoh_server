import express from 'express'
import { PertnarInfoController } from './controller'



const router = express.Router()


router.post('/create', PertnarInfoController.create)
router.get('/getAll', PertnarInfoController.getAll)
router.get('/getSingle/:id', PertnarInfoController.getSingle)
router.delete('/delete/:id', PertnarInfoController.deletePertnarInfo)
router.patch('/update/:id', PertnarInfoController.updatePertnarInfo)



export const PertnarRouter = router
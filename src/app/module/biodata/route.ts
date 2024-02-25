import express from 'express'
import { BioDataController } from './controller'



const router = express.Router()


router.post('/create', BioDataController.create)
router.get('/getAll', BioDataController.getAll)
router.post('/frontEndShow',BioDataController.frontEndShow)
router.get('/getPending',BioDataController.getPending)
router.get('/getApproved',BioDataController.getApproved)
router.get('/getRejected',BioDataController.getRejected)
router.get('/getSingle/:id', BioDataController.getSingle)
router.delete('/delete/:id', BioDataController.deleteBioData)
router.patch('/update/:id', BioDataController.updateBioData)



export const BioDataRouter = router
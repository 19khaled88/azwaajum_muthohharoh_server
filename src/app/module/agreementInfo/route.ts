import express from 'express'
import { AgreementInfoController } from './controller'



const router = express.Router()


router.post('/create', AgreementInfoController.create)
router.get('/getAll', AgreementInfoController.getAll)
router.get('/getSingle/:id', AgreementInfoController.getSingle)
router.delete('/delete/:id', AgreementInfoController.deleteAgreementInfo)
router.patch('/update/:id', AgreementInfoController.updateAgreementInfo)



export const AgreementRouter = router
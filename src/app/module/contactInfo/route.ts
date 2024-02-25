import express from 'express'
import { ContactInfoController } from './controller'



const router = express.Router()


router.post('/create', ContactInfoController.create)
router.get('/getAll', ContactInfoController.getAll)
router.get('/getSingle/:id', ContactInfoController.getSingle)
router.delete('/delete/:id', ContactInfoController.deleteContactInfo)
router.patch('/update/:id', ContactInfoController.updateContactInfo)



export const ContactRouter = router
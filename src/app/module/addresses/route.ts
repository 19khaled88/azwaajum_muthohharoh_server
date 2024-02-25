import express from 'express'
import { AddressInfoController } from './controller'



const router = express.Router()


router.post('/create', AddressInfoController.create)
router.get('/getAll', AddressInfoController.getAll)
router.get('/getSingle/:id', AddressInfoController.getSingle)
router.delete('/delete/:id', AddressInfoController.deleteAddressInfo)
router.patch('/update/:id', AddressInfoController.updateAddressInfo)



export const AddressRouter = router
import express from "express"
import ProtectRoute from "../middleware/ProtectRoutes.js"
const router=express.Router()
import {createTicket,getTicket, getTickets, updateTicketStatus} from '../Controllers/TicketControllers.js'

router.post('/create', ProtectRoute, createTicket);
router.post('/updateStatus', ProtectRoute, updateTicketStatus);
router.get('/user/:userId', ProtectRoute, getTickets);
router.get('/:id', ProtectRoute, getTicket);
export default router;
import express from 'express'
import { addEvent, getEventsByUserId, handleUserSubscription, getAllEvents } from '../controllers/events'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

router.get('/:userId', getEventsByUserId)
router.get('/', getAllEvents)
router.put('/:eventId/:userId', handleUserSubscription)
router.post('/', addEvent)

export default router
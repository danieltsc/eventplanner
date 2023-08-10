import express from 'express'
import { addCategory, getAllCategories } from '../controllers/categories'

const router = express.Router()

router.get('/', getAllCategories)
router.post('/', addCategory)

export default router
import { Router } from 'express'
import taskModel from '../models/task.model.js'

const router = Router()

router.get('/:period?', async (req, res) => {
    const current = new Date()
    const dateStart = new Date(current)
    const dateEnd = new Date(current)

    if (!req.params.period) req.params.period = 'week'

    dateStart.setHours(0, 0, 0, 0)
    switch (req.params.period) {
        case 'day':
            dateEnd.setHours(23, 59, 59, 999)
            break
        
        case 'week':
            dateEnd.setDate(current.getDate() + (6 - current.getDay()))
            break
        
        case 'month':
            dateEnd.setDate(current.getDate() + (31 - current.getDay()))
        
        default:
            dateEnd.setDate(current.getDate() + (6 - current.getDay()))
    }
    
    const tasks = await taskModel.aggregate([
        { $match: { target_date: { $gte: dateStart, $lte: dateEnd }}},
        { $sort: { target_date: 1 }}
    ])

    res.status(200).send({ status: 'OK', data: tasks })
})

export default router
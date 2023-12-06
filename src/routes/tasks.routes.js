import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send({ status: 'OK', data: 'LISTADO DE TAREAS' })
})

export default router
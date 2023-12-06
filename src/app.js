import express from 'express'
import mongoose from 'mongoose'

import tasksRouter from './routes/tasks.routes.js'

const APP_PORT = 5050
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/rolling64i'

try {
    await mongoose.connect(MONGOOSE_URL)

    const app = express()
    
    app.listen(APP_PORT, () => {
        console.log(`Backend activo puerto ${APP_PORT}, conectado a bbdd`)
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/tasks', tasksRouter)
} catch (err) {
    console.log(`Backend: error al inicializar (${err.message})`)
}
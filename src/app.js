import express from 'express'
import tasksRouter from './routes/tasks.routes.js'

const APP_PORT = 5050

try {
    const app = express()
    
    app.listen(APP_PORT, () => {
        console.log(`Backend activo puerto ${APP_PORT}`)
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/tasks', tasksRouter)
} catch (err) {
    console.log(`Backend: error al inicializar (${err.message})`)
}
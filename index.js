import express from "express"
import conectarDb from "./config/db.js"
import dotenv from 'dotenv'
import usarioRouter from './routes/usuarioRouter.js'
import proyectoRouter from './routes/proyectoRoutes.js'
import tareaRouter from "./routes/tareaRoutes.js"
import checkAuth from "./middlewares/checkAuth.js"

dotenv.config()

const app = express()

conectarDb()

const PORT =  process.env.PORT || 4000

app.use(express.json())

app.use('/api/usuarios', usarioRouter)
app.use('/api/proyectos', proyectoRouter)
app.use('/api/tareas', tareaRouter)

app.listen(PORT,()=> {
  console.log(`El servidor esta en escucha en el puerto ${PORT}`)
})



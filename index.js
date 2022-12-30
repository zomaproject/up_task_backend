import express from "express"
import conectarDb from "./config/db.js"
import dotenv from 'dotenv'
import usarioRouter from './routes/usuarioRouter.js'
import proyectoRouter from './routes/proyectoRoutes.js'
import tareaRouter from "./routes/tareaRoutes.js"
// import checkAuth from "./middlewares/checkAuth.js"
import cors from 'cors'
dotenv.config()

const app = express()

conectarDb()



const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: function(origin, callback){
    if(whiteList.includes(origin)){
      callback(null, true)
    }else {
      callback( new Error('Error de Cors'))
    }
  }
}

app.use(cors(corsOptions))

const PORT =  process.env.PORT || 4000

app.use(express.json())

app.use('/api/usuarios', usarioRouter)
app.use('/api/proyectos', proyectoRouter)
app.use('/api/tareas', tareaRouter)

app.listen(PORT,()=> {
  console.log(`El servidor esta en escucha en el puerto ${PORT}`)
})



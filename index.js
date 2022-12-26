import express from "express"
import conectarDb from "./config/db.js"
import dotenv from 'dotenv'
import usarioRouter from './routes/usuarioRouter.js'
dotenv.config()

const app = express()

conectarDb()

const PORT =  process.env.PORT || 4000

app.use(express.json())
app.use('/api/usuarios', usarioRouter)


app.listen(PORT,()=> {
  console.log(`El servidor esta en escucha en el puerto ${PORT}`)
})



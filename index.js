import express from 'express'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
import cors from 'cors'
// import dotenv from "dotenv"
import Route from "./src/routes/routes.js"


// dotenv.config()


const app = express()
const port = 3000


// app.use(bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 
app.use(cors())

app.use(express.json())
app.use("/", Route)


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
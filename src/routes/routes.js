import { Router } from "express"
import { MostrarTodosControllers } from "../controllers/controllersInfo.js"

const route = Router()


route.get("/mostrar", MostrarTodosControllers)


export default route

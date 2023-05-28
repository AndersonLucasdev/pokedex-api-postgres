import { Router } from "express"
import { mostrarPokemonControllers } from "../controllers/controllersInfo.js"

const route = Router()


route.get("/mostrar", mostrarPokemonControllers)


export default route

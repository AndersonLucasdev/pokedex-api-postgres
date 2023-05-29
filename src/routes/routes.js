import { Router } from "express"
import { MostrarTodosControllers, CadastrarPokemonControllers } from "../controllers/controllersInfo.js"

const route = Router()


route.get("/mostrar", MostrarTodosControllers)
route.post("/cadastro", CadastrarPokemonControllers)


export default route

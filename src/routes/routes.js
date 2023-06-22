import { Router } from "express"
import { MostrarTodosControllers, CadastrarPokemonControllers, MostrarPeloID } from "../controllers/controllersInfo.js"

const route = Router()


route.post("/mostrar", MostrarTodosControllers)
route.post("/cadastrar", CadastrarPokemonControllers)
route.get("/mostrar/:id", MostrarPeloID)


export default route
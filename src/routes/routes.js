import { Router } from "express"
import {MostrarPokemonPeloID, MostrarTodosPokemonsControllers, ExcluirPokemonControllers, CadastrarPokemonControllers} from "../controllers/controllersInfo.js"

const route = Router()


route.post("/mostrar", MostrarTodosPokemonsControllers)
route.post("/cadastrar", CadastrarPokemonControllers)
route.get("/mostrar/:id", MostrarPokemonPeloID)


export default route
import { Router } from "express"
import {MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarTodosTipagem, MostrarPokemonPeloID, MostrarTodasHabilidades,
    CadastrarPokemonControllers, ExcluirPokemonControllers, MostrarTodosAleatorioControllers} from "../controllers/controllersInfo.js"

const route = Router()

// rotas mostrar
route.post("/mostrar/pokemon", MostrarTodosPokemonsControllers)
route.post("/mostrar/categoria", MostrarTodasCategorias)
route.post("/mostrar/fraquezas", MostrarTodasFraquezas)
route.post("/mostrar/generos", MostrarTodosGeneros)
route.post("/mostrar/tipagem", MostrarTodosTipagem)
route.post("/mostrar/habilidades", MostrarTodasHabilidades)


route.post("/cadastrar", CadastrarPokemonControllers)
route.get("/mostrar/:id", MostrarPokemonPeloID)


export default route
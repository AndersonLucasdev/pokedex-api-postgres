import { Router } from "express"
import {MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    CadastrarPokemonControllers, CadastrarCategoria, CadastrarFraqueza, CadastrarTipagem,
    CadastrarHabilidade, ExcluirPokemonControllers, MostrarTodosAleatorioControllers} from "../controllers/controllersInfo.js"

const route = Router()

// rotas mostrar
route.post("/mostrar/pokemon", MostrarTodosPokemonsControllers)
route.post("/mostrar/categoria", MostrarTodasCategorias)
route.post("/mostrar/fraquezas", MostrarTodasFraquezas)
route.post("/mostrar/generos", MostrarTodosGeneros)
route.post("/mostrar/tipagem", MostrarTodosTipagem)
route.post("/mostrar/habilidades", MostrarTodasHabilidades)


// rotas cadastrar

route.post("/cadastrar/pokemon", CadastrarPokemonControllers)
route.post("/cadastrar/categoria", CadastrarCategoria)
route.post("/cadastrar/fraquezas", CadastrarFraqueza)
route.post("/cadastrar/tipagem", CadastrarTipagem)
route.post("/cadastrar/habilidades", CadastrarHabilidade)



route.get("/mostrar/:id", MostrarPokemonPeloID)


export default route
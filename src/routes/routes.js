import { Router } from "express"
import {MostrarTodosPokemonsControllers, MostrarTodosPokemonsAleatorio, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarPokemonPeloNome, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    MostrarTodosPokemonsFraquezas, MostrarTodosPokemonsTipagem,
    CadastrarPokemonControllers, CadastrarCategoria, CadastrarFraqueza, CadastrarTipagem, CadastrarHabilidade,
    ExcluirPokemonControllers, ExcluirCategoria, ExcluirFraqueza, ExcluirTipagem, ExcluirHabilidade} from "../controllers/controllersInfo.js"

const route = Router()

// rotas mostrar
route.get("/mostrar/pokemon", MostrarTodosPokemonsControllers)
route.get("/mostrar/categoria", MostrarTodasCategorias)
route.get("/mostrar/fraquezas", MostrarTodasFraquezas)
route.get("/mostrar/generos", MostrarTodosGeneros)
route.get("/mostrar/tipagem", MostrarTodosTipagem)
route.get("/mostrar/habilidades", MostrarTodasHabilidades)
route.get("/mostrar/:id", MostrarPokemonPeloID)
route.post("/mostrar/nome", MostrarPokemonPeloNome)
route.get("/mostrar_aleatorio", MostrarTodosPokemonsAleatorio)
route.post("/mostrar/por_tipagem", MostrarTodosPokemonsTipagem)
route.post("/mostrar/por_fraquezas", MostrarTodosPokemonsFraquezas)

// rotas cadastrar
route.post("/cadastrar/pokemon", CadastrarPokemonControllers)
route.post("/cadastrar/categoria", CadastrarCategoria)
route.post("/cadastrar/fraquezas", CadastrarFraqueza)
route.post("/cadastrar/tipagem", CadastrarTipagem)
route.post("/cadastrar/habilidades", CadastrarHabilidade)

// rotas excluir
route.delete("/excluir/pokemon", ExcluirPokemonControllers)
route.delete("/excluir/categoria", ExcluirCategoria)
route.delete("/excluir/fraqueza", ExcluirFraqueza)
route.delete("/excluir/tipagem", ExcluirTipagem)
route.delete("/excluir/habilidade", ExcluirHabilidade)



export default route
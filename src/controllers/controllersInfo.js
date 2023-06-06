import pool from "../database/db.js"

const MostrarTodosControllers = async (req, res) => {
    try {
        const Pokemons = await pool.query("SELECT * FROM pokemon_info")

        if (Pokemons.length === 0) {
            res.status(200).json({Mensagem: "Não há pokemons cadastrados."})
        }

        res.status(200).json(Pokemons)
        console.log(req.body) // tirar dps

    } catch (erro) {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarPeloID = async (req, res) => {
    try {
        const pokemon = req.pokemon

        res.status(200).json(pokemon)
    }

    catch (erro){
        return res.status(500).json({Message: erro.Message})
    }
}

const CadastrarPokemonControllers = async (req, res) => {

        const { 
            nome, descricao, altura, peso, categoria, genero, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade
        } = req.body

        if (!nome || !descricao || !altura || !peso || !categoria_id || !genero_id || !total || !hp || !ataque || !defesa || !especial_ataque || !especial_defesa || !velocidade) {
             res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400})
        } else {
            try {
                const verificaCategoria = pool.query("Select categorias from categoria")
                if (verificaCategoria === categoria) {
                    return res.status(200).json({Mensagem: "Categoria já cadastrada."})
                } else {
                    const insereCategoria = pool.query("Insert into categorias Values($1)," [categoria_id])
                } if (verificaTipo === tipo) {
                    return res.status(200).json({Mensagem: "Tipo já cadastrada."})
                } else {
                    const insereGenero = pool.query("Insert into generos Values($1)," [genero_id])
                }  

                const CadastroPokemon = pool.query("INSERT INTO pokemon_info Values($1, $2, $3, $4, $5, $6, $7, $8, $9 $10 $11)," [nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, velocidade])
                if (!verificaTipo) {

                }
                res.status(200).json(
                    {
                        user: {
                            id: CadastroPokemon._id,
                            nome,
                            tipo,
                            fraqueza, 
                            habilidade, 
                            descricao, 
                            altura, 
                            peso, 
                            categoria_id, 
                            genero_id, 
                            total, 
                            hp, 
                            ataque 
                        },
                        Mensagem: "Pokemon cadastrado com sucesso."
                })
            }
                catch (erro) {
                    return res.status(500).json({Mensagem:"Erro ao cadastrar pokemon."})
                }
        } 
    }

export {
    MostrarTodosControllers, CadastrarPokemonControllers
}
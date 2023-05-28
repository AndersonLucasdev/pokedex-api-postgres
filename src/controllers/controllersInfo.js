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

        // const Pokemon = req
    
    }
    catch {

    }

}


const CadastrarPokemonControllers = async (req, res) => {

        const { 
            nome, tipo, fraqueza, habilidade, descricao, altura, peso, categoria_id, genero_id, total, hp , ataque 
        } = req.body

        if (!nome || !tipo || !fraqueza || !habilidade || !descricao || !altura || !peso || !categoria_id || !genero_id || !total || !hp || !ataque ) {
            res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400})

        } else {
            try {
                console.log("oi")
                // if (nome === pool.query("select nome from pokemon_info" || )) aqui vai verificar o nome
                const CadastroPokemon = pool.query(`INSERT INTO pokemon_info (pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade)
                VALUES (${req.body})`)
                // ${req.body.pokemon_info_id},'${req.body.nome}','${req.body.descricao}',${req.body.altura},${req.body.peso},${req.body.categoria_id}, ${req.body.genero_id},${req.body.total},${req.body.hp},${req.body.ataque},${req.body.defesa},${req.body.especial_ataque},${req.body.especial_defesa},${req.body.velocidade}

                if (!CadastroPokemon) {
                    res.status(200).json({Mensagem: "Erro no cadastro do pokemon.", status:400})
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
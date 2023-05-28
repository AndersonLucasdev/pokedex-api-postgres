const pool = require("../database/db")




const mostrarPokemonControllers = async (req, res) => {
    try {
        const novoPokemon = await pool.query("SELECT * FROM pokemon_info")
        res.json(novoPokemon)
        console.log(req.body)

    } catch (erro) {
        console.log(erro.message)
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
            }
            catch (erro) {
                return res.status(500).json({Mensagem:"Erro ao cadastrar pokemon."})
            }
        }

}

module.exports = {
    mostrarPokemonControllers, CadastrarPokemonControllers
}

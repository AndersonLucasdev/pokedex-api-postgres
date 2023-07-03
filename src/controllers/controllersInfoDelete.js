import pool from "../database/db.js"
import primeiraLetraMaiuscula from './controllersInfo.js'

// funções de exclusão
const ExcluirCategoria = async (req, res) => {
    const {
      categoria
    } = req.body
  
    try {
        if (!categoria) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const novaCategoria = primeiraLetraMaiuscula(categoria)


        let categoria_id;
        const verificaCategoria = await pool.query(
        'SELECT categoria_id FROM categorias WHERE categoria = $1',
        [novaCategoria]
        );
        // o id da categoria é pegada e comparada
        categoria_id = verificaCategoria.rows[0].categoria_id;

        // verifica se algum pokemon tem essa categoria
        const verificaPokemonTemCategoria = await pool.query(
        'SELECT categoria_id FROM pokemon_info WHERE categoria_id = $1',
        [categoria_id]
        );

        if (verificaPokemonTemCategoria.rows.length === 0) {
        await pool.query(
            'Delete from categorias where categoria_id = ($1)',
            [categoria_id]
        );
        return res.status(200).json({Mensagem: 'Categoria excluida com sucesso.' });
        } else {

        return res.status(200).json({Message: "A categoria está sendo usada!", status: 400})

        }

    } catch (erro){
        res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
    }
}

const ExcluirFraqueza = async (req, res) => {
    const {
        fraqueza
    } = req.body

    try {
        if (!fraqueza) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const NovaFraqueza = primeiraLetraMaiuscula(fraqueza)

        let fraquezas_id;
        const verificaFraqueza = await pool.query(
        'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
        [NovaFraqueza]
        );
        // o id da categoria é pegada e comparada
        fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;

        // verifica se algum pokemon tem essa categoria
        const verificaPokemonTemFraqueza = await pool.query(
        'SELECT pokemon_fraqueza_id FROM pokemon_fraquezas WHERE fraquezas_id = $1',
        [fraquezas_id]
        );
        
        
        if (verificaPokemonTemFraqueza.rows.length === 0) {
        await pool.query(
            'Delete from fraquezas WHERE fraquezas_id = $1',
            [fraquezas_id]
        );

        res.status(200).json({Mensagem: 'Categoria excluida com sucesso.' });
        } else {

        return res.status(200).json({Message: "A categoria está sendo usada!", status: 400})
        
        }

    } catch (erro){
        return res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
    }
}

const ExcluirHabilidade = async (req, res) => {
    const {
        habilidade
    } = req.body

    try {
        if (!habilidade) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const NovaHabilidade = primeiraLetraMaiuscula(habilidade)

        let habilidade_id;
        const verificaHabilidade = await pool.query(
        'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
        [NovaHabilidade]
        );
        
        // o id da categoria é pegada e comparada
        habilidade_id = verificaHabilidade.rows[0].habilidade_id;

        // verifica se algum pokemon tem essa categoria
        const verificaPokemonTemHabilidade = await pool.query(
        'SELECT pokemon_habilidades_id FROM pokemon_habilidades WHERE habilidade_id = $1',
        [habilidade_id]
        );
        
        
        if (verificaPokemonTemHabilidade.rows.length === 0) {
        await pool.query(
            'Delete from habilidades WHERE habilidade_id = $1',
            [habilidade_id]
        );
        res.status(200).json({Mensagem: 'Habilidade excluida com sucesso.' });
        } else {
        return res.status(200).json({Message: "A Habilidade está sendo usada!", status: 400})
        
        }

    } catch (erro){
        res.status(500).json({ Mensagem: 'Erro ao excluir habilidade.', erro });
    }
}

const ExcluirTipagem = async (req, res) => {
    const {
        tipagem
    } = req.body

    try {
        if (!tipagem) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const NovaTipagem = primeiraLetraMaiuscula(tipagem)

        let tipagem_id;
        const verificaTipagem = await pool.query(
        'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
        [NovaTipagem]
        );
        // o id da categoria é pegada e comparada
        tipagem_id = verificaTipagem.rows[0].tipagem_id;

        // verifica se algum pokemon tem essa categoria
        const verificaPokemonTemTipo = await pool.query(
        'SELECT pokemon_tipagem_id FROM pokemon_tipagem WHERE tipagem_id = $1',
        [tipagem_id]
        );
        
        
        if (verificaPokemonTemTipo.rows.length === 0) {
        await pool.query(
            'Delete from tipagem WHERE tipagem_id = $1',
            [tipagem_id]
        );
        return res.status(200).json({Mensagem: 'Tipagem excluida com sucesso.' });
        } else {
        return res.status(200).json({Message: "A Tipagem está sendo usada!", status: 400})
        
        }

    } catch (erro){
        return res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
    }
}

const ExcluirPokemonControllers = async (req, res) => {
    try {
        const {pokemon_info_id} = req

        if (!pokemon_info_id) {
            return res.status(200).json({Mensagem: 'Id não informado.', status:400})
        }

        // excluido pokemon dos relacionamentos
        // excluindo relacionamento fraquezas
        await pool.query(`DELETE FROM pokemon_fraquezas WHERE pokemon_info_id = ${pokemon_info_id}`)

        // excluindo relacionamento habilidades
        await pool.query(`DELETE FROM pokemon_habilidades WHERE pokemon_info_id = ${pokemon_info_id}`)
        
        // excluindo relacionamento tipagem
        await pool.query(`DELETE FROM pokemon_tipagem WHERE pokemon_info_id = ${pokemon_info_id}`)
        

        // excluindo pokemon
        await pool.query(`DELETE FROM pokemon_info WHERE pokemon_info_id = ${pokemon_info_id}`)


        return res.status(200).json({Mensagem: "Pokemon excluida com sucesso."})
    }

    catch (erro){
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

export {
    ExcluirPokemonControllers, ExcluirCategoria, ExcluirFraqueza, ExcluirTipagem, ExcluirHabilidade
}
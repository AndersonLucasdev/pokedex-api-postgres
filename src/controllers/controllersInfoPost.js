import pool from "../database/db.js"
import primeiraLetraMaiuscula from './controllersInfo.js'

// função de cadastrar pokemon
const CadastrarCategoria = async (req, res) => {
    const {
      categoria, imagem_categoria, descricao
    } = req.body

    try {
        if (!categoria || !imagem_categoria || descricao) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const nova_categoria = primeiraLetraMaiuscula(categoria)
        const nova_categoria_imagem = imagem_categoria.trim()
        const nova_descricao = descricao.trim()

        let categoria_id;
        const verificaCategoria = await pool.query(
        'SELECT categoria_id FROM categorias WHERE categoria = $1',
        [nova_categoria]
        );

        if (verificaCategoria.rows.length > 0) {
        categoria_id = verificaCategoria.rows[0].categoria_id;
        } else {
        const cadastroCategoria = await pool.query(
            'INSERT INTO categorias (categoria, imagem_categoria, descricao) VALUES ($1, $2, $3)',
            [nova_categoria, nova_categoria_imagem, nova_descricao]
        );
        categoria_id = cadastroCategoria.rows[0].categoria_id;
        }
        return res.status(200).json({Mensagem: 'Categoria cadastrado com sucesso.' });
    } catch (erro){
        return res.status(500).json({ Mensagem: 'Erro ao cadastrar categoria.', erro });
    }
}

const CadastrarFraqueza = async (req, res) => {
    const {
        fraqueza, imagem_fraqueza, descricao
    } = req.body

    try {
        if (!fraqueza || !imagem_fraqueza || !descricao) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const nova_fraqueza = primeiraLetraMaiuscula(fraqueza)
        const nova_imagem_fraqueza = imagem_fraqueza.trim()
        const nova_descricao = descricao.trim()

        let fraquezas_id;
        const verificaFraqueza = await pool.query(
            'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
            [nova_fraqueza]
        );

        if (verificaFraqueza.rows.length > 0) {
            fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
        } else {
            const cadastroFraqueza = await pool.query(
            'INSERT INTO fraquezas (fraqueza, imagem_fraqueza) VALUES ($1, $2, $3)',
            [nova_fraqueza, nova_imagem_fraqueza, nova_descricao]
            );
            fraquezas_id = cadastroFraqueza.rows[0].fraquezas_id;
        }

        return res.status(200).json({Mensagem: 'Fraqueza cadastrado com sucesso.' });
    } catch (erro){
        return res.status(500).json({ Mensagem: 'Erro ao cadastrar fraqueza.', erro });
    }
}

const CadastrarHabilidade = async (req, res) => {
    const {
        habilidade, imagem_habilidade, descricao
    } = req.body

    try {
        if (!habilidade || ! imagem_habilidade || descricao) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const nova_habilidade = primeiraLetraMaiuscula(habilidade)
        const nova_imagem_habilidade = imagem_habilidade.trim()
        const nova_descricao = descricao.trim()
        let habilidade_id;
        const verificaHabilidade = await pool.query(
        'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
        [nova_habilidade]
        );

        if (verificaHabilidade.rows.length > 0) {
        habilidade_id = verificaHabilidade.rows[0].habilidade_id;
        } else {
        const cadastroHabilidade = await pool.query(
            'INSERT INTO habilidades (habilidade, imagem_habilidade) VALUES ($1, $2, $3)',
            [nova_habilidade, nova_imagem_habilidade, nova_descricao]
        );
        habilidade_id = cadastroHabilidade.rows[0].habilidade_id;
        }

        return res.status(200).json({Mensagem: 'Habilidade cadastrado com sucesso.' });
    } catch (erro){
        return res.status(500).json({ Mensagem: 'Erro ao cadastrar habilidade.', erro });
    }
}

const CadastrarTipagem = async (req, res) => {
    const {
        tipagem, imagem_tipagem, descricao
    } = req.body

    try {
        if (!tipagem || !imagem_tipagem || !descricao) {
        return res.status(200).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const nova_tipagem = primeiraLetraMaiuscula(tipagem)
        const nova_imagem_habilidade = imagem_tipagem.trim()
        const nova_descricao = descricao.trim()

        let tipagem_id;
        const verificaTipagem = await pool.query(
        'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
        [nova_tipagem]
        );

        if (verificaTipagem.rows.length > 0) {
        tipagem_id = verificaTipagem.rows[0].tipagem_id;
        } else {
        const cadastroTipagem = await pool.query(
            'INSERT INTO tipagem (tipo) VALUES ($1, $2, $3)',
            [nova_tipagem, nova_imagem_habilidade, nova_descricao]
        );
        tipagem_id = cadastroTipagem.rows[0].tipagem_id;
        }

        return res.status(200).json({Mensagem: 'Tipo cadastrado com sucesso.' });
    } catch (erro){
        return res.status(500).json({ Mensagem: 'Erro ao cadastrar tipo.', erro });
    }
}

const CadastrarPokemonControllers = async (req, res) => {
    const {
        nome,
        descricao,
        altura,
        peso,
        categoria,
        genero,
        hp,
        ataque,
        defesa,
        especial_ataque,
        especial_defesa,
        velocidade,
        imagem,
        numero_pokemon,
        fraqueza,
        habilidade,
        tipagem
    } = req.body;

    // Formatar os campos
    const nomeFormatado = primeiraLetraMaiuscula(nome);
    const descricaoFormatada = primeiraLetraMaiuscula(descricao);
    const alturaFormatada = String(altura).trim();
    const pesoFormatado = String(peso).trim();
    const categoriaFormatada = primeiraLetraMaiuscula(categoria);
    const generoFormatado = primeiraLetraMaiuscula(genero);
    const hpFormatado = String(hp).trim();
    const ataqueFormatado = String(ataque).trim();
    const defesaFormatada = String(defesa).trim();
    const especialAtaqueFormatado = String(especial_ataque).trim();
    const especialDefesaFormatada = String(especial_defesa).trim();
    const velocidadeFormatada = String(velocidade).trim();
    const imagemFormatada = imagem.trim();
    const numeroPokemonFormatado = String(numero_pokemon).trim();

    try {
        if (
        !nomeFormatado ||
        !descricaoFormatada ||
        !alturaFormatada ||
        !pesoFormatado ||
        !categoriaFormatada ||
        !generoFormatado ||
        !hpFormatado ||
        !ataqueFormatado ||
        !defesaFormatada ||
        !especialAtaqueFormatado ||
        !especialDefesaFormatada ||
        !velocidadeFormatada ||
        !fraqueza ||
        !habilidade ||
        !tipagem ||
        !imagemFormatada ||
        !numeroPokemonFormatado
        ) {
            return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }
        let total = (parseFloat(ataque) + parseFloat(defesa) + parseFloat(hp) + parseFloat(especialAtaqueFormatado) + parseFloat(especialDefesaFormatada) + parseFloat(velocidade)) / 6


        // Verifica categoria
        let categoria_id;
        const verificaCategoria = await pool.query(
        'SELECT categoria_id FROM categorias WHERE categoria = $1',
        [categoriaFormatada]
        );
        categoria_id = verificaCategoria.rows[0].categoria_id;
        

        // Verifica fraqueza
        let fraquezas_id;
        const list_fraqueza_id = [];

        for (let i = 0; i < fraqueza.length; i++) {
        const fraqueza_nome = fraqueza[i];
        const fraquezaFormatada = primeiraLetraMaiuscula(fraqueza_nome);
        const verificaFraqueza = await pool.query(
            'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
            [fraquezaFormatada]
        );
        fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
        list_fraqueza_id.push(fraquezas_id);  
        }

        // Verifica habilidade
        let habilidade_id;
        const list_habilidade_id = [];

        for (let i = 0; i < habilidade.length; i++) {
        const habilidade_nome = habilidade[i];
        const habilidadeFormatada = primeiraLetraMaiuscula(habilidade_nome);
        const verificaHabilidade = await pool.query(
            'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
            [habilidadeFormatada]
        );
        habilidade_id = verificaHabilidade.rows[0].habilidade_id;
        list_habilidade_id.push(habilidade_id);
        }

        // Verifica genero
        let genero_id;
        const verificaGenero = await pool.query(
        'SELECT genero_id FROM generos WHERE genero = $1',
        [generoFormatado]
        );

        if (verificaGenero.rows.length > 0) {
        genero_id = verificaGenero.rows[0].genero_id;
        } else {
        return res.status(200).json({ Mensagem: 'Gênero inválido.', status: 400 });
        }

        // Verifica tipagem
        let tipagem_id;
        const list_tipagem_id = [];

        for (let i = 0; i < tipagem.length; i++) {
        const tipagem_nome = tipagem[i];
        const verificaTipagem = await pool.query(
            'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
            [tipagem_nome]
        );
        tipagem_id = verificaTipagem.rows[0].tipagem_id;
        list_tipagem_id.push(tipagem_id);
        }

        const verificaNumeroPokemon = await pool.query(
        'SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1',
        [numeroPokemonFormatado]
        );

        if (verificaNumeroPokemon.rows.length > 0) {
        return res.status(200).json({Mensagem: 'Número pokemon já cadastrado!', status: 400 });
        }

        // Inserindo nas tabelas
        const CadastroPokemon = await pool.query(
            `INSERT INTO pokemon_info (
            nome,
            descricao,
            altura,
            peso,
            categoria_id,
            genero_id,
            total,
            hp,
            ataque,
            defesa,
            especial_ataque,
            especial_defesa,
            velocidade,
            imagem,
            numero_pokemon
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING pokemon_info_id`,
            [
            nomeFormatado,
            descricaoFormatada,
            alturaFormatada,
            pesoFormatado,
            categoria_id,
            genero_id,
            total,
            hpFormatado,
            ataqueFormatado,
            defesaFormatada,
            especialAtaqueFormatado,
            especialDefesaFormatada,
            velocidadeFormatada,
            imagemFormatada,
            numeroPokemonFormatado
            ]
        );

        const pokemon_info_id = CadastroPokemon.rows[0].pokemon_info_id;

        // Relacionando as tabelas

        for (const fraqueza_id of list_fraqueza_id) {
            await pool.query(
            'INSERT INTO pokemon_fraquezas (pokemon_info_id, fraquezas_id) VALUES ($1, $2)',
            [pokemon_info_id, fraqueza_id]
            );
        }

        for (const habilidade_id of list_habilidade_id) {
            await pool.query(
            'INSERT INTO pokemon_habilidades (pokemon_info_id, habilidade_id) VALUES ($1, $2)',
            [pokemon_info_id, habilidade_id]
            );
        }

        for (const tipagem_id of list_tipagem_id) {
            await pool.query(
            'INSERT INTO pokemon_tipagem (pokemon_info_id, tipagem_id) VALUES ($1, $2)',
            [pokemon_info_id, tipagem_id]
            );
        }

        return res.status(200).json({ Mensagem: 'Pokemon cadastrado com sucesso.' });
        } catch (erro) {
         return res.status(500).json({ Mensagem: 'Erro ao cadastrar pokemon.', erro });
        }
};


export {
    CadastrarCategoria, CadastrarFraqueza, CadastrarHabilidade, CadastrarTipagem, CadastrarPokemonControllers
}
import pool from "../database/db.js"


// funções mostrar
const MostrarTodosPokemonsControllers = async (req, res) => {
    try {
        const Pokemons = await pool.query(`SELECT
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon,
        string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
        string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
        string_agg(DISTINCT h.habilidade, ', ') as habilidades,
        string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
        string_agg(DISTINCT t.tipo, ', ') as tipos,
        string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
    FROM
        pokemon_info p
        INNER JOIN categorias c ON p.categoria_id = c.categoria_id
        INNER JOIN generos g ON p.genero_id = g.genero_id
        INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
        INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
        INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
        INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
        INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
        INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
    GROUP BY
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon
        
    order by p.numero_pokemon
    `)
        
        if (Pokemons.length === 0) {
            res.status(200).json({Mensagem: "Não há pokemons cadastrados.", status:400})
        }

        res.status(200).json(Pokemons.rows)

    } catch (erro) {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarTodasCategorias = async (req, res) => {
try {
    const Categorias = await pool.query("SELECT * FROM categorias")
    

    if (Categorias.length === 0) {
    return res.status(200).json({Mensagem: "Não há categorias cadastrados.", status:400})
    }

    return res.status(200).json(Categorias.rows)

    } catch (erro) {
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarTodasFraquezas = async (req, res) => {
try {
    const fraquezas = await pool.query("SELECT * FROM fraquezas")
    

    if (fraquezas.length === 0) {
    return res.status(200).json({Mensagem: "Não há fraquezas cadastrados.", status:400})
    }

    return res.status(200).json(fraquezas.rows)

    } catch (erro) {
    return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarTodosGeneros = async (req, res) => {
try {
    const generos = await pool.query("SELECT * FROM generos")
    

    if (generos.length === 0) {
    return res.status(200).json({Mensagem: "Não há generos cadastrados.", status:400})
    }

    return res.status(200).json(generos.rows)

    } catch (erro) {
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarTodasHabilidades = async (req, res) => {
try {
    const habilidades = await pool.query("SELECT * FROM habilidades")
    

    if (habilidades.length === 0) {
    return res.status(200).json({Mensagem: "Não há habilidades cadastrados.", status:400})
    }

    return res.status(200).json(habilidades.rows)

    } catch (erro) {
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarTodosTipagem = async (req, res) => {
try {
    const tipagem = await pool.query("SELECT * FROM tipagem")
    

    if (tipagem.length === 0) {
        return res.status(200).json({Mensagem: "Não há tipos cadastrados.", status:400})
    }

    return res.status(200).json(tipagem.rows)


    }catch (erro) {
     return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarPokemonPeloID = async (req, res) => {
    try {
        const pokemon = await pool.query(`SELECT
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon,
        string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
        string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
        string_agg(DISTINCT h.habilidade, ', ') as habilidades,
        string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
        string_agg(DISTINCT t.tipo, ', ') as tipos,
        string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
    FROM
        pokemon_info p
        INNER JOIN categorias c ON p.categoria_id = c.categoria_id
        INNER JOIN generos g ON p.genero_id = g.genero_id
        INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
        INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
        INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
        INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
        INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
        INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
    WHERE
        p.pokemon_info_id = ${req.params.id}
    GROUP BY
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon
        ;`)
        res.status(200).json(pokemon.rows[0])    
    }

    catch (erro){
        return res.status(500).json({Message: erro.Message})
    }
}

// mostrar todos os pokemons com características espécificas
const MostrarTodosPokemonsFraquezas = async (req, res) => {
    const { fraqueza } = req.body;

    try {
        if (!fraqueza) {
        return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
        }

        const pokemon = await pool.query(
        `SELECT
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon,
        string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
        string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
        string_agg(DISTINCT h.habilidade, ', ') as habilidades,
        string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
        string_agg(DISTINCT t.tipo, ', ') as tipos,
        string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
    FROM
        pokemon_info p
        INNER JOIN categorias c ON p.categoria_id = c.categoria_id
        INNER JOIN generos g ON p.genero_id = g.genero_id
        INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
        INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
        INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
        INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
        INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
        INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
        WHERE fraqueza = $1 
        GROUP BY
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon
        ORDER BY numero_pokemon`,
        [fraqueza]
        );

        return res.status(200).json(pokemon.rows);
    } catch (erro) {
        return res.status(500).json({ Mensagem: erro.message });
    }
}

const MostrarTodosPokemonsTipagem = async (req, res) => {
    const { tipagem } = req.body;

    try {
    if (!tipagem) {
        return res.status(200).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const pokemon = await pool.query(
        `SELECT
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon,
        string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
        string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
        string_agg(DISTINCT h.habilidade, ', ') as habilidades,
        string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
        string_agg(DISTINCT t.tipo, ', ') as tipos,
        string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
    FROM
        pokemon_info p
        INNER JOIN categorias c ON p.categoria_id = c.categoria_id
        INNER JOIN generos g ON p.genero_id = g.genero_id
        INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
        INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
        INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
        INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
        INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
        INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
        WHERE tipo = $1 
    GROUP BY
        p.pokemon_info_id,
        p.nome,
        p.descricao,
        p.altura,
        p.peso,
        c.categoria,
        g.genero,
        p.total,
        p.hp,
        p.ataque,
        p.defesa,
        p.especial_ataque,
        p.especial_defesa,
        p.velocidade,
        p.imagem,
        p.numero_pokemon
        ORDER BY numero_pokemon`,
        [tipagem]
    );

    return res.status(200).json(pokemon.rows);
    } catch (erro) {
        return res.status(500).json({ Mensagem: erro.message });
    }
}

const MostrarPokemonPeloNome = async (req, res) => {
    const { nome } = req.body;

    try {
        const pokemon = await pool.query(`
            SELECT
            p.pokemon_info_id,
            p.nome,
            p.descricao,
            p.altura,
            p.peso,
            c.categoria,
            string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
            g.genero,
            p.total,
            p.hp,
            p.ataque,
            p.defesa,
            p.especial_ataque,
            p.especial_defesa,
            p.velocidade,
            p.imagem,
            p.numero_pokemon,
            string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
            string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
            string_agg(DISTINCT h.habilidade, ', ') as habilidades,
            string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
            string_agg(DISTINCT t.tipo, ', ') as tipos,
            string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
        FROM
            pokemon_info p
            INNER JOIN categorias c ON p.categoria_id = c.categoria_id
            INNER JOIN generos g ON p.genero_id = g.genero_id
            INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
            INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
            INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
            INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
            INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
            INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
            WHERE
                nome ILIKE '%' || '${nome}' || '%'
            GROUP BY
                p.pokemon_info_id,
                p.nome,
                p.descricao,
                p.altura,
                p.peso,
                c.categoria,
                g.genero,
                p.total,
                p.hp,
                p.ataque,
                p.defesa,
                p.especial_ataque,
                p.especial_defesa,
                p.velocidade,
                p.imagem,
                p.numero_pokemon
            ORDER BY
                numero_pokemon;
        `);

        if (pokemon.rows.length === 0) {
            return res.status(200).json({ mensagem: 'Pokemon(s) não encontrado(s)', status:400 });
        }

        return res.status(200).json(pokemon.rows);
    } catch (error) {
        console.error('Erro ao buscar Pokémon por nome:', error);
        return res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor' });
    }
}

const MostrarTodosPokemonsAleatorio = async (req, res) => {
    try{

        const Pokemons = await pool.query(`SELECT
            p.pokemon_info_id,
            p.nome,
            p.descricao,
            p.altura,
            p.peso,
            c.categoria,
            string_agg(DISTINCT c.imagem_categoria, ', ') as img_categoria,
            g.genero,
            p.total,
            p.hp,
            p.ataque,
            p.defesa,
            p.especial_ataque,
            p.especial_defesa,
            p.velocidade,
            p.imagem,
            p.numero_pokemon,
            string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
            string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
            string_agg(DISTINCT h.habilidade, ', ') as habilidades,
            string_agg(DISTINCT h.imagem_habilidade, ', ') as img_habilidade,
            string_agg(DISTINCT t.tipo, ', ') as tipos,
            string_agg(DISTINCT t.imagem_tipagem, ', ') as img_tipo
        FROM
            pokemon_info p
            INNER JOIN categorias c ON p.categoria_id = c.categoria_id
            INNER JOIN generos g ON p.genero_id = g.genero_id
            INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id
            INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id
            INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id
            INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id
            INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id
            INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id
        GROUP BY
            p.pokemon_info_id,
            p.nome,
            p.descricao,
            p.altura,
            p.peso,
            c.categoria,
            g.genero,
            p.total,
            p.hp,
            p.ataque,
            p.defesa,
            p.especial_ataque,
            p.especial_defesa,
            p.velocidade,
            p.imagem,
            p.numero_pokemon
            ORDER BY RANDOM()`
        )

        if (Pokemons.length === 0) {
        return res.status(200).json({Mensagem: "Não há pokemons cadastrados.", status:400})
        }

        return res.status(200).json(Pokemons.rows)

    } catch {
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

export {
    MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarPokemonPeloNome, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    MostrarTodosPokemonsFraquezas, MostrarTodosPokemonsTipagem, MostrarTodosPokemonsAleatorio
}
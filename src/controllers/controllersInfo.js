import pool from "../database/db.js"

const MostrarTodosControllers = async (req, res) => {
    try {
        const Pokemons = await pool.query("SELECT * FROM pokemon_info")
        

        if (Pokemons.length === 0) {
            res.status(200).json({Mensagem: "Não há pokemons cadastrados."})
        }

        res.status(200).json(Pokemons.rows)

    } catch (erro) {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const MostrarPeloID = async (req, res) => {
    try {
        const pokemon = await pool.query(`SELECT pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade
        FROM public.pokemon_info
        WHERE pokemon_info_id = ${req.params.id}`)
        console.log(pokemon.rows[0])
        res.status(200).json(pokemon.rows[0])
    }

    catch (erro){
        return res.status(500).json({Message: erro.Message})
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
      total,
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
  
    try {
      if (
        !nome ||
        !descricao ||
        !altura ||
        !peso ||
        !categoria ||
        !genero ||
        !total ||
        !hp ||
        !ataque ||
        !defesa ||
        !especial_ataque ||
        !especial_defesa ||
        !velocidade ||
        !fraqueza ||
        !habilidade ||
        !tipagem ||
        !imagem ||
        !numero_pokemon
      ) {
        return res.status(400).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
      }
  
      // Verifica categoria
      let categoria_id;
      const verificaCategoria = await pool.query(
        'SELECT categoria_id FROM categorias WHERE categoria = $1',
        [categoria]
      );
  
      if (verificaCategoria.rows.length > 0) {
        categoria_id = verificaCategoria.rows[0].categoria_id;
      } else {
        const cadastroCategoria = await pool.query(
          'INSERT INTO categorias (categoria) VALUES ($1) RETURNING categoria_id',
          [categoria]
        );
        categoria_id = cadastroCategoria.rows[0].categoria_id;
      }
  
      // Verifica fraqueza
      let fraquezas_id;
      const verificaFraqueza = await pool.query(
        'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
        [fraqueza]
      );
  
      if (verificaFraqueza.rows.length > 0) {
        fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
      } else {
        const cadastroFraqueza = await pool.query(
          'INSERT INTO fraquezas (fraqueza) VALUES ($1) RETURNING fraquezas_id',
          [fraqueza]
        );
        fraquezas_id = cadastroFraqueza.rows[0].fraquezas_id;
      }
  
      // Verifica habilidade
      let habilidade_id;
      const verificaHabilidade = await pool.query(
        'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
        [habilidade]
      );
  
      if (verificaHabilidade.rows.length > 0) {
        habilidade_id = verificaHabilidade.rows[0].habilidade_id;
      } else {
        const cadastroHabilidade = await pool.query(
          'INSERT INTO habilidades (habilidade) VALUES ($1) RETURNING habilidade_id',
          [habilidade]
        );
        habilidade_id = cadastroHabilidade.rows[0].habilidade_id;
      }
  
      // Verifica tipagem
      let tipagem_id;
      const verificaTipagem = await pool.query(
        'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
        [tipagem]
      );
  
      if (verificaTipagem.rows.length > 0) {
        tipagem_id = verificaTipagem.rows[0].tipagem_id;
      } else {
        const cadastroTipagem = await pool.query(
          'INSERT INTO tipagem (tipo) VALUES ($1) RETURNING tipagem_id',
          [tipagem]
        );
        tipagem_id = cadastroTipagem.rows[0].tipagem_id;
      }
  
      // Verifica genero
      let genero_id;
      const verificaGenero = await pool.query(
        'SELECT genero_id FROM generos WHERE genero = $1',
        [genero]
      );
  
      if (verificaGenero.rows.length > 0) {
        genero_id = verificaGenero.rows[0].genero_id;
      } else {
        return res.status(400).json({ Mensagem: 'Gênero inválido.', status: 400 });
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
        ]
      );
  
      const pokemon_info_id = CadastroPokemon.rows[0].pokemon_info_id;
  
      // Relacionando as tabelas
      await pool.query(
        'INSERT INTO pokemon_fraquezas (pokemon_info_id, fraquezas_id) VALUES ($1, $2)',
        [pokemon_info_id, fraquezas_id]
      );
  
      await pool.query(
        'INSERT INTO pokemon_habilidades (pokemon_info_id, habilidade_id) VALUES ($1, $2)',
        [pokemon_info_id, habilidade_id]
      );
  
      await pool.query(
        'INSERT INTO pokemon_tipagem (pokemon_info_id, tipagem_id) VALUES ($1, $2)',
        [pokemon_info_id, tipagem_id]
      );
  
      res.status(200).json({ Mensagem: 'Pokemon cadastrado com sucesso.' });
    } catch (erro) {
      res.status(500).json({ Mensagem: 'Erro ao cadastrar pokemon.', erro });
    }
  };

    
    
    

export {
    MostrarTodosControllers, CadastrarPokemonControllers, MostrarPeloID
}
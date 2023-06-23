import pool from "../database/db.js"


// funções get
const MostrarTodosPokemonsControllers = async (req, res) => {
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

const MostrarTodasCategorias = async (req, res) => {
  try {
    const Categorias = await pool.query("SELECT * FROM categorias")
    

    if (Categorias.length === 0) {
        res.status(200).json({Mensagem: "Não há categorias cadastrados."})
    }

    res.status(200).json(Categorias.rows)

} catch (erro) {
    res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodasFraquezas = async (req, res) => {
  try {
    const fraquezas = await pool.query("SELECT * FROM fraquezas")
    

    if (fraquezas.length === 0) {
        res.status(200).json({Mensagem: "Não há fraquezas cadastrados."})
    }

    res.status(200).json(fraquezas.rows)

} catch (erro) {
    res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodosGeneros = async (req, res) => {
  try {
    const generos = await pool.query("SELECT * FROM generos")
    

    if (generos.length === 0) {
        res.status(200).json({Mensagem: "Não há generos cadastrados."})
    }

    res.status(200).json(generos.rows)

} catch (erro) {
    res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarTodasHabilidades = async (req, res) => {
  try {
    const habilidades = await pool.query("SELECT * FROM habilidades")
    

    if (habilidades.length === 0) {
        res.status(200).json({Mensagem: "Não há habilidades cadastrados."})
    }

    res.status(200).json(habilidades.rows)

} catch (erro) {
    res.status(500).json({Mensagem: erro.Mensagem})
}
}

const MostrarPokemonPeloID = async (req, res) => {
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


// função de cadastrar pokemon

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



// funções de exclusão

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


    res.status(200).json({Mensagem: "Obra excluida com sucesso.", excluido})
}

catch (erro){
    res.status(500).json({Mensagem: erro.Mensagem})
}
}

// const Excluir


const MostrarTodosAleatorioControllers = async (req, res) => {
  try {
    const Pokemons = await pool.query("SELECT p.pokemon_info_id, p.nome, p.descricao,p.altura,p.peso,c.categoria,g.genero,p.total,p.hp,p.ataque,p.defesa,p.especial_ataque,p.especial_defesa,p.velocidade,p.imagem,p.numero_pokemon,f.fraqueza,h.habilidade,t.tipo  FROM pokemon_info p INNER JOIN categorias c ON p.categoria_id = c.categoria_id INNER JOIN generos g ON p.genero_id = g.genero_id INNER JOIN pokemon_fraquezas pf ON p.pokemon_info_id = pf.pokemon_info_id INNER JOIN fraquezas f ON pf.fraquezas_id = f.fraquezas_id INNER JOIN pokemon_habilidades ph ON p.pokemon_info_id = ph.pokemon_info_id INNER JOIN habilidades h ON ph.habilidade_id = h.habilidade_id INNER JOIN pokemon_tipagem pt ON p.pokemon_info_id = pt.pokemon_info_id INNER JOIN tipagem t ON pt.tipagem_id = t.tipagem_id;  ")
    

    if (Pokemons.length === 0) {
        res.status(200).json({Mensagem: "Não há pokemons cadastrados."})
    }

    res.status(200).json(Pokemons.rows)

} catch (erro) {
    res.status(500).json({Mensagem: erro.Mensagem})
}
}
    
    

export {
    MostrarTodosPokemonsControllers,CadastrarPokemonControllers,MostrarPokemonPeloID, ExcluirPokemonControllers, MostrarTodosAleatorioControllers
}
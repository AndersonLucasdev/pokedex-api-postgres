import pool from "../database/db.js"


// funções mostrar
const MostrarTodosPokemonsControllers = async (req, res) => {
   try {
        const Pokemons = await pool.query(`SELECT pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade, imagem, numero_pokemon
        FROM public.pokemon_info order by numero_pokemon;
      
      `)
        
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

const MostrarTodosTipagem = async (req, res) => {
  try {
    const tipagem = await pool.query("SELECT * FROM tipagem")
    
  
    if (tipagem.length === 0) {
        res.status(200).json({Mensagem: "Não há tipos cadastrados."})
    
  
    res.status(200).json(tipagem.rows)

  }

}catch (erro) {
  res.status(500).json({Mensagem: erro.Mensagem})
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
        f.fraqueza,
        h.habilidade,
        t.tipo
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
        p.pokemon_info_id = ${req.params.id};`)
        
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
      return res.status(400).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const pokemon = await pool.query(
      `SELECT pi.pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade, imagem, numero_pokemon 
      FROM pokemon_info pi 
      INNER JOIN pokemon_fraquezas pf ON pf.pokemon_info_id = pi.pokemon_info_id 
      INNER JOIN fraquezas t ON t.fraquezas_id = pf.fraquezas_id 
      WHERE fraqueza = $1 
      ORDER BY numero_pokemon`,
      [fraqueza]
    );

    res.status(200).json(pokemon.rows);
  } catch (erro) {
    res.status(500).json({ Mensagem: erro.message });
    }
}

const MostrarTodosPokemonsTipagem = async (req, res) => {
  const { tipagem } = req.body;

try {
  if (!tipagem) {
    return res.status(400).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
  }

  const pokemon = await pool.query(
    `SELECT pi.pokemon_info_id, nome, descricao, altura, peso, categoria_id, genero_id, total, hp, ataque, defesa, especial_ataque, especial_defesa, velocidade, imagem, numero_pokemon 
    FROM pokemon_info pi 
    INNER JOIN pokemon_tipagem pt ON pt.pokemon_info_id = pi.pokemon_info_id 
    INNER JOIN tipagem t ON t.tipagem_id = pt.tipagem_id 
    WHERE tipo = $1 
    ORDER BY numero_pokemon`,
    [tipagem]
  );

  res.status(200).json(pokemon.rows);
} catch (erro) {
  res.status(500).json({ Mensagem: erro.message });
}
}

const MostrarPokemonPeloNome = async (req, res) => {
  const { nome } = req.body;

  try {
    const pokemon = await pool.query(`
      SELECT
        pokemon_info_id,
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
      FROM
        public.pokemon_info
      WHERE
        nome ILIKE '%' || '${nome}' || '%'
      ORDER BY
        numero_pokemon;
    `);

    if (pokemon.rows.length === 0) {
      return res.status(400).json({ mensagem: 'Pokemon(s) não encontrado(s)' });
    }

    return res.status(200).json(pokemon.rows);
  } catch (error) {
    console.error('Erro ao buscar Pokémon por nome:', error);
    return res.status(500).json({ mensagem: 'Ocorreu um erro interno no servidor' });
  }
}

const MostrarTodosPokemonsAleatorio = async (req, res) => {
  try{

    const Pokemons = await pool.query(`SELECT *
    FROM pokemon_info ORDER BY RANDOM()`)

    if (Pokemons.length === 0) {
      res.status(200).json({Mensagem: "Não há pokemons cadastrados."})
    }

    res.status(200).json(Pokemons.rows)

  } catch {
    res.status(500).json({Mensagem: erro.Mensagem})
  }
}




// função de cadastrar pokemon
const CadastrarCategoria = async (req, res) => {
  const {
    categoria
  } = req.body

  try {
    if (!categoria) {
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_categoria = primeiraLetraMaiuscula(categoria)

    let categoria_id;
    const verificaCategoria = await pool.query(
      'SELECT categoria_id FROM categorias WHERE categoria = $1',
      [nova_categoria]
    );

    if (verificaCategoria.rows.length > 0) {
      categoria_id = verificaCategoria.rows[0].categoria_id;
    } else {
      const cadastroCategoria = await pool.query(
        'INSERT INTO categorias (categoria) VALUES ($1) RETURNING categoria_id',
        [nova_categoria]
      );
      categoria_id = cadastroCategoria.rows[0].categoria_id;
    }
    res.status(200).json({Mensagem: 'Categoria cadastrado com sucesso.' });
  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao cadastrar categoria.', erro });
  }
}

const CadastrarFraqueza = async (req, res) => {
  const {
    fraqueza
  } = req.body

  try {
    if (!fraqueza) {
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_fraqueza = primeiraLetraMaiuscula(fraqueza)

    let fraquezas_id;
      const verificaFraqueza = await pool.query(
        'SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1',
        [nova_fraqueza]
      );
  
      if (verificaFraqueza.rows.length > 0) {
        fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
      } else {
        const cadastroFraqueza = await pool.query(
          'INSERT INTO fraquezas (fraqueza) VALUES ($1) RETURNING fraquezas_id',
          [nova_fraqueza]
        );
        fraquezas_id = cadastroFraqueza.rows[0].fraquezas_id;
    }

    res.status(200).json({Mensagem: 'Fraqueza cadastrado com sucesso.' });
  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao cadastrar fraqueza.', erro });
  }
}

const CadastrarHabilidade = async (req, res) => {
  const {
    habilidade
  } = req.body

  try {
    if (!habilidade) {
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_habilidade = primeiraLetraMaiuscula(habilidade)
    let habilidade_id;
    const verificaHabilidade = await pool.query(
      'SELECT habilidade_id FROM habilidades WHERE habilidade = $1',
      [nova_habilidade]
    );

    if (verificaHabilidade.rows.length > 0) {
      habilidade_id = verificaHabilidade.rows[0].habilidade_id;
    } else {
      const cadastroHabilidade = await pool.query(
        'INSERT INTO habilidades (habilidade) VALUES ($1) RETURNING habilidade_id',
        [nova_habilidade]
      );
      habilidade_id = cadastroHabilidade.rows[0].habilidade_id;
    }

    res.status(200).json({Mensagem: 'Habilidade cadastrado com sucesso.' });
  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao cadastrar habilidade.', erro });
  }
}

const CadastrarTipagem = async (req, res) => {
  const {
    tipagem
  } = req.body

  try {
    if (!tipagem) {
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
    }

    const nova_tipagem = primeiraLetraMaiuscula(tipagem)

    let tipagem_id;
    const verificaTipagem = await pool.query(
      'SELECT tipagem_id FROM tipagem WHERE tipo = $1',
      [nova_tipagem]
    );

    if (verificaTipagem.rows.length > 0) {
      tipagem_id = verificaTipagem.rows[0].tipagem_id;
    } else {
      const cadastroTipagem = await pool.query(
        'INSERT INTO tipagem (tipo) VALUES ($1) RETURNING tipagem_id',
        [nova_tipagem]
      );
      tipagem_id = cadastroTipagem.rows[0].tipagem_id;
    }

    res.status(200).json({Mensagem: 'Tipo cadastrado com sucesso.' });
  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao cadastrar tipo.', erro });
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
        return res.status(400).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
      }
      let total = (parseFloat(ataque) + parseFloat(defesa) + parseFloat(hp) + parseFloat(especialAtaqueFormatado) + parseFloat(especialDefesaFormatada) + parseFloat(velocidade)) / 6

    // Verifica categoria
    let categoria_id;
    const verificaCategoria = await pool.query(
      'SELECT categoria_id FROM categorias WHERE categoria = $1',
      [categoriaFormatada]
    );

    if (verificaCategoria.rows.length > 0) {
      categoria_id = verificaCategoria.rows[0].categoria_id;
    } else {
      const cadastroCategoria = await pool.query(
        'INSERT INTO categorias (categoria) VALUES ($1) RETURNING categoria_id',
        [categoriaFormatada]
      );
      categoria_id = cadastroCategoria.rows[0].categoria_id;
    }

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

      if (verificaFraqueza.rows.length > 0) {
        fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
      } else {
        const cadastroFraqueza = await pool.query(
          'INSERT INTO fraquezas (fraqueza) VALUES ($1) RETURNING fraquezas_id',
          [fraquezaFormatada]
        );
        fraquezas_id = cadastroFraqueza.rows[0].fraquezas_id;
        list_fraqueza_id.push(fraquezas_id);
      }
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

      if (verificaHabilidade.rows.length > 0) {
        habilidade_id = verificaHabilidade.rows[0].habilidade_id;
      } else {
        const cadastroHabilidade = await pool.query(
          'INSERT INTO habilidades (habilidade) VALUES ($1) RETURNING habilidade_id',
          [habilidadeFormatada]
        );
        habilidade_id = cadastroHabilidade.rows[0].habilidade_id;
        list_habilidade_id.push(habilidade_id);
      }
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
      return res.status(400).json({ Mensagem: 'Gênero inválido.', status: 400 });
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

      if (verificaTipagem.rows.length > 0) {
        tipagem_id = verificaTipagem.rows[0].tipagem_id;
      } else {
        const cadastroTipagem = await pool.query(
          'INSERT INTO tipagem (tipo) VALUES ($1) RETURNING tipagem_id',
          [tipagem_nome]
        );
        tipagem_id = cadastroTipagem.rows[0].tipagem_id;
        list_tipagem_id.push(tipagem_id);
      }
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
  
      res.status(200).json({ Mensagem: 'Pokemon cadastrado com sucesso.' });
    } catch (erro) {
      res.status(500).json({ Mensagem: 'Erro ao cadastrar pokemon.', erro });
      console.log(erro)
    }
};



// funções de exclusão
const ExcluirCategoria = async (req, res) => {
  const {
    categoria
  } = req.body

  try {
    if (!categoria) {
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
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
      res.status(200).json({Mensagem: 'Categoria excluida com sucesso.' });
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
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
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
    res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
  }
}

const ExcluirHabilidade = async (req, res) => {
  const {
    habilidade
  } = req.body

  try {
    if (!habilidade) {
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
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
      return res.status(400).json({Mensagem: 'Há campo(s) vazio(s).', status: 400 });
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
      res.status(200).json({Mensagem: 'Tipagem excluida com sucesso.' });
    } else {
      return res.status(200).json({Message: "A Tipagem está sendo usada!", status: 400})
      
    }

  } catch (erro){
    res.status(500).json({ Mensagem: 'Erro ao excluir categoria.', erro });
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


    res.status(200).json({Mensagem: "Pokemon excluida com sucesso."})
}

catch (erro){
    res.status(500).json({Mensagem: erro.Mensagem})
}
}

    


function primeiraLetraMaiuscula(texto) {
  return String(texto)
    .trim() // Remove espaços em branco no início e no final da string
    .replace(/\s+/g, ' ') // Remove espaços extras entre as palavras
    .toLowerCase() // Converte todo o texto para minúsculas
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase()); // Converte as primeiras letras de cada palavra para maiúsculo

}




export {
    MostrarTodosPokemonsControllers, MostrarTodasCategorias, MostrarTodasFraquezas,
    MostrarTodosGeneros, MostrarPokemonPeloNome, MostrarTodosTipagem, MostrarTodasHabilidades, MostrarPokemonPeloID,
    MostrarTodosPokemonsFraquezas, MostrarTodosPokemonsTipagem, MostrarTodosPokemonsAleatorio,
    CadastrarPokemonControllers, CadastrarCategoria, CadastrarFraqueza, CadastrarTipagem, CadastrarHabilidade,
    ExcluirPokemonControllers, ExcluirCategoria, ExcluirFraqueza, ExcluirTipagem, ExcluirHabilidade, 
    primeiraLetraMaiuscula
}
import pool from "../database/db.js";

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
      `);

    if (Pokemons.length === 0) {
      res
        .status(200)
        .json({ Mensagem: "Não há pokemons cadastrados.", status: 400 });
    }

    res.status(200).json(Pokemons.rows);
  } catch (erro) {
    res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

const MostrarTodasCategorias = async (req, res) => {
  try {
    const Categorias = await pool.query("SELECT * FROM categorias");

    if (Categorias.length === 0) {
      return res
        .status(200)
        .json({ Mensagem: "Não há categorias cadastrados.", status: 400 });
    }

    return res.status(200).json(Categorias.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

const MostrarTodasFraquezas = async (req, res) => {
  try {
    const fraquezas = await pool.query("SELECT * FROM fraquezas");

    if (fraquezas.length === 0) {
      return res
        .status(200)
        .json({ Mensagem: "Não há fraquezas cadastrados.", status: 400 });
    }

    return res.status(200).json(fraquezas.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

const MostrarTodosGeneros = async (req, res) => {
  try {
    const generos = await pool.query("SELECT * FROM generos");

    if (generos.length === 0) {
      return res
        .status(200)
        .json({ Mensagem: "Não há generos cadastrados.", status: 400 });
    }

    return res.status(200).json(generos.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

const MostrarTodasHabilidades = async (req, res) => {
  try {
    const habilidades = await pool.query("SELECT * FROM habilidades");

    if (habilidades.length === 0) {
      return res
        .status(200)
        .json({ Mensagem: "Não há habilidades cadastrados.", status: 400 });
    }

    return res.status(200).json(habilidades.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

const MostrarTodosTipagem = async (req, res) => {
  try {
    const tipagem = await pool.query("SELECT * FROM tipagem");

    if (tipagem.length === 0) {
      return res
        .status(200)
        .json({ Mensagem: "Não há tipos cadastrados.", status: 400 });
    }

    return res.status(200).json(tipagem.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

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
      p.estagio_evolucao,
      string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
      string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
      string_agg(DISTINCT h.habilidade, ', ') as habilidades,
      string_agg(DISTINCT h.descricao, ', ') as descricoes_habilidade,
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
      ;`);
    res.status(200).json(pokemon.rows[0]);
  } catch (erro) {
    return res.status(500).json({ Message: erro.Message });
  }
};

// mostrar todos os pokemons com características espécificas
const MostrarTodosPokemonsFraquezas = async (req, res) => {
  const { fraqueza } = req.body;

  try {
    if (!fraqueza) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const pokemon = await pool.query(
      `SELECT
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
      p.estagio_evolucao,
      string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
      string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
      string_agg(DISTINCT h.habilidade, ', ') as habilidades,
      string_agg(DISTINCT h.descricao, ', ') as descricoes_habilidade,
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
};

const MostrarTodosPokemonsTipagem = async (req, res) => {
  const { tipagem } = req.body;

  try {
    if (!tipagem) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const pokemon = await pool.query(
      `SELECT
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
      p.estagio_evolucao,
      string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
      string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
      string_agg(DISTINCT h.habilidade, ', ') as habilidades,
      string_agg(DISTINCT h.descricao, ', ') as descricoes_habilidade,
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
};

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
      p.estagio_evolucao,
      string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
      string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
      string_agg(DISTINCT h.habilidade, ', ') as habilidades,
      string_agg(DISTINCT h.descricao, ', ') as descricoes_habilidade,
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
      return res
        .status(200)
        .json({ mensagem: "Pokemon(s) não encontrado(s)", status: 400 });
    }

    return res.status(200).json(pokemon.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro interno no servidor" });
  }
};

const MostrarTodosPokemonsAleatorio = async (req, res) => {
  try {
    const Pokemons = await pool.query(`SELECT
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
    p.estagio_evolucao,
    string_agg(DISTINCT f.fraqueza, ', ') as fraquezas,
    string_agg(DISTINCT f.imagem_fraqueza, ', ') as img_fraquezas,
    string_agg(DISTINCT h.habilidade, ', ') as habilidades,
    string_agg(DISTINCT h.descricao, ', ') as descricoes_habilidade,
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
     ORDER BY RANDOM()`);

    if (Pokemons.length === 0) {
      return res
        .status(200)
        .json({ Mensagem: "Não há pokemons cadastrados.", status: 400 });
    }

    return res.status(200).json(Pokemons.rows);
  } catch {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

// função de cadastrar pokemon
const CadastrarCategoria = async (req, res) => {
  const { categoria } = req.body;

  try {
    if (!categoria) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const nova_categoria = primeiraLetraMaiuscula(categoria);

    let categoria_id;
    const verificaCategoria = await pool.query(
      "SELECT categoria_id FROM categorias WHERE categoria = $1",
      [nova_categoria]
    );

    if (verificaCategoria.rows.length > 0) {
      categoria_id = verificaCategoria.rows[0].categoria_id;
    } else {
      const cadastroCategoria = await pool.query(
        "INSERT INTO categorias (categoria) VALUES ($1)",
        [nova_categoria]
      );

      categoria_id = cadastroCategoria.rows[0].categoria_id;
    }
    return res
      .status(200)
      .json({ Mensagem: "Categoria cadastrado com sucesso." });
  } catch (erro) {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao cadastrar categoria.", erro });
  }
};

const CadastrarFraqueza = async (req, res) => {
  const { fraqueza, imagem_fraqueza } = req.body;

  try {
    if (!fraqueza || !imagem_fraqueza) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const nova_fraqueza = primeiraLetraMaiuscula(fraqueza);
    const nova_imagem_fraqueza = imagem_fraqueza.trim();

    let fraquezas_id;
    const verificaFraqueza = await pool.query(
      "SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1",
      [nova_fraqueza]
    );

    if (verificaFraqueza.rows.length > 0) {
      fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
    } else {
      const cadastroFraqueza = await pool.query(
        "INSERT INTO fraquezas (fraqueza, imagem_fraqueza) VALUES ($1, $2) RETURNING fraquezas_id",
        [nova_fraqueza, nova_imagem_fraqueza]
      );
      fraquezas_id = cadastroFraqueza.rows[0].fraquezas_id;
    }

    return res
      .status(200)
      .json({ Mensagem: "Fraqueza cadastrado com sucesso." });
  } catch (erro) {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao cadastrar fraqueza.", erro });
  }
};

const CadastrarHabilidade = async (req, res) => {
  const { habilidade, descricao } = req.body;

  try {
    if (!habilidade || !descricao) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const nova_habilidade = primeiraLetraMaiuscula(habilidade);
    const nova_descricao = descricao.trim();
    let habilidade_id;
    const verificaHabilidade = await pool.query(
      "SELECT habilidade_id FROM habilidades WHERE habilidade = $1",
      [nova_habilidade]
    );

    if (verificaHabilidade.rows.length > 0) {
      habilidade_id = verificaHabilidade.rows[0].habilidade_id;
    } else {
      const cadastroHabilidade = await pool.query(
        "INSERT INTO habilidades (habilidade, descricao) VALUES ($1, $2)",
        [nova_habilidade, nova_descricao]
      );

      habilidade_id = cadastroHabilidade.rows[0].habilidade_id;
    }

    return res
      .status(200)
      .json({ Mensagem: "Habilidade cadastrado com sucesso." });
  } catch (erro) {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao cadastrar habilidade.", erro });
  }
};

const CadastrarTipagem = async (req, res) => {
  const { tipagem, imagem_tipagem } = req.body;

  try {
    if (!tipagem || !imagem_tipagem) {
      return res
        .status(400)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const nova_tipagem = primeiraLetraMaiuscula(tipagem);
    const nova_imagem_tipagem = imagem_tipagem.trim();

    let tipagem_id;
    const verificaTipagem = await pool.query(
      "SELECT tipagem_id FROM tipagem WHERE tipo = $1",
      [nova_tipagem]
    );

    if (verificaTipagem.rows.length > 0) {
      tipagem_id = verificaTipagem.rows[0].tipagem_id;
    } else {
      const cadastroTipagem = await pool.query(
        "INSERT INTO tipagem (tipo, imagem_tipagem) VALUES ($1, $2)",
        [nova_tipagem, nova_imagem_tipagem]
      );

      tipagem_id = cadastroTipagem.rows[0].tipagem_id;
    }

    return res
      .status(200)
      .json({ Mensagem: "Tipagem cadastrada com sucesso." });
  } catch (erro) {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao cadastrar tipagem.", erro });
  }
};

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
    tipagem,
    estagio_evolucao,
  } = req.body;

  // Formatar os campos
  const nomeFormatado = primeiraLetraMaiuscula(nome);
  const descricaoFormatada = primeiraLetraMaiuscula(descricao);
  const alturaFormatada = parseFloat(altura);
  const pesoFormatado = parseFloat(peso);
  const categoriaFormatada = primeiraLetraMaiuscula(categoria);
  const generoFormatado = primeiraLetraMaiuscula(genero);
  const hpFormatado = parseInt(hp);
  const ataqueFormatado = parseInt(ataque);
  const defesaFormatada = parseInt(defesa);
  const especialAtaqueFormatado = parseInt(especial_ataque);
  const especialDefesaFormatada = parseInt(especial_defesa);
  const velocidadeFormatada = parseInt(velocidade);
  const imagemFormatada = imagem.trim();
  const numeroPokemonFormatado = numero_pokemon.trim();
  const estagioEvolucaoFormatado = parseInt(estagio_evolucao);

  try {
    if (
      !nomeFormatado ||
      !descricaoFormatada ||
      isNaN(alturaFormatada) ||
      isNaN(pesoFormatado) ||
      !categoriaFormatada ||
      !generoFormatado ||
      isNaN(hpFormatado) ||
      isNaN(ataqueFormatado) ||
      isNaN(defesaFormatada) ||
      isNaN(especialAtaqueFormatado) ||
      isNaN(especialDefesaFormatada) ||
      isNaN(velocidadeFormatada) ||
      !fraqueza ||
      !habilidade ||
      !tipagem ||
      !imagemFormatada ||
      !numeroPokemonFormatado ||
      isNaN(estagioEvolucaoFormatado)
    ) {
      return res.status(400).json({
        Mensagem: "Há campo(s) inválido(s) ou vazio(s).",
        status: 400,
      });
    }

    let total =
      (ataqueFormatado +
        defesaFormatada +
        hpFormatado +
        especialAtaqueFormatado +
        especialDefesaFormatada +
        velocidadeFormatada) /
      6;

    // Verifica categoria
    const verificaCategoria = await pool.query(
      "SELECT categoria_id FROM categorias WHERE categoria = $1",
      [categoriaFormatada]
    );
    if (verificaCategoria.rows.length === 0) {
      return res
        .status(400)
        .json({ Mensagem: "Categoria inválida.", status: 400 });
    }
    const categoria_id = verificaCategoria.rows[0].categoria_id;

    // Verifica genero
    const verificaGenero = await pool.query(
      "SELECT genero_id FROM generos WHERE genero = $1",
      [generoFormatado]
    );
    if (verificaGenero.rows.length === 0) {
      return res
        .status(400)
        .json({ Mensagem: "Gênero inválido.", status: 400 });
    }
    const genero_id = verificaGenero.rows[0].genero_id;

    // Verifica tipagem
    const list_tipagem_id = [];
    for (const tipagem_nome of tipagem) {
      const verificaTipagem = await pool.query(
        "SELECT tipagem_id FROM tipagem WHERE tipo = $1",
        [tipagem_nome]
      );
      if (verificaTipagem.rows.length === 0) {
        return res.status(400).json({
          Mensagem: `Tipo inválido: ${tipagem_nome}.`,
          status: 400,
        });
      }
      const tipagem_id = verificaTipagem.rows[0].tipagem_id;
      list_tipagem_id.push(tipagem_id);
    }

    // Verifica fraqueza
    const list_fraqueza_id = [];
    for (const fraqueza_nome of fraqueza) {
      const verificaFraqueza = await pool.query(
        "SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1",
        [fraqueza_nome]
      );
      if (verificaFraqueza.rows.length === 0) {
        return res.status(400).json({
          Mensagem: `Fraqueza inválida: ${fraqueza_nome}.`,
          status: 400,
        });
      }
      const fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
      list_fraqueza_id.push(fraquezas_id);
    }

    let habilidade_id;
    const list_habilidade_id = [];

    for (let i = 0; i < habilidade.length; i++) {
      const habilidade_nome = habilidade[i];
      const habilidadeFormatada = primeiraLetraMaiuscula(habilidade_nome);
      const verificaHabilidade = await pool.query(
        "SELECT habilidade_id FROM habilidades WHERE habilidade = $1",
        [habilidadeFormatada]
      );
      habilidade_id = verificaHabilidade.rows[0].habilidade_id;
      list_habilidade_id.push(habilidade_id);
    }

    const verificaNumeroPokemon = await pool.query(
      "SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1",
      [numeroPokemonFormatado]
    );

    if (verificaNumeroPokemon.rows.length > 0) {
      return res
        .status(400)
        .json({ Mensagem: "Número pokemon já cadastrado!", status: 400 });
    }
    console.log(total);
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
          numero_pokemon,
          estagio_evolucao
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING pokemon_info_id`,
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
        numeroPokemonFormatado,
        estagioEvolucaoFormatado,
      ]
    );
    console.log(CadastroPokemon.rows);
    const pokemon_info_id = CadastroPokemon.rows[0].pokemon_info_id;

    // Relacionando as tabelas

    for (const fraqueza_id of list_fraqueza_id) {
      await pool.query(
        "INSERT INTO pokemon_fraquezas (pokemon_info_id, fraquezas_id) VALUES ($1, $2)",
        [pokemon_info_id, fraqueza_id]
      );
    }

    for (const habilidade_id of list_habilidade_id) {
      await pool.query(
        "INSERT INTO pokemon_habilidades (pokemon_info_id, habilidade_id) VALUES ($1, $2)",
        [pokemon_info_id, habilidade_id]
      );
    }

    for (const tipagem_id of list_tipagem_id) {
      await pool.query(
        "INSERT INTO pokemon_tipagem (pokemon_info_id, tipagem_id) VALUES ($1, $2)",
        [pokemon_info_id, tipagem_id]
      );
    }

    return res
      .status(200)
      .json({ Mensagem: "Pokemon cadastrado com sucesso." });
  } catch (erro) {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao cadastrar pokemon.", erro });
  }
};

// funções de exclusão
const ExcluirCategoria = async (req, res) => {
  const { categoria } = req.body;

  try {
    if (!categoria) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const novaCategoria = primeiraLetraMaiuscula(categoria);

    let categoria_id;
    const verificaCategoria = await pool.query(
      "SELECT categoria_id FROM categorias WHERE categoria = $1",
      [novaCategoria]
    );
    // o id da categoria é pegada e comparada
    categoria_id = verificaCategoria.rows[0].categoria_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemCategoria = await pool.query(
      "SELECT categoria_id FROM pokemon_info WHERE categoria_id = $1",
      [categoria_id]
    );

    if (verificaPokemonTemCategoria.rows.length === 0) {
      await pool.query("Delete from categorias where categoria_id = ($1)", [
        categoria_id,
      ]);
      return res
        .status(200)
        .json({ Mensagem: "Categoria excluida com sucesso." });
    } else {
      return res
        .status(200)
        .json({ Message: "A categoria está sendo usada!", status: 400 });
    }
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao excluir categoria.", erro });
  }
};

const ExcluirFraqueza = async (req, res) => {
  const { fraqueza } = req.body;

  try {
    if (!fraqueza) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const NovaFraqueza = primeiraLetraMaiuscula(fraqueza);

    let fraquezas_id;
    const verificaFraqueza = await pool.query(
      "SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1",
      [NovaFraqueza]
    );
    // o id da categoria é pegada e comparada
    fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemFraqueza = await pool.query(
      "SELECT pokemon_fraqueza_id FROM pokemon_fraquezas WHERE fraquezas_id = $1",
      [fraquezas_id]
    );

    if (verificaPokemonTemFraqueza.rows.length === 0) {
      await pool.query("Delete from fraquezas WHERE fraquezas_id = $1", [
        fraquezas_id,
      ]);

      res.status(200).json({ Mensagem: "Categoria excluida com sucesso." });
    } else {
      return res
        .status(200)
        .json({ Message: "A categoria está sendo usada!", status: 400 });
    }
  } catch (erro) {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao excluir categoria.", erro });
  }
};

const ExcluirHabilidade = async (req, res) => {
  const { habilidade } = req.body;

  try {
    if (!habilidade) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const NovaHabilidade = primeiraLetraMaiuscula(habilidade);

    let habilidade_id;
    const verificaHabilidade = await pool.query(
      "SELECT habilidade_id FROM habilidades WHERE habilidade = $1",
      [NovaHabilidade]
    );

    // o id da categoria é pegada e comparada
    habilidade_id = verificaHabilidade.rows[0].habilidade_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemHabilidade = await pool.query(
      "SELECT pokemon_habilidades_id FROM pokemon_habilidades WHERE habilidade_id = $1",
      [habilidade_id]
    );

    if (verificaPokemonTemHabilidade.rows.length === 0) {
      await pool.query("Delete from habilidades WHERE habilidade_id = $1", [
        habilidade_id,
      ]);
      res.status(200).json({ Mensagem: "Habilidade excluida com sucesso." });
    } else {
      return res
        .status(200)
        .json({ Message: "A Habilidade está sendo usada!", status: 400 });
    }
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao excluir habilidade.", erro });
  }
};

const ExcluirTipagem = async (req, res) => {
  const { tipagem } = req.body;

  try {
    if (!tipagem) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const NovaTipagem = primeiraLetraMaiuscula(tipagem);

    let tipagem_id;
    const verificaTipagem = await pool.query(
      "SELECT tipagem_id FROM tipagem WHERE tipo = $1",
      [NovaTipagem]
    );
    // o id da categoria é pegada e comparada
    tipagem_id = verificaTipagem.rows[0].tipagem_id;

    // verifica se algum pokemon tem essa categoria
    const verificaPokemonTemTipo = await pool.query(
      "SELECT pokemon_tipagem_id FROM pokemon_tipagem WHERE tipagem_id = $1",
      [tipagem_id]
    );

    if (verificaPokemonTemTipo.rows.length === 0) {
      await pool.query("Delete from tipagem WHERE tipagem_id = $1", [
        tipagem_id,
      ]);
      return res
        .status(200)
        .json({ Mensagem: "Tipagem excluida com sucesso." });
    } else {
      return res
        .status(200)
        .json({ Message: "A Tipagem está sendo usada!", status: 400 });
    }
  } catch (erro) {
    return res.status(500).json({ Mensagem: "Erro ao excluir tipagem.", erro });
  }
};

const ExcluirPokemonControllers = async (req, res) => {
  try {
    const { pokemon_info_id } = req.params;

    if (!pokemon_info_id) {
      return res
        .status(200)
        .json({ Mensagem: "Id não informado.", status: 400 });
    }

    // excluido pokemon dos relacionamentos
    // excluindo relacionamento fraquezas
    await pool.query(
      `DELETE FROM pokemon_fraquezas WHERE pokemon_info_id = ${pokemon_info_id}`
    );

    // excluindo relacionamento habilidades
    await pool.query(
      `DELETE FROM pokemon_habilidades WHERE pokemon_info_id = ${pokemon_info_id}`
    );

    // excluindo relacionamento tipagem
    await pool.query(
      `DELETE FROM pokemon_tipagem WHERE pokemon_info_id = ${pokemon_info_id}`
    );

    // excluindo pokemon
    await pool.query(
      `DELETE FROM pokemon_info WHERE pokemon_info_id = ${pokemon_info_id}`
    );

    return res.status(200).json({ Mensagem: "Pokemon excluida com sucesso." });
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.Mensagem });
  }
};

// funções de edição
const EditarCategoria = async (req, res) => {
  const { categoria, novoNomeCategoria } = req.body;

  try {
    if (!novoNomeCategoria) {
      return res
        .status(200)
        .json({ Mensagem: "Há campo(s) vazio(s).", status: 400 });
    }

    const tratamentoNomeCategoria = primeiraLetraMaiuscula(categoria);

    let categoria_id;
    const verificaCategoria = await pool.query(
      "Select * from categorias WHERE categoria = $1",
      [tratamentoNomeCategoria]
    );
    // o id da categoria é pegada e comparada
    categoria_id = verificaCategoria.rows[0].categoria_id;
    res.status(200).json(verificaCategoria.rows[0]);

    const tratamentoNovoNomeCategoria =
      primeiraLetraMaiuscula(novoNomeCategoria);
    await pool.query(
      "UPDATE categorias SET categoria = $1 WHERE categoria_id = $2",
      [tratamentoNovoNomeCategoria, categoria_id]
    );

    return res.status(200).json({ Mensagem: "Categoria editada com sucesso." });
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao editar categoria.", erro });
  }
};

const EditarFraqueza = async (req, res) => {
  const { fraqueza, novoNomeFraqueza, NovaImagemFraqueza } = req.body;

  try {
    if (!novoNomeFraqueza && !NovaImagemFraqueza) {
      return res
        .status(200)
        .json({ Mensagem: "Altere pelo menos um campo.", status: 400 });
    }

    const tratamentoNomeFraqueza = primeiraLetraMaiuscula(fraqueza);

    let fraqueza_id;
    const verificaFraqueza = await pool.query(
      "Select * from fraquezas WHERE fraqueza = $1",
      [tratamentoNomeFraqueza]
    );
    // o id da categoria é pegada e comparada
    fraqueza_id = verificaFraqueza.rows[0].fraqueza_id;
    res.status(200).json(verificaFraqueza.rows[0]);

    const tratamentoNovoNomeFraqueza = primeiraLetraMaiuscula(novoNomeFraqueza);
    const tratamentoNovaImgFraqueza = NovaImagemFraqueza.trim();

    await pool.query(
      "UPDATE fraquezas SET fraqueza = $1, imagem_fraqueza = $2 WHERE categoria_id = $3",
      [tratamentoNovoNomeFraqueza, tratamentoNovaImgFraqueza, fraqueza_id]
    );

    return res.status(200).json({ Mensagem: "Fraqueza editada com sucesso." });
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao editar fraqueza.", erro });
  }
};

const EditarHabilidade = async (req, res) => {
  const { habilidade, novoNomeHabildade, novaDescricao } = req.body;

  try {
    if (!novoNomeHabildade && !novaDescricao) {
      return res
        .status(200)
        .json({ Mensagem: "Altere pelo menos um campo.", status: 400 });
    }

    const tratamentoNomeHabilidade = primeiraLetraMaiuscula(habilidade);

    let habilidade_id;
    const verificaHabilidade = await pool.query(
      "Select * from habilidades WHERE habilidade = $1",
      [tratamentoNomeHabilidade]
    );
    // o id da categoria é pegada e comparada
    habilidade_id = verificaHabilidade.rows[0].habilidade_id;
    res.status(200).json(verificaHabilidade.rows[0]);

    const tratamentoNovoNomeHabilidade =
      primeiraLetraMaiuscula(novoNomeHabildade);
    const tratamentoNovaDescricao = capitalizarEPontuar(novaDescricao).trim();

    await pool.query(
      "UPDATE habilidades SET habilidade = $1, descricao = $2 WHERE habilidade_id = $3",
      [tratamentoNovoNomeHabilidade, tratamentoNovaDescricao, habilidade_id]
    );

    return res
      .status(200)
      .json({ Mensagem: "Habilidade editada com sucesso." });
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao editar habilidade.", erro });
  }
};

const EditarTipagem = async (req, res) => {
  const { tipo, NovoNomeTipo, NovaImagemTipagem } = req.body;

  try {
    if (!NovoNomeTipo && !NovaImagemTipagem) {
      return res
        .status(200)
        .json({ Mensagem: "Altere pelo menos um campo.", status: 400 });
    }

    const tratamentoNomeTipo = primeiraLetraMaiuscula(tipo);

    let tipo_id;
    const verificaTipo = await pool.query(
      "Select * from tipagem WHERE tipo = $1",
      [tratamentoNomeTipo]
    );
    // o id da categoria é pegada e comparada
    tipo_id = verificaTipo.rows[0].tipagem_id;
    res.status(200).json(verificaTipo.rows[0]);

    const tratamentoNovoNomeTipo = primeiraLetraMaiuscula(NovoNomeTipo);
    const tratamentoNovaImgTipagem = NovaImagemTipagem.trim();

    await pool.query(
      "UPDATE tipagem SET tipo = $1, imagem_tipagem = $2 WHERE tipagem_id = $3",
      [tratamentoNovoNomeTipo, tratamentoNovaImgTipagem, tipagem_id]
    );

    return res.status(200).json({ Mensagem: "Tipagem editada com sucesso." });
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao editar tipagem.", erro });
  }
};

const EditarPokemon = async (req, res) => {
  try {
    const { pokemon_id } = req.params.id;

    const {
      novoNome,
      novaDescricao,
      novaAltura,
      novoPeso,
      novaCategoria,
      novoHP,
      novoAtaque,
      novaDefesa,
      novoAtaqueEspecial,
      novaDefesaEspecial,
      novaVelocidade,
      novaImagem,
      novoNumeroPokemon,
      novoGenero,

      novaFraqueza,
      novaHabilidade,
      novaTipagem,
      novaEstagioEvolucao,
    } = req.body;

    // Formatar os campos
    const nomeFormatado = primeiraLetraMaiuscula(novoNome);
    const descricaoFormatada = primeiraLetraMaiuscula(novaDescricao);
    const imagemFormatada = novaImagem.trim();
    const categoriaFormatada = primeiraLetraMaiuscula(novaCategoria);
    const alturaFormatada = String(novaAltura).trim();
    const pesoFormatado = String(novoPeso).trim();
    const numeroPokemonFormatado = String(novoNumeroPokemon).trim();
    const hpFormatado = String(novoHP).trim();
    const ataqueFormatado = String(novoAtaque).trim();
    const defesaFormatada = String(novaDefesa).trim();
    const especialAtaqueFormatado = String(novoAtaqueEspecial).trim();
    const especialDefesaFormatada = String(novaDefesaEspecial).trim();
    const velocidadeFormatada = String(novaVelocidade).trim();
    const generoFormatado = primeiraLetraMaiuscula(novoGenero);

    if (
      !nomeFormatado &&
      !descricaoFormatada &&
      !imagemFormatada &&
      !categoriaFormatada &&
      !alturaFormatada &&
      !pesoFormatado &&
      !numeroPokemonFormatado &&
      !hpFormatado &&
      !ataqueFormatado &&
      !defesaFormatada &&
      !especialAtaqueFormatado &&
      !especialDefesaFormatada &&
      !velocidadeFormatada &&
      !generoFormatado &&
      !novaFraqueza &&
      !novaHabilidade &&
      !novaTipagem &&
      !novaEstagioEvolucao
    ) {
      return res
        .status(200)
        .json({ Mensagem: "Modifique pelo menos um campo.", status: 400 });
    }

    let novoTotal =
      (ataqueFormatado +
        defesaFormatada +
        hpFormatado +
        especialAtaqueFormatado +
        especialDefesaFormatada +
        velocidadeFormatada) /
      6;

    if (nomeFormatado) {
      await pool.query(
        "UPDATE pokemon_info SET nome = $1 WHERE pokemon_info_id = $2",
        [nomeFormatado, pokemon_id]
      );
    }

    if (descricaoFormatada) {
      await pool.query(
        "UPDATE pokemon_info SET descricao = $1 WHERE pokemon_info_id = $2",
        [descricaoFormatada, pokemon_id]
      );
    }

    if (imagemFormatada) {
      await pool.query(
        "UPDATE pokemon_info SET imagem = $1 WHERE pokemon_info_id = $2",
        [imagemFormatada, pokemon_id]
      );
    }

    if (categoriaFormatada) {
      const verificaCategoria = await pool.query(
        "SELECT categoria_id FROM categorias WHERE categoria = $1",
        [categoriaFormatada]
      );
      if (verificaCategoria.rows.length === 0) {
        return res
          .status(400)
          .json({ Mensagem: "Categoria inválida.", status: 400 });
      }
      const categoria_id = verificaCategoria.rows[0].categoria_id;

      await pool.query(
        "UPDATE pokemon_info SET categoria_id = $1 WHERE pokemon_info_id = $2",
        [categoria_id, pokemon_id]
      );
    }

    if (alturaFormatada) {
      await pool.query(
        "UPDATE pokemon_info SET altura = $1 WHERE pokemon_info_id = $2",
        [alturaFormatada, pokemon_id]
      );
    }

    if (pesoFormatado) {
      await pool.query(
        "UPDATE pokemon_info SET peso = $1 WHERE pokemon_info_id = $2",
        [pesoFormatado, pokemon_id]
      );
    }

    if (numeroPokemonFormatado) {
      const verificaNumeroPokemon = await pool.query(
        "SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1",
        [numeroPokemonFormatado]
      );

      if (verificaNumeroPokemon.rows.length > 0) {
        return res
          .status(400)
          .json({ Mensagem: "Número pokemon já cadastrado!", status: 400 });
      }

      await pool.query(
        "UPDATE pokemon_info SET numero_pokemon = $1 WHERE pokemon_info_id = $2",
        [numeroPokemonFormatado, pokemon_id]
      );
    }

    if (hpFormatado) {
      await pool.query(
        "UPDATE pokemon_info SET hp = $1 WHERE pokemon_info_id = $2",
        [hpFormatado, pokemon_id]
      );
    }

    if (ataqueFormatado) {
      await pool.query(
        "UPDATE pokemon_info SET ataque = $1 WHERE pokemon_info_id = $2",
        [ataqueFormatado, pokemon_id]
      );
    }

    if (defesaFormatada) {
      await pool.query(
        "UPDATE pokemon_info SET defesa = $1 WHERE pokemon_info_id = $2",
        [defesaFormatada, pokemon_id]
      );
    }

    if (especialAtaqueFormatado) {
      await pool.query(
        "UPDATE pokemon_info SET especial_ataque = $1 WHERE pokemon_info_id = $2",
        [especialAtaqueFormatado, pokemon_id]
      );
    }

    if (especialAtaqueFormatado) {
      await pool.query(
        "UPDATE pokemon_info SET especial_defesa = $1 WHERE pokemon_info_id = $2",
        [especialAtaqueFormatado, pokemon_id]
      );
    }

    if (velocidadeFormatada) {
      await pool.query(
        "UPDATE pokemon_info SET velocidade = $1 WHERE pokemon_info_id = $2",
        [velocidadeFormatada, pokemon_id]
      );
    }

    if (velocidadeFormatada) {
      await pool.query(
        "UPDATE pokemon_info SET velocidade = $1 WHERE pokemon_info_id = $2",
        [velocidadeFormatada, pokemon_id]
      );
    }

    if (generoFormatado) {
      const verificaGenero = await pool.query(
        "SELECT genero_id FROM generos WHERE genero = $1",
        [generoFormatado]
      );
      if (verificaGenero.rows.length === 0) {
        return res
          .status(400)
          .json({ Mensagem: "Gênero inválido.", status: 400 });
      }
      const genero_id = verificaGenero.rows[0].genero_id;

      await pool.query(
        "UPDATE pokemon_info SET genero_id = $1 WHERE pokemon_info_id = $2",
        [genero_id, pokemon_id]
      );
    }

    if (novaFraqueza) {
      // deletando relacionamentos
      await pool.query(
        `DELETE FROM public.pokemon_fraquezas
      WHERE pokemon_info_id = %1`,
        [pokemon_id]
      );

      const list_fraqueza_id = [];
      for (const fraqueza_nome of fraqueza) {
        const verificaFraqueza = await pool.query(
          "SELECT fraquezas_id FROM fraquezas WHERE fraqueza = $1",
          [fraqueza_nome]
        );
        if (verificaFraqueza.rows.length === 0) {
          return res.status(400).json({
            Mensagem: `Fraqueza inválida: ${fraqueza_nome}.`,
            status: 400,
          });
        }
        const fraquezas_id = verificaFraqueza.rows[0].fraquezas_id;
        list_fraqueza_id.push(fraquezas_id);
      }

      for (const fraqueza_id of list_fraqueza_id) {
        await pool.query(
          "INSERT INTO pokemon_fraquezas (pokemon_info_id, fraquezas_id) VALUES ($1, $2)",
          [pokemon_id, fraqueza_id]
        );
      }
    }

    if (novaHabilidade) {
      // deletando relacionamentos
      await pool.query(
        `DELETE FROM public.pokemon_habilidades
      WHERE pokemon_info_id = %1`,
        [pokemon_id]
      );

      const list_habilidades_id = [];
      for (const habilidade_nome of novaHabilidade) {
        const verificaHabilidade = await pool.query(
          "SELECT habilidade_id FROM habilidades WHERE habilidade = $1",
          [habilidade_nome]
        );
        if (verificaHabilidade.rows.length === 0) {
          return res.status(400).json({
            Mensagem: `Habilidade inválida: ${habilidade_nome}.`,
            status: 400,
          });
        }
        const habilidades_id = verificaHabilidade.rows[0].habilidade_id;
        list_habilidades_id.push(habilidades_id);
      }

      for (const habilidade_id of list_habilidades_id) {
        await pool.query(
          "INSERT INTO pokemon_habilidades (pokemon_info_id, habilidade_id) VALUES ($1, $2)",
          [pokemon_id, habilidade_id]
        );
      }
    }

    if (novaTipagem) {
      // deletando relacionamentos
      await pool.query(
        `DELETE FROM public.pokemon_tipagem
      WHERE pokemon_info_id = %1`,
        [pokemon_id]
      );

      const list_tipagem_id = [];
      for (const tipagem_nome of novaTipagem) {
        const verificaTipagem = await pool.query(
          "SELECT tipagem_id FROM tipagem WHERE tipo = $1",
          [tipagem_nome]
        );
        if (verificaTipagem.rows.length === 0) {
          return res.status(400).json({
            Mensagem: `Tipo inválida: ${tipagem_nome}.`,
            status: 400,
          });
        }
        const tipos_id = verificaTipagem.rows[0].tipagem_id;
        list_tipagem_id.push(tipos_id);
      }

      for (const tipo_id of list_tipagem_id) {
        await pool.query(
          "INSERT INTO pokemon_tipagem (pokemon_info_id, tipagem_id) VALUES ($1, $2)",
          [pokemon_id, tipo_id]
        );
      }
    }

    return res.status(200).json({ Mensagem: "Pokemon editado com sucesso." });
  } catch (erro) {
    res.status(500).json({ Mensagem: "Erro ao editar pokemon.", erro });
  }
};

// grade evolutiva
const MostrarGradeEvolutivaPokemon = async (req, res) => {
  const { nome, numeroPokemon } = req.body;

  try {
    const numeroPokemonFormatado = String(numeroPokemon).trim();

    let pokemon_id;
    const verificaNumeroPokemon = await pool.query(
      `SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1`,
      [numeroPokemonFormatado]
    );
    pokemon_id = verificaNumeroPokemon.rows[0].pokemon_info_id;

    await pool.query("BEGIN");

    const consulta = `
    CREATE OR REPLACE FUNCTION public.get_familia_evolucao(IN pokemon_id integer)
    RETURNS integer[]
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100
  AS $BODY$
  DECLARE 
      -- variable declaration  
      id_inicial int;  
      id_familia int[]; 
      current_pokemon_id int := pokemon_id; -- Declare uma nova variável para armazenar o valor atual de pokemon_id

  BEGIN
      id_inicial := (SELECT pokemon_info_id FROM pokemon_evolucoes WHERE evolucao_pokemon_info_id = pokemon_id LIMIT 1);
      
      WHILE id_inicial IS NOT NULL LOOP
          current_pokemon_id := id_inicial;
          id_inicial := (SELECT pokemon_info_id FROM pokemon_evolucoes WHERE evolucao_pokemon_info_id = current_pokemon_id );
      END LOOP;
      
      WHILE current_pokemon_id IS NOT NULL LOOP
          id_familia := array_append(id_familia, current_pokemon_id);
      
          FOR rept IN 1..(SELECT COUNT(*) FROM pokemon_evolucoes WHERE evolucao_pokemon_info_id = current_pokemon_id OR pokemon_info_id = current_pokemon_id) LOOP
              id_familia := ARRAY_CAT(id_familia, ARRAY(SELECT evolucao_pokemon_info_id FROM pokemon_evolucoes WHERE pokemon_info_id = current_pokemon_id OR evolucao_pokemon_info_id = current_pokemon_id));
          END LOOP;
        
          current_pokemon_id := (SELECT evolucao_pokemon_info_id FROM pokemon_evolucoes WHERE pokemon_info_id = current_pokemon_id LIMIT 1);
      END LOOP;    
    
    FOR rept IN 1..ARRAY_LENGTH(id_familia, 1) LOOP
          id_familia := ARRAY_CAT(id_familia, ARRAY(SELECT evolucao_pokemon_info_id FROM pokemon_evolucoes WHERE pokemon_info_id = rept));
      END LOOP;
    
        RETURN ARRAY(SELECT DISTINCT unnest(id_familia));
    END;
    $BODY$;
  `;

    // Executar a primeira consulta na transação
    await pool.query(consulta);

    const consultaPrincipal = `
  WITH familia AS (
    SELECT unnest(get_familia_evolucao($1)) AS pokemon_id
  ),
  menor_id AS (
    SELECT MIN(pokemon_id) AS menor_id FROM familia
  )
  SELECT 
    pi.imagem, 
    pi.nome, 
    pi.numero_pokemon, 
    STRING_AGG(DISTINCT t.tipo, ', ') AS tipos,
    pe.nivel
  FROM 
    pokemon_info pi
    INNER JOIN pokemon_tipagem pt ON pt.pokemon_info_id = pi.pokemon_info_id
    INNER JOIN tipagem t ON t.tipagem_id = pt.tipagem_id
    INNER JOIN familia ON pi.pokemon_info_id = familia.pokemon_id
    LEFT JOIN pokemon_evolucoes pe ON pe.evolucao_pokemon_info_id = pi.pokemon_info_id
  WHERE 
    (pe.nivel IS NULL) AND pi.pokemon_info_id = (SELECT menor_id FROM menor_id)
  GROUP BY 
    pi.imagem, pi.nome, pi.numero_pokemon, pe.nivel;
  
  WITH familia AS (
    SELECT unnest(get_familia_evolucao($1)) AS pokemon_id
  )
  SELECT 
    pi.imagem, 
    pi.nome, 
    pi.numero_pokemon, 
    STRING_AGG(DISTINCT t.tipo, ', ') AS tipos,
    pe.nivel
  FROM 
    pokemon_info pi
    INNER JOIN pokemon_tipagem pt ON pt.pokemon_info_id = pi.pokemon_info_id
    INNER JOIN tipagem t ON t.tipagem_id = pt.tipagem_id
    INNER JOIN familia ON pi.pokemon_info_id = familia.pokemon_id
    LEFT JOIN pokemon_evolucoes pe ON pe.evolucao_pokemon_info_id = pi.pokemon_info_id
  GROUP BY 
    pi.imagem, pi.nome, pi.numero_pokemon, pe.nivel
  `;

    // Executar a segunda consulta na transação
    const pokemon = await pool.query(consultaPrincipal, [pokemon_id]);

    // Comitar a transação
    await pool.query("COMMIT");

    res.status(200).json(pokemon.rows);
  } catch (erro) {
    return res.status(500).json({ Mensagem: erro.message });
  }
};

const CadastrarGradeEvolutivaPokemon = async (req, res) => {
  // const { nomePokemon, numeroPokemon, nomeEvolucaoPokemon, numeroPokemonEvolucao, nivelEvolucao} = req.body;
  // // Formatar os campos
  // try {
  //   if (!nomePokemon || !numeroPokemon || !nomeEvolucaoPokemon || !numeroPokemonEvolucao || !nivelEvolucao) {
  //     return res.status(400).json({ Mensagem: 'Há campo(s) vazio(s).', status: 400 });
  //   }
  //   const numeroPokemonFormatado = String(numeroPokemon).trim();
  //   const numeroPokemonEvolucaoFormatado = String(numeroPokemonEvolucao).trim();
  //   const nivelEvolucaoFormatado = nivelEvolucao.trim()
  //   // Verificar pokemon
  //   let pokemon_id;
  //   const verificaNumeroPokemon = await pool.query(
  //     `SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1`,
  //     [numeroPokemonFormatado]
  //   );
  //   pokemon_id = verificaNumeroPokemon.rows[0].pokemon_info_id;
  //   // Verificar evolucao pokemon
  //   let pokemon_id_evolucao;
  //   const verificaNumeroPokemonEvolucao = await pool.query(
  //     `SELECT pokemon_info_id FROM pokemon_info WHERE numero_pokemon = $1`,
  //     [numeroPokemonEvolucaoFormatado]
  //   );
  //   pokemon_id_evolucao = verificaNumeroPokemonEvolucao.rows[0].pokemon_info_id;
  //   // Inserir nas tabelas
  //   const cadastroPokemon = await pool.query(
  //     `INSERT INTO pokemon_evolucoes (
  //       pokemon_info_id,
  //       evolucao_pokemon_info_id,
  //       nivel
  //     ) VALUES ($1, $2, $3) RETURNING pokemon_info_id`,
  //     [
  //       pokemon_id,
  //       evolucao_pokemon_info_id,
  //       nivelEvolucaoFormatado
  //     ]
  //   );
  //   const pokemon_info_id = cadastroPokemon.rows[0].pokemon_info_id;
  //   return res.status(200).json({ Mensagem: 'Grade cadastrada com sucesso.' });
  // } catch (erro) {
  //   return res.status(500).json({ Mensagem: 'Erro ao cadastrar grade pokemon.', erro });
  // }
};

const ExcluirGradeEvolutivaPokemon = async (req, res) => {
  try {
    await pool.query(`Delete from  pokemon_evolucoes`);
    return res.status(200).json({ Mensagem: "Grade excluida com sucesso." });
  } catch {
    return res
      .status(500)
      .json({ Mensagem: "Erro ao excluir grade pokemon.", erro });
  }
};

// funções gerais
function primeiraLetraMaiuscula(texto) {
  return String(texto)
    .trim() // Remove espaços em branco no início e no final da string
    .replace(/\s+/g, " ") // Remove espaços extras entre as palavras
    .toLowerCase() // Converte todo o texto para minúsculas
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase()); // Converte as primeiras letras de cada palavra para maiúsculo
}

function capitalizarEPontuar(str) {
  const capitalizada = str.charAt(0).toUpperCase() + str.slice(1); // Capitaliza a primeira letra
  const comPonto = capitalizada.endsWith(".")
    ? capitalizada
    : capitalizada + "."; // Adiciona um ponto final se já não houver um

  return String(comPonto);
}

export {
  MostrarTodosPokemonsControllers,
  MostrarTodasCategorias,
  MostrarTodasFraquezas,
  MostrarTodosGeneros,
  MostrarPokemonPeloNome,
  MostrarTodosTipagem,
  MostrarTodasHabilidades,
  MostrarPokemonPeloID,
  MostrarTodosPokemonsFraquezas,
  MostrarTodosPokemonsTipagem,
  MostrarTodosPokemonsAleatorio,
  CadastrarPokemonControllers,
  CadastrarCategoria,
  CadastrarFraqueza,
  CadastrarTipagem,
  CadastrarHabilidade,
  ExcluirPokemonControllers,
  ExcluirCategoria,
  ExcluirFraqueza,
  ExcluirTipagem,
  ExcluirHabilidade,
  CadastrarGradeEvolutivaPokemon,
  MostrarGradeEvolutivaPokemon,
  primeiraLetraMaiuscula,
  ExcluirGradeEvolutivaPokemon,
  EditarCategoria,
  EditarHabilidade,
  EditarFraqueza,
  EditarPokemon,
  EditarTipagem,
};

import pg from "pg";
const { Pool } = pg;

// const pool = new Pool(process.env.BANCO_URL)

const pool = new Pool({
    connectionString: "postgres://default:P4IlabEsLA5S@ep-long-dew-098244.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
  });
  
  // Criação das tabelas e campos no banco de dados
  const createTables = async () => {
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS categorias (
          categoria_id SERIAL PRIMARY KEY,
          categoria VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS fraquezas (
          fraquezas_id SERIAL PRIMARY KEY,
          fraqueza VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS generos (
          genero_id SERIAL PRIMARY KEY,
          genero VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS habilidades (
          habilidade_id SERIAL PRIMARY KEY,
          habilidade VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS tipagem (
          tipagem_id SERIAL PRIMARY KEY,
          tipo VARCHAR(50)
        );
        
        CREATE TABLE IF NOT EXISTS pokemon_info (
          pokemon_info_id SERIAL PRIMARY KEY,
          nome VARCHAR(50),
          descricao VARCHAR(255),
          altura DOUBLE PRECISION,
          peso DOUBLE PRECISION,
          categoria_id INTEGER,
          genero_id INTEGER,
          total INTEGER,
          hp INTEGER,
          ataque INTEGER,
          defesa INTEGER,
          especial_ataque INTEGER,
          especial_defesa INTEGER,
          velocidade INTEGER,
          imagem VARCHAR(255),
          numero_pokemon INTEGER,
          FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id),
          FOREIGN KEY (genero_id) REFERENCES generos(genero_id)
        );
        
        CREATE TABLE IF NOT EXISTS pokemon_fraquezas (
          pokemon_fraqueza_id SERIAL PRIMARY KEY,
          pokemon_info_id INTEGER,
          fraquezas_id INTEGER,
          FOREIGN KEY (pokemon_info_id) REFERENCES pokemon_info(pokemon_info_id),
          FOREIGN KEY (fraquezas_id) REFERENCES fraquezas(fraquezas_id)
        );
        
        CREATE TABLE IF NOT EXISTS pokemon_habilidades (
          pokemon_habilidades_id SERIAL PRIMARY KEY,
          pokemon_info_id INTEGER,
          habilidade_id INTEGER,
          FOREIGN KEY (pokemon_info_id) REFERENCES pokemon_info(pokemon_info_id),
          FOREIGN KEY (habilidade_id) REFERENCES habilidades(habilidade_id)
        );
        
        CREATE TABLE IF NOT EXISTS pokemon_tipagem (
          pokemon_tipagem_id SERIAL PRIMARY KEY,
          pokemon_info_id INTEGER,
          tipagem_id INTEGER,
          FOREIGN KEY (pokemon_info_id) REFERENCES pokemon_info(pokemon_info_id),
          FOREIGN KEY (tipagem_id) REFERENCES tipagem(tipagem_id)
        );
      `);
      client.release();
      console.log('Tabelas e campos criados com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tabelas e campos:', error);
    }
  };
  
  createTables();

export default pool 


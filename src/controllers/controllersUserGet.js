import pool from '../database/db.js'

const EncontrarTodosUsuarios = async (req, res) => {
    try {
        const Usuario = await pool.query(`SELECT nome, senha
        FROM usuarios order by user_id;`)

        if (Usuario.rows.length === 0) {
            return res.status(200).json({Mensagem: 'Não há usuarios cadastrados.', status:400})
        }   
        
        return res.status(200).json(Usuario)
        
    }  catch (error) {
        return res.status(500).json({Mensagem: error.Mensagem})
    }
} 

const EncontrarUsuarioId = async (req, res) => {
    try {
        const Usuario = await pool.query(`SELECT
          *
      FROM
          usuarios
      WHERE
          user_id = ${req.params.id};`)
          
          return res.status(200).json(Usuario.rows[0])
      }
  
      catch (erro){
          return res.status(500).json({Mensagem: erro.Message})
      }
}

export {
    EncontrarTodosUsuarios, EncontrarUsuarioId
}
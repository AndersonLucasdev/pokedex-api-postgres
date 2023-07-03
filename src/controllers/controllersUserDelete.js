import pool from '../database/db.js'


const removeUsuarioID = async (req, res) => {
    try {
        const {usuario_id} = req

        if (!id) {
            return res.status(200).json({Mensagem: 'Id não informado.', status:400})
        }

        await pool.query(
            'Delete from usuarios where user_id = ($1)',
            [usuario_id]
          );

        return res.status(200).json({Mensagem: "Usuário excluido com sucesso.", deletado})
    }

    catch (erro){
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

export {
    removeUsuarioID
}

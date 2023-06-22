import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../database/db'


const CadastrarUsuarioControllers = async (req, res) => {
    try {
        const{
            usuario, senha, confirmSenha
        } = req.body

        if (!usuario || !senha || ! confirmSenha) {
            res.status(200).json({Mensagem: "Há campo(s) vazio(s).", status:400})
        } else {

            if (senha.length < 6) {
                res.status(200).json({Mensagem: "A senha precisa ter no minimo 6 caracteres.", status:400})
            } else {

                if (senha != confirmSenha) {
                    res.status(200).json({Mensagem: "As senha estão diferentes.", status:400})
                } else {

                    const CadastroUsuario = pool.query("INSERT INTO //tabela// Values($1, $2, $3)," [usuario, senha, confirmSenha])
                    if (!CadastroUsuario) {
                        res.status(200).json({Mensagem: "Erro na criação do usuario.", status:400})
                    } else {
                        {
                            res.status(201).json(
                                {
                                    user: {
                                        id: CadastroUsuario._id,
                                        usuario,
                                    },
                                    Message: "Usuario cadastrada com sucesso."
                                }
                            )
                        }
                    }
                }
            }
        }

    }  
    catch (erro){
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const Login = async (req, res) => {
    try {
        const {
            usuario, senha
        } = req.body

        if (!usuario || !senha) {
            res.status(200).json({Mensagem: "Há campo(s) vazio(s).", status:400})
        }

        const verificaUsuario = pool.query("Select /campo from /tabela")
        if (!verificaUsuario) {
            res.status(200).json({Mensagem: 'Usuario ou senha incorretos.', status:400})
        }

        const senhaValida = bcrypt.compareSync(senha, verificaUsuario.senha)
        if (!senhaValida) {
            res.status(200).json({Mensagem: 'Usuario ou senha incorretos.', status:400})
        }

        const token = pool.query("Select //token from //tabela")

        res.cookie("token",token,{httpOnly:true})
        res.status(200).json({token:token, id:verificaUsuario._id, usuario:verificaUsuario.usuario})
    }
    catch {
        res.status(500).json({Mensagem: erro.Mensagem})
    }
}

//
const validarToken = async (req,res) =>{

    const token =  req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    req.token = token

    if(!token){
        return res.status(200).json({Message:"Token inválido.", status:400})
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) =>{
        if(err){
            console.log("oi")
            return res.status(200).json({Message:"Token inválido.", status:400})
        }else{
            req.usuario = decoded.usuario
            return res.status(200).json({Message:"Token válido."})
        }
    })
}

const deletarToken = async (req, res) =>{

    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];

    if(!token){
       return res.status(200).json({Message:"Logout não autorizado.", status:400})
    }

    res.cookie('token', null, {httpOnly:true})
    
    return res.status(200).json({Message:"Você foi desconectado."})

}

const EncontrarUsuarios = async (req, res) => {
    try {
        //const usuario = await pool.query("Select //nome_usuario from usuarios")

        if (usuario.length === 0) {
            return res.status(200).json({Message: 'Não há usuarios cadastrados.'})
        }   else {
            res.status(200).json(usuario)
        }
    }  catch (error) {
        res.status(500).json({Message: error.Message})
    }
} 

const EncontrarUsuario = async (req, res) => {
    try {
        const usuario = req.usuario

        res.status(200).json(usuario)
    }

    catch (erro){
        return res.status(500).json({Message: erro.Message})
    }
}

const removeUsuarioID = async (req, res) => {
    try {

        const {id} = req
        if (!id) {
            return res.status(200).json({Message: 'Id não informado.', status:400})
        }

        //const deletado = await pool.query(`${id}`)

        return res.status(200).json({Message: "Usuário excluido com sucesso.", deletado})
    }

    catch (erro){
        res.status(500).json({Message: erro.Message})
    }
}

export {
    CadastrarUsuarioControllers, Login, EncontrarUsuario, EncontrarUsuarios, removeUsuarioID, validarToken, deletarToken
}
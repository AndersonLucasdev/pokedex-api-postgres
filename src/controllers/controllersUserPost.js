import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../database/db'
import { primeiraLetraMaiuscula } from './controllersInfo'


const CadastrarUsuarioControllers = async (req, res) => {
    try {
        const{
            nome, senha, confirmSenha
        } = req.body

        if (!nome || !senha || ! confirmSenha) {
            return res.status(200).json({Mensagem: "Há campo(s) vazio(s).", status:400})
        } else {
            const novoUsuario = primeiraLetraMaiuscula(usuario) 
            const novaSenha = senha.trim()
            const novaConfirmSenha = confirmSenha.trim()

            if (novaSenha.length < 6) {
                return res.status(200).json({Mensagem: "A senha precisa ter no minimo 6 caracteres.", status:400})
            } else {

                if (novaSenha != novaConfirmSenha) {
                    return res.status(200).json({Mensagem: "As senha estão diferentes.", status:400})
                } else {

                    const verificaUsuarioExiste = await pool.query('SELECT * FROM usuarios WHERE nome = $1', [novoUsuario]);
                    if (verificaUsuarioExiste.rows.length > 0) {
                      return res.status(200).json({ Mensagem: 'Usuário já existe', status:400 });
                    } else {

                        const senhaCriptografada = await bcrypt.hash(novaSenha, 10)
    
                        const CadastroUsuario = await pool.query("INSERT INTO usuarios Values($1, $2)," [novoUsuario, senhaCriptografada])
                        if (!CadastroUsuario) {
                            res.status(200).json({Mensagem: "Erro na criação do usuario.", status:400})
                        } else {
                            {
                                res.status(201).json(
                                    {
                                        user: {
                                            id: CadastroUsuario.user_id,
                                            nome,
                                        },
                                        Mensagem: "Usuario cadastrada com sucesso."
                                    }
                                )
                            }
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
            nome, senha
        } = req.body

        if (!nome || !senha) {
            return res.status(200).json({Mensagem: "Há campo(s) vazio(s).", status:400})
        }
        const novoUsuario = primeiraLetraMaiuscula(nome)
        const novaSenha = senha.trim()
        
        const verificaUsuario = await pool.query("Select * from administradores where nome = $1", [novoUsuario])
        if (verificaUsuario.rows.length === 0) {
            return res.status(200).json({Mensagem: 'Usuario ou senha incorretos.', status:400})
        }

        const senhaValida = bcrypt.compareSync(novaSenha, verificaUsuario.rows.senha)
        if (!senhaValida) {
            return res.status(200).json({Mensagem: 'Usuario ou senha incorretos.', status:400})
        }

        const token = jwt.sign({ UsuarioId: verificaUsuario.rows[0].user_id }, process.env.SECRET_JWT, { expiresIn: '24h' });
        res.cookie("token",token,{httpOnly:true})
        return res.status(200).json({ token });
    }
    catch {
        return res.status(500).json({Mensagem: erro.Mensagem})
    }
}

const validarToken = async (req, res) => {
    
    const token =  req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    req.token = token

    if(!token){
        return res.status(200).json({Mensagem:"Token inválido.", status:400})
    }
    
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) =>{
        if(err){
            return res.status(200).json({Mensagem:"Token inválido.", status:400})
        }else{
            req.usuario = decoded.usuario
            return res.status(200).json({Mensagem:"Token válido."})
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

export {
    CadastrarUsuarioControllers, Login, validarToken, deletarToken
}



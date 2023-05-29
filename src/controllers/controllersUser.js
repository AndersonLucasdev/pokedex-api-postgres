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
        if (!verificado) {
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

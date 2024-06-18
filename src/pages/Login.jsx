import React, {useContext, useState} from 'react';
import css from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {Dados} from "../contexts/context";
import {salvaDados} from "../adapter/storage";

function Login() {
    const {fetchData} = useContext(Dados)
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate()

    const  handleEntrar = async (e) => {
        e.preventDefault()
        console.log('Usuário:', usuario);
        console.log('Senha:', senha);
        let resp = await fetchData("/login", "POST", {"email": usuario, "senha": senha})
        setUsuario('');
        setSenha('');
        console.log(resp)

        if (!("response" in resp)) {
            alert(resp.mensagem)
            return
        }

        salvaDados("token", resp.response.token)

        if(resp.mensagem == "Login com sucesso"){
            navigate("/Dashboard")
        }

    };

    return (

        <div className={css.container}>
            <div className={css.tudo}>
                <div>
                    <img className={css.logo} src="./logoatualizada.png" alt=""/>
                </div>
                <div className={css.formcontainer}>
                    <h1>Login</h1>
                </div>
                <form className={css.form} onSubmit={handleEntrar}>

                    <div>
                        <input
                            type="text"
                            id="usuario"
                            placeholder={'Email:'}
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="senha"
                            placeholder={'Senha:'}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                        <button  className={css.botao} type="submit" onClick={(e) => handleEntrar(e)}>Entrar</button>

                </form>
            </div>
        </div>
    )
        ;
}

export default Login;
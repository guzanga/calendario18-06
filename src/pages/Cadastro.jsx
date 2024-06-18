import React, { useState } from 'react';
import css from './Cadastro.module.css';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleEntrar = (e) => {
        e.preventDefault();
        console.log('Usuário:', usuario);
        console.log('Senha:', senha);
        setUsuario('');
        setSenha('');
    };

    return (

        <div className="container">
            <div className={css.tudo}>
                <div>
                    <img className={css.logo} src="./logo.png" alt=""/>
                </div>
                <div className={css.formcontainer}>
                    <h1>Cadastro</h1>
                </div>
                <form className={css.form} onSubmit={handleEntrar}>

                    <div className={css.NomeCpf}>
                        <div>
                            <input
                                type="text"
                                id="nome"
                                placeholder={'Nome:'}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="cpf"
                                placeholder={'Cpf:'}
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={css.UsuarioSenha}>
                        <div>
                            <input
                                type="text"
                                id="usuario"
                                placeholder={'Usuario:'}
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
                    </div>
                    <div>
                        <select value={selectedOption} onChange={handleChange}>
                            <option value="">Selecione...</option>
                            <option value="opcao1">Aluno</option>
                            <option value="opcao2">Professor</option>
                            <option value="opcao3">Coordenador</option>
                        </select>
                    </div>
                    <button className={css.botao} type="submit">Entrar</button>
                </form>
            </div>
        </div>


    )
        ;
}

export default Cadastro;
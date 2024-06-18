import Professores from "../components/Dashboard_Card_Profs"
import css from "./Tela_professores.module.css"
import Header from "../components/Header";
import {useState} from "react";
export default function Tela_Professores (){
    const [busca, setBusca] = useState("");
    return(
        <div className={css.cor_fundo}>
            <Header></Header>
            <div className={css.td}>
                <h2 className={css.titulo}>Buscar Professor</h2>
                <div className={css.barra_pesquisa}>
                    <input
                        className={css.inp}
                        placeholder={"Buscar"}
                        onChange={(event) => setBusca(event.target.value)} // Corrigido aqui
                    />
                    <button className={css.btn}><img className={css.lupa} src="./lupa.png"/></button>

                </div>
                <div className={css.profs}>
                    <Professores busca={busca}></Professores>
                </div>
            </div>
        </div>
    )
}
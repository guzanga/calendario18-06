import css from "./Dashboard_Card_Profs.module.css"
import { Link } from 'react-router-dom';
export default function Dashboard_Lateral_Bar (){
    return(
        <div>
            <div className={css.lateral}>
                <div>
                    <img className={css.logo} src="./logoatualizada.png"/>
                </div>

                <div className={css.td_itens} >
                    <Link to="/Professores" className={css.itens}>Professores</Link>
                    <Link to="/Cursos" className={css.itens}>Cursos</Link>
                    <Link to="/Salas" className={css.itens}>Salas</Link>
                    <Link to="/Alunos" className={css.itens}>Alunos</Link>
                    <Link to="/Calendario" className={css.itens}>Calendário</Link>
                    <Link to="/Feriados" className={css.itens}>Dias não letivos</Link>
                    <Link to="/Emenda" className={css.itens}>Emendas</Link>
                </div>

                <div className={css.traco}>

                </div>

                <div>
                    <Link to="/" className={css.itens}>Sair</Link>
                </div>
            </div>
        </div>
    )
}
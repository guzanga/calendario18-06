import Salas from "../components/Dashboard_Card_Salas"
import Alunos from "../components/Dashboard_Card_Alunos"
import Cursos from "../components/Dashboard_Card_Cursos"
import Profs from "../components/Dashboard_Card_Profs"
import Lateral from "../components/Dashboard_Lateral_Bar"
import css from "./Dashboard.module.css"
export default function Dashboard (){
    return(
        <div>
            <div className={css.divisaomaior}>
                <div className={css.azul}>
                    <Lateral></Lateral>
                </div>
                <div>
                    <div className={css.parte_titulo}>
                        <h2 className={css.titulo}>Controle</h2>
                    </div>

                    <div className={css.divisaomedia}>

                        <div className={css.divisaomenora}>
                            <Profs busca={""}></Profs>
                            <Cursos busca={""}></Cursos>
                        </div>
                        <div className={css.divisaomenorb}>
                            <Alunos busca={""}></Alunos>
                            <Salas busca={""}></Salas>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
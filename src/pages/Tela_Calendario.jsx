import Header from "../components/Header"
import Calendario from "../components/Calendario"
import css from "./Tela_calendario.module.css"
export default function Tela_Calendario(){
    return(
        <div className={css.total}>
            <div className={css.head}>
                <Header></Header>
            </div>

            <div className={css.calend}>
                <Calendario></Calendario>
            </div>

        </div>
    )
}

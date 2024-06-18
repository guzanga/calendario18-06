import css from "./Erro.module.css"
export default function Erro (){
    return(
        <div className={css.td}>
            <div className={css.card}>
                <img className={css.erro} src="./erro.png"/>
                <h2 className={css.titulo}>Erro 404</h2>
            </div>
        </div>
    )
}
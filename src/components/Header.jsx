import Header_css from "./Header.module.css"
import { HiOutlineSave } from "react-icons/hi";
import { Link } from 'react-router-dom';
export default function Header(props){
    return(
        <div className={Header_css.container_header}>
            <img className={Header_css.logo} src="./logoatualizada.png"/>
            <div className={Header_css.As}>
                <Link to="/Dashboard" className={Header_css.a}>DashBoard</Link>
                <Link to="/Calendario" className={Header_css.a}>Calendário</Link>
            </div>
            <Link to={"/"}>
                <button className={Header_css.bb}><HiOutlineSave className={Header_css.icon_sair}/></button>
            </Link>

        </div>
    )
}
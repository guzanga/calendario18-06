import Header from "../components/Header";
import css from "./Feriados.module.css";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { Dados } from "../contexts/context";

Modal.setAppElement("#root");

export default function Emenda() {
    const [emenda, setEmenda] = useState([]);
    const [ignore, setIgnore] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { fetchData } = useContext(Dados);

    useEffect(() => {
        const handleFeriado = async () => {
            let resp = await fetchData("/emenda", "GET");
            setEmenda(resp.response);
        };

        handleFeriado();
    }, [ignore]);

    function convertSQLDateToBR(data_emenda) {
        if (!data_emenda || !/^(\d{4})-(\d{2})-(\d{2})$/.test(data_emenda)) {
            return 'Data inválida';
        }
        const [ano, mes, dia] = data_emenda.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    async function sendChange(id, checked) {
        await fetchData("/emenda", "PUT", { "emenda": checked }, id)
        let resp = await fetchData("/emenda", "GET");
        setEmenda(resp.response);
    }

    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div className={css.td}>
            <Header />
            <div className={css.lista_feriados}>
                <div className={css.container}>
                    <h3 className={css.titulo}>Emendas</h3>
                    <div className={css.listar_feriados}>
                        {emenda?.map((item_emenda, index) => (
                            <div key={index} className={css.feriado_item}>
                                <div className={css.itens} onClick={() => toggleExpansion(index)}>
                                    <p>Nome: {item_emenda.nome}</p>
                                    <p>Data: {convertSQLDateToBR(item_emenda.data_emenda)}</p>
                                    <input className={css.chek} onChange={(event) => sendChange(item_emenda.id, event.target.checked)} checked={item_emenda.emenda} type={"checkbox"} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

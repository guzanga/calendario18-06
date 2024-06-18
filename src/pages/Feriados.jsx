import Header from "../components/Header";
import css from "./Feriados.module.css";
import Modal from "react-modal";
import {useContext, useEffect, useState} from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import {Dados} from "../contexts/context";

Modal.setAppElement("#root");

export default function Feriados() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [feriados, setFeriados] = useState([]);
    const [ignore, setIgnore] = useState(0);
    const [novoFeriado, setNovoFeriado] = useState({
        nome: "",
        data: "",
    });
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [feriadosCadastrados, setFeriadosCadastrados] = useState([]);
    const { fetchData } = useContext(Dados);
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNovoFeriado({ ...novoFeriado, [name]: value });
    }




    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    useEffect(() => {
        const handleFeriado = async () => {
            let resp = await fetchData("/feriado", "GET");
            setFeriados(resp.response);
        };

        handleFeriado();
    }, [ignore]);




    const  handleCadastrarFeriado = async (e) => {
        e.preventDefault()
        setNome('');
        setData('');
        let resp = await fetchData("/feriado", "POST", {"nome": nome, "data": data})
        console.log(resp)
        return window.location.reload();

    };

    function convertSQLDateToBR(data_feriado) {
        if (!data_feriado || !/^(\d{4})-(\d{2})-(\d{2})$/.test(data_feriado)) {
            return 'Data inválida';
        }
        const [ano, mes, dia] = data_feriado.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function handleInputChange(event) {
        setNome(event.target.value);
    }
    function handleInputChange2(event) {
        setData(event.target.value);
    }

    return (
        <div className={css.td}>
            <Header />
            <div className={css.lista_feriados}>
                <div className={css.container}>
                    <h3 className={css.titulo}>Dias não letivos Cadastrados</h3>
                    <div className={css.listar_feriados}>
                        {feriados?.map((feriado, index) => (
                            <div key={index} className={css.feriado_item}>
                                <div className={css.itens2} onClick={() => toggleExpansion(index)}>
                                    <p>Nome: {feriado.nome}</p>
                                    <p>Data:  {convertSQLDateToBR(feriado.data_feriado)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={openModal} className={css.btn_feriados}>Adicionar</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Cadastrar Novo Feriado"
                        overlayClassName={css.modal_overlay}
                        className={css.modal_content}
                    >
                        <div>
                            <h2>Cadastrar Novo Dia não letivo</h2>
                        </div>
                        <div className={css.separa_inps}>
                            <input
                                className={css.inp}
                                placeholder="Nome:"
                                name="nome"
                                value={nome}
                                onChange={handleInputChange}
                            />
                            <input
                                className={css.inp}
                                placeholder="Data:"
                                name="data"
                                type="date"
                                value={data}
                                onChange={handleInputChange2}
                            />
                        </div>
                        <div>
                            <button className={css.cadastrar_btn} onClick={handleCadastrarFeriado}>
                                Cadastrar
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );}

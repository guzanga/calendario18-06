import css from "./Dashboard_Card_Profs.module.css";
import Modal from "react-modal";
import {useContext, useEffect, useState} from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import {salvaDados} from "../adapter/storage";
import {Dados} from "../contexts/context";

Modal.setAppElement("#root");

export default function Dashboard_Card_Salas({ busca }) {
    const {fetchData} = useContext(Dados)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [salasCadastradas, setSalasCadastradas] = useState([]);
    const [nome, setNome] = useState("");

    useEffect(() => {
        const  handlePegarSala = async (e) => {
            let resp = await fetchData("/sala", "GET")
            let nome = resp.response
            console.log(resp)
            setSalasCadastradas(nome)
        };

        handlePegarSala()
    }, [nome]);

    const deletarSala = async (e) => {
        let resp = await fetchData("/sala/" + e.currentTarget.attributes.getNamedItem("data-id").value, "DELETE");
        console.log(resp);

        if (resp.mensagem == "Há cursos que dependem dessa sala"){
            alert("Há cursos que dependem dessa sala")
        }

        else{
            return window.location.reload();
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const  handleCadastrarSala = async (e) => {
        e.preventDefault()
        setNome('');
        let resp = await fetchData("/sala", "POST", {"nome": nome})
        console.log(resp)

        if (!("response" in resp)) {
            return window.location.reload();
        }
        closeModal();

    };

    function handleInputChange(event) {
        setNome(event.target.value);
    }

    function handleExcluirSala(index) {
        const updatedSalas = [...salasCadastradas];
        updatedSalas.splice(index, 1);
        setSalasCadastradas(updatedSalas);
    }


    return (
        <div>
            <div className={css.card_profs}>
                <h4 className={css.titulo}>Salas Cadastradas</h4>
                <div className={css.todos_cursos}>
                    {salasCadastradas
                        .filter((sala) => sala?.nome.includes(busca))
                        .map((sala, index) => (
                        <div className={css.campo} key={index}>
                            <p className={css.professores}> Nome: {sala.nome}</p>
                            <button data-id={sala.id}
                                    onClick={(e) => deletarSala(e)}
                                className={css.btn_lixeira}
                            >
                                <HiArchiveBoxXMark className={css.icon_lixeira}/>
                            </button>
                        </div>
                    ))}
                </div>
                <button className={css.mais} onClick={openModal}>+</button>
                <div className={css.plus}>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                    >
                        <div className="modal-content">
                            <div>
                                <h2>Cadastrar Nova Sala</h2>
                            </div>
                            <div className={css.separa_inps}>
                                <input
                                    type={"text"}
                                    className={css.inp}
                                    placeholder={"Nome:"}
                                    value={nome}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    className={css.cadastrar_btn}
                                    onClick={handleCadastrarSala}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

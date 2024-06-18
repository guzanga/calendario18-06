import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { Dados } from "../contexts/context";
import css from "./Dashboard_Card_Profs.module.css";
import { Link, useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const passwordIsSecure = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password);
};

export default function Dashboard_Card_Alunos({ busca }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");
    const [alunosCadastrados, setAlunosCadastrados] = useState([]);
    const { fetchData } = useContext(Dados);
    const [ignore, setIgnore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const handlePegarAluno = async () => {
            let resp = await fetchData("/aluno", "GET");
            setAlunosCadastrados(resp.response);
        };

        handlePegarAluno();
    }, [ignore]);

    const deletarAluno = async (e) => {
        let resp = await fetchData("/usuario/" + e.currentTarget.attributes.getNamedItem("data-id").value, "DELETE");
        console.log(resp);

        if (!("response" in resp)) {
            return window.location.reload();
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleCadastrarUser = async (e) => {
        e.preventDefault();

        if (!emailIsValid(email)) {
            alert("Email inválido");
            return;
        }

        if (!passwordIsSecure(senha)) {
            alert("A senha deve ter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula e um número.");
            return;
        }

        setNome("");
        setSenha("");
        setEmail("");
        let resp = await fetchData("/usuario", "POST", { nome: nome, senha: senha, email: email, cargo: "aluno" });
        console.log(resp);

        if (!("response" in resp)) {
            return window.location.reload();
        }
        closeModal();
        setIgnore(ignore + 1);
    };

    function handleInputChange(event) {
        setNome(event.target.value);
    }

    function handleInputChange2(event) {
        setEmail(event.target.value);
    }

    function handleInputChange3(event) {
        setSenha(event.target.value);
    }

    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div>
            <div className={css.card_profs}>
                <h4 className={css.titulo}>Alunos Cadastrados</h4>
                <div className={css.todos_alunos}>
                    {alunosCadastrados
                        .filter((aluno) => aluno?.nome.includes(busca))
                        .map((aluno, index) => (
                            <div className={css.campo2} key={index}>
                                <div className={css.separa_nome}>
                                    <p className={css.professores}>Nome: {aluno.nome}</p>
                                    <button data-id={aluno.id} className={css.btn_lixeira}
                                            onClick={(e) => deletarAluno(e)}>
                                        <HiArchiveBoxXMark className={css.icon_lixeira}/>
                                    </button>
                                </div>

                                {expandedIndex === index && (
                                    <>
                                        <p className={css.professores}>Email: {aluno.email}</p>
                                    </>
                                )}

                                <div className={css.lado}>
                                    <button className={css.btn_vermais} onClick={() => toggleExpansion(index)}>
                                        {expandedIndex === index ? "Ver menos" : "Ver mais"}
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <button className={css.mais} onClick={openModal}>
                    +
                </button>
            </div>

            <div className={css.plus}>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" overlayClassName="modal-overlay">
                    <div className="modal-content">
                        <div>
                            <h2>Cadastrar Novo Aluno</h2>
                        </div>
                        <div className={css.separa_inps}>
                            <input className={css.inp} placeholder={"Nome:"} value={nome} onChange={handleInputChange} />
                            <input className={css.inp} placeholder={"Email:"} value={email} onChange={handleInputChange2} />
                            <input className={css.inp} type="password" placeholder={"Senha:"} value={senha} onChange={handleInputChange3} />
                            <button className={css.cadastrar_btn} onClick={handleCadastrarUser}>
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

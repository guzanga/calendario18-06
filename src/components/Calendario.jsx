import {useContext, useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptLocale from '@fullcalendar/core/locales/pt';
import Modal from "react-modal";
import {Dados} from "../contexts/context";

Modal.setAppElement("#root");

const Calendario = () => {
    const [feriados, setFeriado] = useState([])
    const [emendas, setEmenda] = useState([])
    const [aulas, setAulas] = useState([])
    const [ignore, setIgnore] = useState(0);
    const { fetchData } = useContext(Dados);

    useEffect(() => {
        const handleEmenda = async () => {
            let resp = await fetchData("/emenda", "GET");
            const emendadinha = resp.response.map(item => ({
                title: item.nome,
                start: item.data_emenda,
                color:"#fcbf49"
            }));
            setEmenda(emendadinha)
        };

        handleEmenda()
    }, [ignore]);


    useEffect(() => {
        const handleFeriado = async () => {
            let resp = await fetchData("/feriado", "GET");
            const fullCalendarEvents = resp.response.map(feriado => ({
                title: feriado.nome,
                start: feriado.data_feriado,
                color:"#c1121f"
            }));
            setFeriado(fullCalendarEvents)
        };

        handleFeriado();
    }, [ignore]);

    useEffect(() => {
        const handleCursos = async () => {
            let resp = await fetchData("/curso", "GET");
            let list = []
            console.log(resp.response)

            resp.response.forEach((element) => {
                console.log(element)
                const cursinhos = element.aulas.map(item => ({
                    title: element.nome,
                    start: item,
                    color:"#8efc49"
                }));
                console.log(cursinhos)
                list = list.concat(cursinhos)
            })
            setAulas(list)
            console.log(list)
        };

        handleCursos();
    }, [ignore]);

    return (
        <div>
        <FullCalendar
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
            ]}
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            locale={ptLocale}
            events={[...aulas, ...emendas, ...feriados]}

        />
        </div>
)
    ;
};

export default Calendario;

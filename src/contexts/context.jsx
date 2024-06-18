import {createContext, useState} from 'react'
import {recuperaDados} from "../adapter/storage";

const Dados = createContext()


function DadosProvider({ children }) {



    const fetchData = async (url, method, body= null, id= null) => {
        console.log(url, method, body, id)

        let auth = recuperaDados("token")

        if (method in ['GET', 'POST', "PUT", "DELETE"]) {
            return {"mensagem": "Erro: Método não selecionado"}
        }

        if (method in ["PUT", "DELETE"] && id === null ) {
            return {"mensagem": "Erro: ID não selecionado"}
        }

        if (id !== null) {
            url += "/" + id
        }

        let config = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (body) {
            config.body = JSON.stringify(body)
        }

        if (auth) {
            config.headers.Authorization = "Bearer " + auth
        }

        let rota = "http://192.168.1.121:5000"+url
        return await fetch(rota, config)
            .then(response => response.json())
    }


    return (
        <Dados.Provider value={{ fetchData}}>
            { children }
        </Dados.Provider>
    )
}


export {Dados, DadosProvider}
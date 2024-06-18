export function salvaDados(item, valor) {
    localStorage.setItem(item, valor)
}

export function recuperaDados(item) {
    return localStorage.getItem(item) || null
}
import { typeMessage } from "../types";

export const waitFor = (time: number): Promise<void> => {
    // return new Promise(resolve => setTimeout(resolve, time-time)); // La uso muchas veces en desarrollo
    return new Promise(resolve => setTimeout(resolve, time))
}

export const escribirTexto = async (p: HTMLParagraphElement, message: typeMessage["text"], options: { animado?: boolean, currentDiv: HTMLDivElement | null }) => {
    const { animado = true, currentDiv } = options;

    p.innerHTML = "";

    if (!currentDiv) return null

    if (!animado) {
        p.textContent = message;
        currentDiv.scrollTo(0, currentDiv.scrollHeight);
        return null;
    }

    for (let i = 0; i < message.length; i++) {
        const caracter = message[i];
        let time = 35;

        currentDiv.scrollTo(0, currentDiv.scrollHeight);
        
        if (caracter === "...") {
            time *= 7;
        
        } else if (caracter === ".") {
            time *= 6;
        
        } else if (caracter === "," || caracter === "!" || caracter === "?") {
            time *= 5;
        }
        
        await waitFor(time);
        p.textContent += message[i];
    }
}

export const numeroAlAzar = (num1: number, num2: number): number => {
    const randomAmpliado = Math.random()*(num2-num1) //  Número al azar entre 0 y (num2-num1) (este último sin incluir)
    return num1 + randomAmpliado // Desplazo el rango para que inicie donde inicia el número más pequeño (num1)
}

export const probabilidadDeN = (n: number): boolean => {
    return Math.random()*100 <= n
}

export const elementoAlAzar = (array: string[]) => { // No es necesariamene para strings, pero es para lo que lo voy a usar
    return array[Math.floor(Math.random()*array.length)]
}

export const elementoAlAzarMessage = (array: (typeMessage[])) => { // No es necesariamene para strings, pero es para lo que lo voy a usar
    return array[Math.floor(Math.random()*array.length)]
}

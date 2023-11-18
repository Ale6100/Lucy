import { typeMessage } from "./types";

export const waitFor = (time: number): Promise<void> => {
    // return new Promise(resolve => setTimeout(resolve, time-time)); // La uso muchas veces en desarrollo
    return new Promise(resolve => setTimeout(resolve, time))
}

export const escribirTexto = async (p: HTMLParagraphElement, message: typeMessage["text"], animado = true) => {
    p.innerHTML = "";

    if (!animado) {
        p.textContent = message;
        return null;
    }

    for (let i = 0; i < message.length; i++) {
        const caracter = message[i];
        let time = 30;
        
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

export const colorRandom = (): `rgb(${number},${number},${number})` => {
    const red = Math.floor(Math.random()*256)
    const green = Math.floor(Math.random()*256)
    const blue = Math.floor(Math.random()*256)
    return `rgb(${red},${green},${blue})`
}

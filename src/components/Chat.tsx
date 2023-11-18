import { useEffect, useRef, useState } from "react"
import { typeMessage } from "../types";
import { colorRandom, escribirTexto, numeroAlAzar, waitFor } from "../utils";
import { dialogos } from "../dialogos";

const bgColorRandomChat = colorRandom();
const colorRandomBordeChat = colorRandom();

const Chat = ({ container }: { container: React.RefObject<HTMLDivElement>}) => {
    const [messages, setMessages] = useState<typeMessage[]>([dialogos[0]]);

    const pActual = useRef<HTMLParagraphElement>(null);
    const divChat = useRef<HTMLDivElement>(null);

    useEffect(() => {        
        const p = pActual.current;

        const currentMessage = messages[messages.length - 1];

        if (currentMessage && p) {
            const animado = currentMessage.user === "ia"
            escribirTexto(p, currentMessage.text, animado);
        }
        // eslint-disable-next-line
    }, []);

    const sendFirstMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.target;

        if (form instanceof HTMLFormElement) {
            const messageInput = form.elements.namedItem("message");

            if (messageInput instanceof HTMLInputElement) {
                const message = messageInput.value.trim();
                if (message === "") return;
                setMessages((prev) => [...prev, { id: 2, text: message, user: "user" }]);
            }
            
            const button = form.lastChild;
            
            if (button instanceof HTMLButtonElement) {
                button.disabled = true;
                button.style.setProperty("background-color", "gray")
            }
            form.reset();
        }

        const arrayTextos: typeMessage[] = []
        for (let index = 2; index <= 4; index++) {
            arrayTextos.push(dialogos.find(dialogo => dialogo.id === index)!)
        }

        const p = pActual.current;
        const cont = container.current;
        const div = divChat.current;

        if (p && cont && div) {
            for (let i = 0; i < arrayTextos.length; i++) {
                const texto = arrayTextos[i];
                setMessages((prev) => [...prev, texto]);
                await escribirTexto(p, texto.text);
                await waitFor(numeroAlAzar(1000, 2000));                
            }

            cont.classList.add("py-5")
            await waitFor(1000);

            div.classList.add("w-5/6")
            await waitFor(1000);

            div.classList.add("mx-auto")
            await waitFor(1000);

            div.classList.add("max-w-3xl")
            await waitFor(1000);

            div.style.setProperty("background-color", "rgb(31 41 55)");
            await waitFor(1000);

            div.classList.add("rounded")
            await waitFor(1000);

            div.style.setProperty("border-color", "rgb(0, 0, 0)");
            
        }
    }

    return (
        <section ref={divChat} className={`h-full border flex flex-col`} style={{ backgroundColor: bgColorRandomChat, borderColor: colorRandomBordeChat }}>
            <div className="py-1 h-16 bg-blue-800 flex justify-center items-center">
                <h1 onClick={() => setMessages((prev) => [...prev, { id: 1, text: "asd", user: "ia" }])} className="text-2xl text-white">Lucy, inteligencia artificial</h1>
            </div>

            <div className="mx-1 mt-1 overflow-y-scroll flex-1">
                {
                    messages.map((message, index) => (
                        index !== messages.length - 1 && 
                        <div key={index} className={`${index === 0 ? "" : "mt-5"} flex ${message.user === "ia" ? "justify-start" : "justify-end"}`}>
                            <p className="p-1 border bg-slate-300 border-black rounded">{message.text}</p>
                        </div>
                    ))
                }

                <div className={`${messages.length === 1 ? "" : "mt-5"} flex`}>
                    <p className="p-1 border bg-slate-300 border-black rounded" ref={pActual}></p>
                </div>
            </div>

            <form onSubmit={sendFirstMessage} className="flex">
                <input type="text" className="h-10 flex-1" name="message" />
                <button type="submit" className="w-20 h-10 bg-blue-800 text-white">Enviar</button>
            </form>
        </section>
    )
}

export default Chat

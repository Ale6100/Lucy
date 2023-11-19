import { typeMessage } from "../types";
import { dialogos } from "../dialogos";
import { escribirTexto, numeroAlAzar, waitFor } from "./utils";

export const sendFirstMessage = async (e: React.FormEvent<HTMLFormElement>, setMessages: React.Dispatch<React.SetStateAction<typeMessage[]>>, pActual: React.RefObject<HTMLParagraphElement>, container: React.RefObject<HTMLDivElement>, divChat: React.RefObject<HTMLDivElement>, divHeader: React.RefObject<HTMLDivElement>, inputRef: React.RefObject<HTMLInputElement>, buttonRef: React.RefObject<HTMLButtonElement>, formRef: React.RefObject<HTMLFormElement>, optionsRef: React.RefObject<HTMLDivElement>, divMessages: React.RefObject<HTMLDivElement>, setOptions: React.Dispatch<React.SetStateAction<typeMessage[]>>) => {
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
    const divC = divChat.current;
    const divH = divHeader.current;
    const inputForm = inputRef.current;
    const buttonForm = buttonRef.current;
    const formC = formRef.current;
    const options = optionsRef.current;

    if (p && cont && divC && divH && inputForm && buttonForm && formC && options) {
        for (let i = 0; i < arrayTextos.length; i++) {
            const texto = arrayTextos[i];
            setMessages((prev) => [...prev, texto]);
            await escribirTexto(p, texto.text, { currentDiv: divMessages.current});
            await waitFor(numeroAlAzar(1000, 2000));                
        }

        const windowInnerWidth = window.innerWidth;
        if (windowInnerWidth <= 768 && windowInnerWidth < window.innerHeight) {
            cont.classList.replace("py-10", "py-20");
        } else {
            cont.classList.replace("py-10", "py-5");
        }
        await waitFor(1000);

        divC.classList.add("w-11/12")
        await waitFor(1000);

        divC.classList.add("mx-auto")
        await waitFor(1000);

        divC.classList.add("max-w-4xl")
        await waitFor(1000);

        divC.style.setProperty("background-color", "rgb(31 41 55)");
        await waitFor(1000);

        divH.style.setProperty("background-color", "rgb(30 64 175)");
        await waitFor(1000);

        divH.classList.add("h-16", "py-1")
        await waitFor(1000);

        divC.classList.add("rounded")
        divC.classList.replace("border-2", "border")
        divH.classList.add("rounded-t")
        inputForm.classList.add("rounded-bl")
        buttonForm.classList.add("rounded-br")        
        await waitFor(1000);

        cont.classList.replace("bg-slate-200", "bg-slate-400")
        divC.style.setProperty("border-color", "rgb(0, 0, 0)");
        await waitFor(1000);

        formC.classList.add("scale-0")
        await waitFor(1000);

        const dialogoId5 = dialogos.find(dialogo => dialogo.id === 5)!;
        setMessages((prev) => [...prev, dialogoId5]);
        await escribirTexto(p, dialogoId5.text, {currentDiv: divMessages.current});
        await waitFor(1000);

        formC.classList.replace("flex", "hidden")
        await waitFor(1000);
        
        options.classList.replace("hidden", "flex")
        await waitFor(1000);

        const dialogoId6 = dialogos.find(dialogo => dialogo.id === 6)!;
        setMessages((prev) => [...prev, dialogoId6]);
        await escribirTexto(p, dialogoId6.text, {currentDiv: divMessages.current});
        await waitFor(1500);

        const dialogoId7 = dialogos.find(dialogo => dialogo.id === 7)!;
        const dialogoId8 = dialogos.find(dialogo => dialogo.id === 8)!;
        setOptions([dialogoId7, dialogoId8]);
    }
}

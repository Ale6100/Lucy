import { typeMessage } from "../types";
import { waitFor } from "./utils";

export const sendFirstMessage = async (e: React.FormEvent<HTMLFormElement>, setMessages: React.Dispatch<React.SetStateAction<typeMessage[]>>, pActual: React.RefObject<HTMLParagraphElement>, container: React.RefObject<HTMLDivElement>, divChat: React.RefObject<HTMLDivElement>, divHeader: React.RefObject<HTMLDivElement>, inputRef: React.RefObject<HTMLInputElement>, buttonRef: React.RefObject<HTMLButtonElement>, formRef: React.RefObject<HTMLFormElement>, optionsRef: React.RefObject<HTMLDivElement>, pDivisor: React.RefObject<HTMLParagraphElement>, generarDialogo: (id: number, finalTime?: number) => Promise<null | undefined>, generarOpciones: (...ids: number[]) => null | undefined) => {
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

    await generarDialogo(2);
    await generarDialogo(3);
    await generarDialogo(4);

    const p = pActual.current;
    const cont = container.current;
    const divC = divChat.current;
    const divH = divHeader.current;
    const inputForm = inputRef.current;
    const buttonForm = buttonRef.current;
    const formC = formRef.current;
    const options = optionsRef.current;
    const pD = pDivisor.current

    if (p && cont && divC && divH && inputForm && buttonForm && formC && options && pD) {
        if ( window.innerWidth < window.innerHeight) {
            cont.classList.add("py-5");
        } else {
            cont.classList.replace("pb-32", "py-5");
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

        await generarDialogo(5);

        formC.classList.replace("flex", "hidden")
        options.classList.replace("hidden", "flex")
        pD.classList.replace("hidden", "flex")
        await waitFor(1000);
        
        pD.classList.add("border", "my-1", "border-red-500")
        await waitFor(1000);

        await generarDialogo(6);
        await waitFor(1500);

        generarOpciones(7, 8);
    }
}

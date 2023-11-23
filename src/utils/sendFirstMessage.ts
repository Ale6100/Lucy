import { typeMessage } from "../types";
import { waitFor } from "./utils";

export const sendFirstMessage = async (e: React.FormEvent<HTMLFormElement>, setMessages: React.Dispatch<React.SetStateAction<typeMessage[]>>, formRef: React.RefObject<HTMLFormElement>, optionsRef: React.RefObject<HTMLDivElement>, pDivisor: React.RefObject<HTMLParagraphElement>, generarDialogo: (id: number, finalTime?: number) => Promise<null | undefined>, generarOpciones: (...ids: number[]) => null | undefined) => {
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

    const formC = formRef.current;
    const options = optionsRef.current;
    const pD = pDivisor.current

    if (formC && options && pD) {
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

function sendLink(event: Event): boolean {
    event.preventDefault();

    const newlink = document.querySelector(
        "div#newLink"
    ) as HTMLDivElement | null;
    const valueNew = document.querySelector(
        "p#shortenedValue"
    ) as HTMLParagraphElement | null;

    if (newlink && valueNew) {
        newlink.classList.remove("d-none");
        valueNew.innerHTML = "nova url";
    }

    return false;
}

function copyUrl(): void {
    const valueToCopy = document.querySelector(
        "p#shortenedValue"
    ) as HTMLParagraphElement | null;

    if (valueToCopy) {
        const text = valueToCopy.innerText;

        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("Texto copiado!");
            })
            .catch((err) => {
                console.error("Erro ao copiar:", err);
            });
    }
}

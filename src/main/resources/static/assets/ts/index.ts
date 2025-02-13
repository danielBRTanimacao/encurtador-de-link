const handleSendLink = async (event: Event): Promise<void> => {
    event.preventDefault();

    const inputElement = document.querySelector(
        "input#linkDigitedId"
    ) as HTMLInputElement | null;

    const newLinkDiv = document.querySelector(
        "div#newLink"
    ) as HTMLDivElement | null;

    const valueNew = document.querySelector(
        "p#shortenedValue"
    ) as HTMLParagraphElement | null;

    if (!inputElement || !inputElement.value.trim()) {
        alert("Digite uma URL válida!");
        return;
    }

    try {
        const response = await fetch(
            `/api/shorten?url=${encodeURIComponent(inputElement.value)}`,
            {
                method: "POST"
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao encurtar a URL");
        }

        const shortUrl = await response.text();

        if (newLinkDiv && valueNew) {
            newLinkDiv.classList.remove("d-none");
            valueNew.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao encurtar a URL.");
    }
};

const handleCopyUrl = (): void => {
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
};

document.querySelector("form")?.addEventListener("submit", handleSendLink);

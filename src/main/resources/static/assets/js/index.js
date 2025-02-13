"use strict";
const handleSendLink = (event) => {
    event.preventDefault();
    const newlink = document.querySelector("div#newLink");
    const valueNew = document.querySelector("p#shortenedValue");
    if (newlink && valueNew) {
        newlink.classList.remove("d-none");
        valueNew.innerHTML = "nova url";
    }
    return false;
};
const handleCopyUrl = () => {
    const valueToCopy = document.querySelector("p#shortenedValue");
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

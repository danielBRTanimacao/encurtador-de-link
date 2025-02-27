"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const handleSendLink = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const inputElement = document.querySelector("input#linkDigitedId");
    const newLinkDiv = document.querySelector("div#newLink");
    const valueNew = document.querySelector("p#shortenedValue");
    if (!inputElement || !inputElement.value.trim()) {
        alert("Digite uma URL válida!");
        return;
    }
    const filteredUrl = extractMainPart(inputElement.value);
    try {
        const response = yield fetch(`/api/shorten?url=${encodeURIComponent(filteredUrl)}`, {
            method: "POST"
        });
        if (!response.ok) {
            throw new Error("Erro ao encurtar a URL");
        }
        const shortUrl = yield response.text();
        if (newLinkDiv && valueNew) {
            newLinkDiv.classList.remove("d-none");
            valueNew.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
        }
    }
    catch (error) {
        const divAlert = document.querySelector("div.alert");
        if (divAlert) {
            divAlert.classList.remove("d-none");
            divAlert.innerHTML = `Não foi possível encurtar o link... ${error}`;
        }
    }
});
const extractMainPart = (url) => {
    const match = url.match(/^(https?:\/\/[^\/]+\/(?:[^\/]+\/){2}[^\/]+\/)/);
    return match ? match[1] : url;
};
const handleCopyUrl = () => {
    const valueToCopy = document.querySelector("p#shortenedValue");
    if (valueToCopy) {
        const text = valueToCopy.innerText;
        navigator.clipboard
            .writeText(text)
            .then(() => {
            var _a;
            (_a = document
                .querySelector("small.copyed")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none");
        })
            .catch((err) => {
            var _a;
            (_a = document
                .querySelector("small.copydanger")) === null || _a === void 0 ? void 0 : _a.classList.remove("d-none");
            console.error("Erro ao copiar:", err);
        });
    }
};
(_a = document.querySelector("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleSendLink);

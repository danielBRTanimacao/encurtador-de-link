function sendLink(event) {
    event.preventDefault();
    var newlink = document.querySelector("div#newLink");
    var valueNew = document.querySelector("p#shortenedValue");
    if (newlink && valueNew) {
        newlink.classList.remove("d-none");
        valueNew.innerHTML = "nova url";
    }
    return false;
}
function copyUrl() {
    var valueToCopy = document.querySelector("p#shortenedValue");
    if (valueToCopy) {
        var text = valueToCopy.innerText;
        navigator.clipboard
            .writeText(text)
            .then(function () {
            alert("Texto copiado!");
        })
            .catch(function (err) {
            console.error("Erro ao copiar:", err);
        });
    }
}

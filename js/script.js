const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qr-code img");
const qrCodeDownload = document.querySelector("#qr-code button");

//eventos
function generateQrCode() {
    const qrCodeInputValue = qrCodeInput.value;
    if (!qrCodeInputValue) return;
    qrCodeBtn.innerText = "Gerando código...";
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qrCodeInputValue}`;

    

    qrCodeImg.addEventListener("load", () => {
        container.classList.add("active");
        qrCodeBtn.innerText = "QRCode gerado!";
    
    });
    
}
qrCodeBtn.addEventListener("click", () => {
    generateQrCode();
});

qrCodeDownload.addEventListener("click", () => {
    const qrImageSrc = qrCodeImg.src;

    // Usando o fetch para baixar a imagem
    fetch(qrImageSrc)
        .then(response => response.blob()) // Converte a resposta em um Blob
        .then(blob => {
            const link = document.createElement("a");
            const blobUrl = URL.createObjectURL(blob); // Cria a URL do Blob

            link.href = blobUrl; // Define o href como a URL do Blob
            link.download = "qrcode.png"; // Nome do arquivo para download
            link.click(); // Dispara o clique para o download

            URL.revokeObjectURL(blobUrl); // Libera o objeto URL criado
        })
        .catch(error => {
            console.error("Erro ao baixar o QR Code:", error);
        });
});

qrCodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateQrCode();
    }
});

qrCodeInput.addEventListener("keyup", () => {
    if (!qrCodeInput.value) {
        container.classList.remove("active");
        qrCodeBtn.innerText = "Gerar QRCode";
    }
});
// Pega o nome da URL
const params = new URLSearchParams(window.location.search);
const username = params.get("username") || "Jogador";

// Coloca o nome no HUD
document.querySelector(".nome").textContent = username;

const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-input");

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const msg = document.createElement("div");

    const nameSpan = document.createElement("span");
    nameSpan.style.color = "blue";
    nameSpan.textContent = `${username}: `;

    const msgSpan = document.createElement("span");
    msgSpan.style.color = "white";
    msgSpan.textContent = chatInput.value;

    msg.appendChild(nameSpan);
    msg.appendChild(msgSpan);
    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      msg.style.transition = "opacity 0.5s";
      msg.style.opacity = "0";
      setTimeout(() => msg.remove(), 500);
    }, 8000);

    chatInput.value = "";
  }
});

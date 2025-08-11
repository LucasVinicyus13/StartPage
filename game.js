// Inicializa Firebase (caso ainda não tenha sido feito)
const auth = firebase.auth();
const db = firebase.firestore();

// Verifica autenticação e carrega dados do jogador
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "register.html";
        return;
    }

    try {
        const userDoc = await db.collection("users").doc(user.uid).get();
        if (!userDoc.exists) {
            window.location.href = "register.html";
            return;
        }

        const data = userDoc.data();
        document.querySelector(".info_user .nome").textContent = data.username || "Jogador";

    } catch (error) {
        console.error("Erro ao carregar dados do jogador:", error);
        window.location.href = "register.html";
    }
});

// CHAT RETRÁTIL
const chatContainer = document.querySelector(".chat-container");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector("#chat-input");

chatContainer.addEventListener("mouseenter", () => {
    chatContainer.classList.add("open");
});
chatContainer.addEventListener("mouseleave", () => {
    chatContainer.classList.remove("open");
});

chatInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && chatInput.value.trim() !== "") {
        let user = auth.currentUser;
        if (!user) return;

        try {
            const userDoc = await db.collection("users").doc(user.uid).get();
            const username = userDoc.exists ? userDoc.data().username : "Jogador";

            const msg = document.createElement("div");
            msg.innerHTML = `<span class="chat-name">${username}:</span> <span class="chat-text">${chatInput.value}</span>`;
            chatMessages.appendChild(msg);

            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Remove mensagem após 8s
            setTimeout(() => {
                msg.style.transition = "opacity 0.5s";
                msg.style.opacity = "0";
                setTimeout(() => msg.remove(), 500);
            }, 8000);

        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
        }

        chatInput.value = "";
    }
});

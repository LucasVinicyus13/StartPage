// Verifica autenticação e nome de usuário
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const urlName = urlParams.get("username");

        firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const storedName = doc.data().username;
                if (storedName !== urlName) {
                    window.location.href = "index.html";
                    return;
                }
                document.querySelector(".nome").textContent = storedName;
                initChat(storedName);
            } else {
                window.location.href = "index.html";
            }
        });
    } else {
        window.location.href = "index.html";
    }
});

function initChat(playerName) {
    const chatBox = document.querySelector(".chat-box");
    const chatInput = document.getElementById("chatInput");

    chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && chatInput.value.trim() !== "") {
            const msg = document.createElement("div");
            msg.innerHTML = `<span style="color:blue">${playerName}:</span> <span style="color:white">${chatInput.value}</span>`;
            chatBox.appendChild(msg);
            chatBox.scrollTop = chatBox.scrollHeight;

            setTimeout(() => {
                msg.style.transition = "opacity 0.5s";
                msg.style.opacity = "0";
                setTimeout(() => msg.remove(), 500);
            }, 8000);

            chatInput.value = "";
        }
    });
}

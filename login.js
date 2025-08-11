// Inicialização Firebase
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("btnLogin").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagemErro = document.getElementById("mensagemErro");

    auth.signInWithEmailAndPassword(email, senha)
        .then(userCredential => {
            const user = userCredential.user;

            // Busca o nome do jogador no Firestore
            db.collection("jogadores").doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        const nomeJogador = doc.data().nome;
                        localStorage.setItem("nomeJogador", nomeJogador);
                    } else {
                        localStorage.setItem("nomeJogador", "Jogador");
                    }

                    window.location.href = "https://start-page-steel.vercel.app/game.html";
                })
                .catch(error => {
                    console.error("Erro ao buscar nome:", error);
                    localStorage.setItem("nomeJogador", "Jogador");
                    window.location.href = "https://start-page-steel.vercel.app/game.html";
                });
        })
        .catch(() => {
            mensagemErro.textContent = "E-mail ou senha incorretos";
        });
});

document.getElementById("btnLogin").addEventListener("click", function() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagemErro = document.getElementById("mensagemErro");

    if (!email || !senha) {
        mensagemErro.textContent = "Preencha todos os campos!";
        return;
    }

    auth.signInWithEmailAndPassword(email, senha)
        .then(userCredential => {
            const user = userCredential.user;

            // Buscar nome do jogador no Firestore
            db.collection("jogadores").doc(user.uid).get()
                .then(doc => {
                    if (doc.exists) {
                        const nomeJogador = doc.data().nome;
                        localStorage.setItem("nomeJogador", nomeJogador);
                    } else {
                        localStorage.setItem("nomeJogador", "Jogador");
                    }

                    // Redirecionar para o jogo
                    window.location.href = "https://start-page-steel.vercel.app/game.html";
                })
                .catch(error => {
                    console.error("Erro ao buscar nome:", error);
                    localStorage.setItem("nomeJogador", "Jogador");
                    window.location.href = "https://start-page-steel.vercel.app/game.html";
                });
        })
        .catch(error => {
            mensagemErro.textContent = "E-mail ou senha incorretos";
        });
});

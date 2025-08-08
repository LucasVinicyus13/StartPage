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
            // Login bem-sucedido
            window.location.href = "jogo.html";
        })
        .catch(error => {
            mensagemErro.textContent = "E-mail ou senha incorretos";
        });
});

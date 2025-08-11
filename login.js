document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const feedback = document.getElementById("feedback");

  try {
    // Login no Firebase
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;

    // Buscar nome do jogador no Firestore
    const userDoc = await db.collection("users").doc(userId).get();

    if (userDoc.exists) {
      const username = userDoc.data().username;
      // Redireciona com nome na URL
      window.location.href = `game.html?username=${encodeURIComponent(username)}`;
    } else {
      feedback.textContent = "Usuário não encontrado no banco de dados.";
    }
  } catch (error) {
    feedback.textContent = "E-mail ou senha incorretos.";
  }
});

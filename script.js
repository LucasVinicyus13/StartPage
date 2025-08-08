const classButtons = document.querySelectorAll('.class-btn');
const selectedClassInput = document.getElementById('selectedClass');
const feedback = document.getElementById('feedback');

classButtons.forEach(button => {
  button.addEventListener('click', () => {
    classButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedClassInput.value = button.dataset.class;
  });
});

document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const selectedClass = selectedClassInput.value;

  if (!selectedClass) {
    feedback.textContent = '❗ Escolha uma classe antes de continuar!';
    return;
  }

  feedback.textContent = '🔄 Verificando...';

  try {
    // Verifica se o nome de usuário já existe
    const snapshot = await db.collection('users')
      .where('username', '==', username)
      .get();

    if (!snapshot.empty) {
      feedback.textContent = '❌ Nome de usuário já em uso!';
      return;
    }

    // Cria conta no Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;

    // Salva no Firestore
await db.collection('users').doc(userId).set({
  username,
  email,
  class: selectedClass,
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

// Redireciona para a tela do jogo com o nome de usuário na URL
window.location.href = `game.html?username=${encodeURIComponent(username)}`;

    feedback.textContent = `✅ Conta criada com sucesso como ${selectedClass}! Bem-vindo, ${username}!`;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      feedback.textContent = '❌ Este e-mail já está em uso.';
    } else if (error.code === 'auth/weak-password') {
      feedback.textContent = '❌ Senha muito fraca. Use 6 caracteres ou mais.';
    } else {
      feedback.textContent = `❌ Erro: ${error.message}`;
    }
  }
});

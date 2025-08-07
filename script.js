const classButtons = document.querySelectorAll('.class-btn');
const selectedClassInput = document.getElementById('selectedClass');
const feedback = document.getElementById('feedback');

classButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remover classe "selected" de todos
    classButtons.forEach(btn => btn.classList.remove('selected'));
    // Adicionar ao clicado
    button.classList.add('selected');
    // Salvar valor ocultamente
    selectedClassInput.value = button.dataset.class;
  });
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const selectedClass = selectedClassInput.value;

  if (!selectedClass) {
    feedback.textContent = '❗ Escolha uma classe antes de continuar!';
    return;
  }

  // Aqui você pode enviar para o backend ou Firebase
  console.log('Usuário:', username);
  console.log('Email:', email);
  console.log('Senha:', password);
  console.log('Classe:', selectedClass);

  feedback.textContent = `✅ Conta criada com sucesso como ${selectedClass}! Bem-vindo, ${username}!`;
});

// Pega o nome do jogador da URL
const params = new URLSearchParams(window.location.search);
const playerName = params.get('username') || 'Jogador';
document.getElementById('playerName').textContent = playerName;

// Chat
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');

chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const msg = chatInput.value.trim();
        addMessage(playerName, msg);
        chatInput.value = '';
    }
});

function addMessage(name, message) {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = `<span class="name">${name}:</span> <span class="message">${message}</span>`;
    chatBox.appendChild(msgElement);

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;

    // Remove após 8 segundos com fade
    setTimeout(() => {
        msgElement.style.transition = 'opacity 0.5s';
        msgElement.style.opacity = '0';
        setTimeout(() => msgElement.remove(), 500);
    }, 8000);
}

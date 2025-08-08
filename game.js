// Pega o nome do jogador do localStorage
// const params = new URLSearchParams(window.location.search); // Linha removida
// const playerName = params.get('username') || localStorage.getItem('username') || 'Jogador'; // Linha alterada

const nome = localStorage.getItem("nomeJogador") || "Jogador"; // Nova linha, de acordo com a imagem
document.getElementById("nome-jogador").textContent = nome; // Alteração na ID, de acordo com a imagem

// Chat
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');

chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const msg = chatInput.value.trim();
        addMessage(nome, msg); // Use a nova variável 'nome'
        chatInput.value = '';
    }
});

function addMessage(name, message) {
    const msgElement = document.createElement('div');
    msgElement.className = 'message';
    // usar spans com classes para estilizar nome (azul) e texto (branco)
    msgElement.innerHTML = `<span class="name">${escapeHtml(name)}:</span> <span class="text">${escapeHtml(message)}</span>`;
    chatBox.appendChild(msgElement);

    // Auto scroll para baixo
    chatBox.scrollTop = chatBox.scrollHeight;

    // Remover após 8 segundos com fade de 0.5s
    setTimeout(() => {
        msgElement.style.opacity = '0';
        setTimeout(() => {
            if (msgElement.parentNode) msgElement.remove();
        }, 500);
    }, 8000);
}

// pequena função para evitar injeção de HTML
function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}

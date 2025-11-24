// Registro do Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registrado:', reg))
            .catch(err => console.log('Falha no SW:', err));
    });
}

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // SimulaÃ§Ã£o de resposta da IA
    setTimeout(() => {
        addMessage("Isso Ã© uma resposta automÃ¡tica. O sistema estÃ¡ pronto!", 'bot');
    }, 1000);
});

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;
    
    div.appendChild(bubble);
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

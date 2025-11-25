// ESTE É O NOVO CÓDIGO DO CLIENTE QUE CHAMA O SEU PRÓPRIO SERVIDOR (BACK-END)
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');

// A chave API FOI REMOVIDA DESTE ARQUIVO!

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    
    const loadingId = addMessage('Digitando...', 'bot loading'); 
    
    try {
        // CHAMA O SEU PRÓPRIO SERVIDOR, VIA ROTA /api/chat
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        // Remove a mensagem de carregamento e adiciona a resposta real
        document.getElementById(loadingId).remove();
        
        if (data.error) {
            addMessage(`Erro do Servidor: ${data.error}`, 'bot error');
        } else {
            addMessage(data.text, 'bot');
        }

    } catch (error) {
        document.getElementById(loadingId).remove();
        addMessage('Erro de Rede: Não foi possível conectar ao servidor.', 'bot error');
    }
});

let messageIdCounter = 0;
function addMessage(text, sender) {
    const id = 'msg-' + messageIdCounter++;
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.id = id;
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    bubble.innerHTML = (sender.includes('loading')) ? '<span>• • •</span>' : text;

    div.appendChild(bubble);
    chatContainer.appendChild(div);
    return id; 
}

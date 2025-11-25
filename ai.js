// 🔑 CHAVE API DO GEMINI INCORPORADA AQUI
const GEMINI_API_KEY = "AIzaSyC2m-wa4mc_jmreO3OtHKmII2AToztAqIA"; 

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');
let isLoading = false; 

// A linha 'const ai = new GoogleGenAI...' que pode estar falhando foi removida para este teste.

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || isLoading) return;

    addMessage(text, 'user');
    input.value = '';
    
    // ESTA É A MENSAGEM DE TESTE
    addMessage('Resposta de Teste: O botão funciona!', 'bot'); 
});

let messageIdCounter = 0;
function addMessage(text, sender) {
    const id = 'msg-' + messageIdCounter++;
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.id = id;
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    // Adiciona um ponto de carregamento animado para o estado 'loading'
    bubble.innerHTML = (sender.includes('loading')) ? '<span>• • •</span>' : text;

    div.appendChild(bubble);
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return id; 
}

// 🔑 CHAVE API DO GEMINI INCORPORADA AQUI
const GEMINI_API_KEY = "AIzaSyC2m-wa4mc_jmreO3OtHKmII2AToztAqIA"; 

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');
let isLoading = false; // Estado para evitar múltiplas chamadas

// Inicializa o cliente Gemini
// Assume que GoogleGenAI está disponível globalmente via script no index.html
const ai = new GoogleGenAI.GoogleGenAI({ apiKey: GEMINI_API_KEY });

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || isLoading) return;

    addMessage(text, 'user');
    input.value = '';
    
    isLoading = true;
    const loadingMessageId = addMessage('Digitando...', 'bot loading'); // Exibe mensagem de carregamento
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: [{ role: 'user', parts: [{ text: text }] }]
        });

        // Remove a mensagem de carregamento e adiciona a resposta real
        document.getElementById(loadingMessageId).remove();
        addMessage(response.text, 'bot');

    } catch (error) {
        document.getElementById(loadingMessageId).remove();
        addMessage('Erro na API: Não foi possível conectar com o servidor.', 'bot error');
        console.error('API Error:', error);
    } finally {
        isLoading = false;
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
    
    // Adiciona um ponto de carregamento animado para o estado 'loading'
    bubble.innerHTML = (sender.includes('loading')) ? '<span>• • •</span>' : text;

    div.appendChild(bubble);
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return id; // Retorna o ID para podermos remover a mensagem de carregamento
}

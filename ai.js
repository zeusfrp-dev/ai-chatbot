// 🔑 CHAVE API DO GEMINI INCORPORADA AQUI
const GEMINI_API_KEY = "AIzaSyC2m-wa4mc_jmreO3OtHKmII2AToztAqIA"; 

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');

const ai = new GoogleGenAI.GoogleGenAI({ apiKey: GEMINI_API_KEY });

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    
    const loadingId = addMessage('Digitando...', 'bot loading'); 
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: [{ role: 'user', parts: [{ text: text }] }]
        });

        document.getElementById(loadingId).remove();
        addMessage(response.text, 'bot');

    } catch (error) {
        document.getElementById(loadingId).remove();
        addMessage('Erro na API.', 'bot error');
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
    // A LINHA DE ROLAGEM FOI REMOVIDA AQUI!
    return id; 
}

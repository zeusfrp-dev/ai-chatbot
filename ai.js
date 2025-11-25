// 🔑 CHAVE API DO GEMINI
const GEMINI_API_KEY = "AIzaSyC2m-wa4mc_jmreO3OtHKmII2AToztAqIA";

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");

const genAI = new GoogleGenAI.GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const loadingId = addMessage("...", "bot loading");

    try {
        const result = await model.generateContent(text);
        const response = result.response.text();

        document.getElementById(loadingId).remove();
        addMessage(response, "bot");

    } catch (err) {
        console.error(err);
        document.getElementById(loadingId).remove();
        addMessage("⚠ Erro ao conectar com a IA.", "bot error");
    }
});

let msgId = 0;
function addMessage(text, sender) {
    const id = "msg-" + (msgId++);
    const div = document.createElement("div");

    div.classList.add("message", sender);
    div.id = id;

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    if (sender.includes("loading")) {
        bubble.innerHTML = "<span>• • •</span>";
    } else {
        bubble.textContent = text;
    }

    div.appendChild(bubble);
    chatContainer.appendChild(div);

    // RESTAURANDO A ROLAGEM (fundamental)
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return id;
}

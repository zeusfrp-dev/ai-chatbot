require('dotenv').config();
const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Inicializa o cliente Gemini usando a chave da variável de ambiente do Render
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Rota chamada pelo front-end para obter a resposta da IA
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).send({ error: 'Mensagem ausente.' });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: userMessage }] }]
        });
        
        // Envia apenas o texto de volta
        res.json({ text: response.text });

    } catch (error) {
        console.error('Erro na API Gemini:', error);
        res.status(500).json({ error: 'Falha ao comunicar com a API Gemini.' });
    }
});

// Serve arquivos estáticos (index.html, style.css, client.js)
app.use(express.static('.'));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

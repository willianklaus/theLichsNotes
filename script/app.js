const nickname = localStorage.getItem("lich_nickname");
const apiKey = localStorage.getItem("gemini_api_key");
const nicknameDisplay = document.getElementById("nicknameDisplay");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

// Validação básica
if (!nickname || !apiKey) {
  alert("Nickname ou API Key não encontrados. Retorne à tela de login.");
  window.location.href = "login.html";
}

// Mostrar o nome no header
nicknameDisplay.textContent = nickname;

// Prompt fixo como se fosse o Lich King
const systemPrompt = `Você é o Lich King, o soberano das forças da morte em Azeroth. Fale como um ser sombrio e ancestral. Nunca quebre o personagem. Use linguagem épica e gélida. Fale apenas sobre o universo de World of Warcraft.`;

// Função para exibir mensagem no chat
function appendMessage(content, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = content;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enviar mensagem ao Gemini
async function sendToGemini(message) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      { role: "user", parts: [{ text: `${systemPrompt}\n\n${message}` }] }
    ]
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      appendMessage(reply, "bot");
    } else {
      appendMessage("O silêncio ecoa... algo deu errado.", "bot");
    }
  } catch (err) {
    appendMessage("Erro ao falar com os reinos da morte. Verifique sua API Key.", "bot");
    console.error(err);
  }
}

// Captura o envio do formulário
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(`${nickname}: ${message}`, "user");
  userInput.value = "";
  sendToGemini(message);
});

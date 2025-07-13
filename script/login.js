document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nickname = document.getElementById("nickname").value.trim();
  const apiKey = document.getElementById("apiKey").value.trim();

  if (!nickname || !apiKey) {
    alert("Preencha todos os campos!");
    return;
  }

  // Salvar no localStorage
  localStorage.setItem("lich_nickname", nickname);
  localStorage.setItem("gemini_api_key", apiKey);

  // Redirecionar para app.html
  window.location.href = "app.html";
});

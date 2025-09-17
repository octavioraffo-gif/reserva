let step = 0;
let reserva = {};

const chatBox = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const prompts = [
"¡Hola! ¿Qué día te gustaría reservar tu cita?",
"¿A qué hora?",
"Perfecto, ¿cuál es tu nombre?",
"¡Gracias! Tu cita ha sido registrada."
];

// Función para mostrar mensajes en el chat
function addMessage(sender, message) {
const p = document.createElement("p");
p.innerHTML = `<strong>${sender}:</strong> ${message}`;
chatBox.appendChild(p);
chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para enviar datos a Google Sheets
function enviarAGoogleSheets(reserva) {
// PONER AQUÍ LA URL DEL WEB APP DE GOOGLE APPS SCRIPT
const url = "TU_GOOGLE_SCRIPT_WEB_APP_URL";

fetch(url, {
method: "POST",
body: JSON.stringify(reserva)
}).then(res => console.log("Reserva enviada"))
.catch(err => console.error("Error al enviar la reserva:", err));
}

// Lógica al enviar mensaje
sendBtn.addEventListener("click", () => {
const userText = userInput.value;
if (!userText) return;

addMessage("Usuario", userText);

if (step === 0) reserva.dia = userText;
else if (step === 1) reserva.hora = userText;
else if (step === 2) reserva.nombre = userText;

if (step < prompts.length - 1) {
step++;
addMessage("Asistente", prompts[step]);
} else if (step === 3) {
enviarAGoogleSheets(reserva);
step = 0;
reserva = {};
}

userInput.value = "";
});


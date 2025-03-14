document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".chat-container");
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send-btn");

    function appendMessage(sender, text) {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add(sender);
        msgDiv.innerText = text;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function sendMessage() {
        let message = document.getElementById("message").value.trim();
        if (message === "") return;
        appendMessage("user-message", message);
        document.getElementById("message").value = "";

        let response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        let data = await response.json();
        setTimeout(() => {
            appendMessage("bot-message", data.response);
        }, 500); // Simulate typing delay
    }

    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    document.getElementById("message").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

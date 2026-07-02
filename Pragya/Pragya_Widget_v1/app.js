const sessionId = "session-" + Date.now();

const messages = document.getElementById("messages");
const input = document.getElementById("q");

function addMessage(text, cls) {

    const div = document.createElement("div");

    div.className = cls;

    div.innerHTML = text.replace(/\n/g, "<br>");

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

async function send() {

    const question = input.value.trim();

    if (question === "") return;

    addMessage(question, "user");

    input.value = "";

    const typing = document.createElement("div");

    typing.className = "bot";

    typing.id = "typing";

    typing.innerHTML = "⏳ Pragya is thinking...";

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

    try {

        const response = await fetch(API_BASE + "/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                session_id: sessionId,

                question: question

            })

        });

        const data = await response.json();

        document.getElementById("typing").remove();

        addMessage(data.answer, "bot");

    } catch (e) {

        document.getElementById("typing").remove();

        addMessage("❌ Unable to connect to Pragya API.", "bot");

    }

}

input.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        send();

    }

});
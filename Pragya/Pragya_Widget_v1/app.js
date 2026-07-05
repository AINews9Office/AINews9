const PRAGYA_CONFIG = window.PRAGYA_CONFIG;
const PRAGYA_SESSION_STORAGE_KEY = "pragya_session_id";

let currentStep = "welcome";
let selectedJourney = null;
let selectedPersona = null;
let selectedTopic = null;
let selectedSuggestedTopic = null;
let selectedPopularQuestion = null;
let questionText = "";
let conversationContext = null;

const welcomeStep = document.getElementById("welcome-step");
const personaStep = document.getElementById("persona-step");
const topicStep = document.getElementById("topic-step");
const backToWelcomeButton = document.getElementById("back-to-welcome");
const backToPersonaButton = document.getElementById("back-to-persona");
const topicOptionsContainer = document.getElementById("topic-options");
const popularQuestionOptionsContainer = document.getElementById("popular-question-options");
const customQuestionInput = document.getElementById("custom-question");
const continueTopicButton = document.getElementById("continue-topic");
const pragyaResponse = document.getElementById("pragya-response");
const pragyaLauncher = document.getElementById("pragya-launcher");
const pragyaCard = document.getElementById("chat");
const journeyOptions = document.querySelectorAll(".journey-option");
const personaOptions = document.querySelectorAll(".persona-option");

function createSessionId() {

    if (window.crypto && typeof window.crypto.randomUUID === "function") {

        return window.crypto.randomUUID();

    }

    return String(Date.now()) + "-" + Math.random().toString(36).slice(2);

}

function getSessionId() {

    let sessionId = window.localStorage.getItem(PRAGYA_SESSION_STORAGE_KEY);

    if (!sessionId) {

        sessionId = createSessionId();

        window.localStorage.setItem(PRAGYA_SESSION_STORAGE_KEY, sessionId);

    }

    return sessionId;

}

const sessionId = getSessionId();

function normalizeText(text) {

    return String(text || "").toLowerCase().trim();

}

function includesKeyword(text, keyword) {

    return normalizeText(text).includes(normalizeText(keyword));

}

function findKeywordMatch(question, keywordMap, fallbackValue) {

    const normalizedQuestion = normalizeText(question);

    const entries = Object.entries(keywordMap || {});

    const matchedEntry = entries.find(function(entry) {

        return entry[1].some(function(keyword) {

            return normalizedQuestion.includes(normalizeText(keyword));

        });

    });

    return matchedEntry ? matchedEntry[0] : fallbackValue;

}

function detectIntent(question) {

    return findKeywordMatch(question, PRAGYA_CONFIG.INTENT_KEYWORDS, "general");

}

function detectPersona(question) {

    if (selectedPersona) return selectedPersona;

    return findKeywordMatch(question, PRAGYA_CONFIG.PERSONA_KEYWORDS, "unknown");

}

function detectPillar(question) {

    return findKeywordMatch(question, PRAGYA_CONFIG.PILLAR_KEYWORDS, selectedJourney || PRAGYA_CONFIG.DEFAULT_PILLAR);

}

function isDomainAllowed(question) {

    const domainKeywords = PRAGYA_CONFIG.DOMAIN_KEYWORDS || {};

    const allowedKeywords = domainKeywords.ALLOWED || [];

    const unrelatedKeywords = domainKeywords.UNRELATED || [];

    const hasAllowedKeyword = allowedKeywords.some(function(keyword) {

        return includesKeyword(question, keyword);

    });

    const hasUnrelatedKeyword = unrelatedKeywords.some(function(keyword) {

        return includesKeyword(question, keyword);

    });

    if (hasAllowedKeyword) return true;

    if (hasUnrelatedKeyword) return false;

    return false;

}

function buildConversationContext(question) {

    return {
        session_id: sessionId,
        question: question,
        journey: selectedJourney,
        persona: detectPersona(question),
        intent: detectIntent(question),
        pillar: detectPillar(question),
        domainAllowed: isDomainAllowed(question)
    };

}

const PRAGYA_ARTICLE_PLACEHOLDERS = {
    ai: { id: "AIN9-AI-001", title: "What is Artificial Intelligence?" },
    generative_ai: { id: "AIN9-GENAI-001", title: "What is Generative AI?" },
    machine_learning: { id: "AIN9-ML-001", title: "What is Machine Learning?" },
    prompt_engineering: { id: "AIN9-PE-001", title: "What is Prompt Engineering?" },
    ai_agents: { id: "AIN9-AGENTS-001", title: "What are AI Agents?" },
    deepfakes: { id: "AIN9-DEEPFAKE-001", title: "How to Understand Deepfakes" },
    responsible_ai: { id: "AIN9-SAFE-001", title: "Using AI Safely and Responsibly" },
    ai_tools: { id: "AIN9-TOOLS-001", title: "Useful AI Tools for Daily Work" }
};

function detectLearningConcept(question, answer) {

    const text = normalizeText((question || "") + " " + (answer || ""));

    if (text.includes("prompt")) return "prompt_engineering";

    if (text.includes("machine learning") || text.includes(" ml ")) return "machine_learning";

    if (text.includes("generative")) return "generative_ai";

    if (text.includes("agent")) return "ai_agents";

    if (text.includes("deepfake")) return "deepfakes";

    if (text.includes("safe") || text.includes("scam") || text.includes("privacy") || text.includes("responsible") || text.includes("hallucination")) return "responsible_ai";

    if (text.includes("chatgpt") || text.includes("gemini") || text.includes("copilot") || text.includes("tool")) return "ai_tools";

    return "ai";

}

function getDirectAnswer(answer, context) {

    const trimmedAnswer = String(answer || "").trim();

    if (trimmedAnswer !== "") {

        const paragraphs = trimmedAnswer.split(/\n\s*\n/).filter(Boolean);

        if (paragraphs.length > 1) {

            return paragraphs.slice(0, 3).join("\n\n");

        }

        const sentences = trimmedAnswer.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [trimmedAnswer];

        return sentences.slice(0, 5).map(function(sentence) {
            return sentence.trim();
        }).join(" ");

    }

    if (context && context.domainAllowed === false) {

        return "Pragya focuses on helping you learn Artificial Intelligence. This question does not seem to have a clear AI connection.\n\nTry asking how AI can help with learning, work, safety, business, or daily life.";

    }

    return "I could not prepare a complete answer this time. Please try asking your AI question again in a simpler way.";

}

function getLearningMoment(concept) {

    const moments = {
        ai: [
            "AI means computer systems that can do tasks that usually need human thinking.",
            "AI does not truly understand like a person. It finds patterns and gives useful suggestions.",
            "Good AI use means checking the output before trusting it."
        ],
        generative_ai: [
            "Generative AI creates new text, images, audio, or code from patterns it learned.",
            "It can sound confident even when it is wrong.",
            "Clear instructions help it give better results."
        ],
        machine_learning: [
            "Machine Learning is a way for computers to learn patterns from data.",
            "It improves by seeing many examples, not by memorising one rule.",
            "The quality of data affects the quality of the result."
        ],
        prompt_engineering: [
            "A prompt is the instruction you give to an AI tool.",
            "Prompt Engineering means asking clearly, with context, goal, and format.",
            "Better prompts usually lead to better answers."
        ],
        ai_agents: [
            "AI agents can plan steps and use tools to complete a task.",
            "They still need human review, especially for important work.",
            "Agents are useful when a task has many small steps."
        ],
        deepfakes: [
            "Deepfakes use AI to create fake-looking audio, images, or videos.",
            "They can be used for fun, but also for scams.",
            "Always verify surprising media before sharing it."
        ],
        responsible_ai: [
            "Responsible AI means using AI in a safe, fair, and careful way.",
            "Do not share private data with AI tools unless you trust the tool and policy.",
            "AI answers should be checked, especially for health, money, legal, or safety topics."
        ],
        ai_tools: [
            "AI tools are apps that use AI to help with tasks like writing, planning, or summarising.",
            "The tool is an assistant, not the final decision-maker.",
            "You get better results when you give clear context."
        ]
    };

    return moments[concept] || moments.ai;

}

function getEverydayExample(concept) {

    const examples = {
        ai: "AI is like Google Maps. It suggests a route, but you still decide how to drive.",
        generative_ai: "Generative AI is like asking a helpful friend to draft a message. You still check and improve it before sending.",
        machine_learning: "Machine Learning is like a shopkeeper learning customer habits over time and arranging popular items near the counter.",
        prompt_engineering: "Prompt Engineering is like giving clear instructions to a tailor. Better measurements lead to a better fit.",
        ai_agents: "An AI agent is like a travel assistant who can plan tickets, hotels, and a route, but you approve the final plan.",
        deepfakes: "A deepfake is like a very realistic movie scene. It may look real, but you should still check the source.",
        responsible_ai: "Using AI safely is like using UPI. It is useful, but you still protect your PIN and check before paying.",
        ai_tools: "An AI tool is like a calculator for thinking work. It helps you move faster, but you still check the answer."
    };

    return examples[concept] || examples.ai;

}

function getNextTopic(concept) {

    const nextTopics = {
        ai: "Machine Learning",
        generative_ai: "Prompt Engineering",
        machine_learning: "Generative AI",
        prompt_engineering: "Safe Prompting",
        ai_agents: "Responsible AI",
        deepfakes: "AI Scams",
        responsible_ai: "AI Hallucinations",
        ai_tools: "Prompt Engineering"
    };

    return nextTopics[concept] || "Machine Learning";

}

function formatEducationalResponse(options) {

    const context = options.context || {};

    const question = options.question || context.question || "";

    const answer = getDirectAnswer(options.answer, context);

    const concept = detectLearningConcept(question, answer);

    const article = PRAGYA_ARTICLE_PLACEHOLDERS[concept];

    const sections = [
        "Direct Answer",
        answer
    ];

    if (!options.isError) {

        sections.push(
            "AI Learning Moment",
            getLearningMoment(concept).slice(0, 3).map(function(point) {
                return "- " + point;
            }).join("\n"),
            "Everyday Example",
            getEverydayExample(concept)
        );

        if (article) {

            sections.push(
                "Learn More (AINews9)",
                article.title + "\nArticle ID: " + article.id + "\nRead Full Article ->"
            );

        }

        sections.push(
            "Continue Learning",
            "Next Recommended Topic: " + getNextTopic(concept)
        );

    }

    return sections.join("\n\n");

}

function showPragyaResponse(message, isError) {

    pragyaResponse.hidden = false;

    pragyaResponse.classList.toggle("error", Boolean(isError));

    pragyaResponse.classList.toggle("thinking", message === "Pragya is thinking...");

    pragyaResponse.textContent = message;

}

function clearPragyaResponse() {

    pragyaResponse.hidden = true;

    pragyaResponse.classList.remove("error");

    pragyaResponse.classList.remove("thinking");

    pragyaResponse.textContent = "";

}

async function callPragyaAPI(context) {

    const controller = new AbortController();

    const timeoutId = window.setTimeout(function() {

        controller.abort();

    }, PRAGYA_CONFIG.API_TIMEOUT_MS);

    try {

        const response = await fetch(PRAGYA_CONFIG.API_URL + "/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(context),
            signal: controller.signal
        });

        if (!response.ok) {

            throw new Error("Pragya API returned an error.");

        }

        return await response.json();

    } finally {

        window.clearTimeout(timeoutId);

    }

}

function handleApiResponse(data) {

    if (!data || typeof data.answer !== "string" || data.answer.trim() === "") {

        throw new Error("Pragya API returned an unexpected response.");

    }

    showPragyaResponse(formatEducationalResponse({
        answer: data.answer,
        context: conversationContext
    }), false);

}

function handleApiError() {

    showPragyaResponse(formatEducationalResponse({
        answer: "Sorry, Pragya is temporarily unavailable. Please try again in a moment.",
        context: conversationContext,
        isError: true
    }), true);

}

function renderStep() {

    welcomeStep.hidden = currentStep !== "welcome";

    personaStep.hidden = currentStep !== "persona";

    topicStep.hidden = currentStep !== "topic";

}

function openPragyaWidget() {

    pragyaLauncher.hidden = true;

    pragyaLauncher.setAttribute("aria-expanded", "true");

    pragyaCard.scrollIntoView({ behavior: "smooth", block: "start" });

    const activeOptions = document.querySelectorAll("#messages section:not([hidden]) button, #messages section:not([hidden]) textarea");

    if (activeOptions.length > 0) {

        activeOptions[0].focus();

    }

}

function updateJourneySelection() {

    journeyOptions.forEach(function(option) {

        const isSelected = option.dataset.journey === selectedJourney;

        option.classList.toggle("selected", isSelected);

        option.setAttribute("aria-pressed", String(isSelected));

    });

}

function updatePersonaSelection() {

    personaOptions.forEach(function(option) {

        const isSelected = option.dataset.persona === selectedPersona;

        option.classList.toggle("selected", isSelected);

        option.setAttribute("aria-pressed", String(isSelected));

    });

}

function updateTopicSelection() {

    const topicOptions = topicOptionsContainer.querySelectorAll(".topic-option");

    topicOptions.forEach(function(option) {

        const isSelected = option.dataset.topic === selectedSuggestedTopic;

        option.classList.toggle("selected", isSelected);

        option.setAttribute("aria-pressed", String(isSelected));

    });

}

function updatePopularQuestionSelection() {

    const questionOptions = popularQuestionOptionsContainer.querySelectorAll(".popular-question-option");

    questionOptions.forEach(function(option) {

        const isSelected = option.dataset.question === selectedPopularQuestion;

        option.classList.toggle("selected", isSelected);

        option.setAttribute("aria-pressed", String(isSelected));

    });

}

function updateContinueButton() {

    continueTopicButton.disabled = customQuestionInput.value.trim() === "";

}

function syncQuestionInput() {

    customQuestionInput.value = questionText;

    updateContinueButton();

}

function renderTopics() {

    const topics = PRAGYA_CONFIG.TOPICS_BY_JOURNEY[selectedJourney] || [];

    topicOptionsContainer.replaceChildren();

    topics.forEach(function(topic) {

        const option = document.createElement("button");

        option.type = "button";

        option.className = "topic-option";

        option.dataset.topic = topic;

        option.textContent = topic;

        option.setAttribute("aria-pressed", "false");

        option.addEventListener("click", function() {

            selectedSuggestedTopic = topic;

            selectedPopularQuestion = null;

            questionText = topic;

            syncQuestionInput();

            clearPragyaResponse();

            updateTopicSelection();

            updatePopularQuestionSelection();

        });

        topicOptionsContainer.appendChild(option);

    });

    updateTopicSelection();

}

function renderPopularQuestions() {

    const questionsByJourney = PRAGYA_CONFIG.POPULAR_QUESTIONS[selectedJourney] || {};

    const questions = questionsByJourney[selectedPersona] || [];

    popularQuestionOptionsContainer.replaceChildren();

    questions.forEach(function(question) {

        const option = document.createElement("button");

        option.type = "button";

        option.className = "popular-question-option";

        option.dataset.question = question;

        option.textContent = question;

        option.setAttribute("aria-pressed", "false");

        option.addEventListener("click", function() {

            selectedPopularQuestion = question;

            selectedSuggestedTopic = null;

            questionText = question;

            syncQuestionInput();

            clearPragyaResponse();

            updatePopularQuestionSelection();

            updateTopicSelection();

        });

        popularQuestionOptionsContainer.appendChild(option);

    });

    updatePopularQuestionSelection();

}

function renderTopicDiscovery() {

    renderTopics();

    renderPopularQuestions();

    syncQuestionInput();

}

journeyOptions.forEach(function(option) {

    option.setAttribute("aria-pressed", "false");

    option.addEventListener("click", function() {

        const nextJourney = option.dataset.journey;

        if (selectedJourney !== nextJourney) {

            selectedPersona = null;

            selectedTopic = null;

            selectedSuggestedTopic = null;

            selectedPopularQuestion = null;

            questionText = "";

            clearPragyaResponse();

        }

        selectedJourney = nextJourney;

        currentStep = "persona";

        updateJourneySelection();

        updatePersonaSelection();

        renderStep();

    });

});

personaOptions.forEach(function(option) {

    option.setAttribute("aria-pressed", "false");

    option.addEventListener("click", function() {

        const nextPersona = option.dataset.persona;

        if (selectedPersona !== nextPersona) {

            selectedTopic = null;

            selectedSuggestedTopic = null;

            selectedPopularQuestion = null;

            questionText = "";

            clearPragyaResponse();

        }

        selectedPersona = nextPersona;

        currentStep = "topic";

        updatePersonaSelection();

        renderTopicDiscovery();

        renderStep();

    });

});

backToWelcomeButton.addEventListener("click", function() {

    currentStep = "welcome";

    renderStep();

    updateJourneySelection();

});

backToPersonaButton.addEventListener("click", function() {

    currentStep = "persona";

    renderStep();

    updatePersonaSelection();

});

customQuestionInput.addEventListener("input", function() {

    questionText = customQuestionInput.value;

    clearPragyaResponse();

    updateContinueButton();

});

pragyaLauncher.addEventListener("click", function() {

    openPragyaWidget();

});

continueTopicButton.addEventListener("click", async function() {

    const finalQuestion = customQuestionInput.value.trim();

    if (finalQuestion === "") return;

    selectedTopic = finalQuestion;

    questionText = customQuestionInput.value;

    conversationContext = buildConversationContext(finalQuestion);

    updateContinueButton();

    if (!conversationContext.domainAllowed) {

        showPragyaResponse(formatEducationalResponse({
            answer: "",
            context: conversationContext
        }), false);

        return;

    }

    showPragyaResponse("Pragya is thinking...", false);

    continueTopicButton.disabled = true;

    continueTopicButton.classList.add("loading");

    continueTopicButton.textContent = "Thinking...";

    try {

        const data = await callPragyaAPI(conversationContext);

        handleApiResponse(data);

    } catch (error) {

        handleApiError();

    } finally {

        continueTopicButton.classList.remove("loading");

        continueTopicButton.textContent = "Continue";

        updateContinueButton();

    }

});

renderStep();

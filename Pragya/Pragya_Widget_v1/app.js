const PRAGYA_CONFIG = window.PRAGYA_CONFIG;

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
const journeyOptions = document.querySelectorAll(".journey-option");
const personaOptions = document.querySelectorAll(".persona-option");

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
        question: question,
        journey: selectedJourney,
        persona: detectPersona(question),
        intent: detectIntent(question),
        pillar: detectPillar(question),
        domainAllowed: isDomainAllowed(question)
    };

}

function showPragyaResponse(message, isError) {

    pragyaResponse.hidden = false;

    pragyaResponse.classList.toggle("error", Boolean(isError));

    pragyaResponse.textContent = message;

}

function clearPragyaResponse() {

    pragyaResponse.hidden = true;

    pragyaResponse.classList.remove("error");

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

    showPragyaResponse(data.answer, false);

}

function handleApiError() {

    showPragyaResponse("Sorry, Pragya is temporarily unavailable. Please try again in a moment.", true);

}

function renderStep() {

    welcomeStep.hidden = currentStep !== "welcome";

    personaStep.hidden = currentStep !== "persona";

    topicStep.hidden = currentStep !== "topic";

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

continueTopicButton.addEventListener("click", async function() {

    const finalQuestion = customQuestionInput.value.trim();

    if (finalQuestion === "") return;

    selectedTopic = finalQuestion;

    questionText = customQuestionInput.value;

    conversationContext = buildConversationContext(finalQuestion);

    updateContinueButton();

    if (!conversationContext.domainAllowed) {

        showPragyaResponse("I am designed to help you learn and use Artificial Intelligence. Please ask me an AI-related question.", true);

        return;

    }

    showPragyaResponse("Loading...", false);

    continueTopicButton.disabled = true;

    try {

        const data = await callPragyaAPI(conversationContext);

        handleApiResponse(data);

    } catch (error) {

        handleApiError();

    } finally {

        updateContinueButton();

    }

});

renderStep();

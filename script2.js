let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to speak the text aloud using Speech Synthesis API
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";  // Set language to Hindi (India) - change as needed
    window.speechSynthesis.speak(text_speak);
}

// Function to wish the user based on the time of the day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Check if SpeechRecognition is available in the browser
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
} else {
    let recognition = new speechRecognition();
    
    recognition.onstart = () => {
        console.log("Speech recognition started");
    };

    recognition.onend = () => {
        console.log("Speech recognition ended");
        voice.style.display = "none";  // Hide microphone icon after recognition ends
        btn.style.display = "flex";  // Show button again
    };

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase()); // Process the command
    };

    // Start speech recognition when the button is clicked
    btn.addEventListener("click", () => {
        recognition.start();
        voice.style.display = "block";
        btn.style.display = "none";
    });

    // Handle any errors during speech recognition
    recognition.onerror = function (event) {
        console.error("Speech Recognition Error: ", event.error);
        speak("Sorry, I couldn't understand your command.");
        btn.style.display = "flex";
        voice.style.display = "none";
    };
}

// Function to process the command and perform specific actions
function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by RITIK RAJ.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding ";
        let searchMessage = message.replace("shipra", "").replace("shifra", "").trim();
        finalText += searchMessage;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${searchMessage}`, "_blank");
    }
}

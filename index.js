const btn = document.querySelector('#mic-button');

// Function to speak in Hindi or English
const speakFun = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    speakInput.lang = 'hi-IN';  // Hindi Language
    window.speechSynthesis.speak(speakInput);
};

// Function to handle recognized commands
const handleCommands = (command) => {
    const colorNames = {
        // Supported colors in Hindi
        "लाल": "red",
        "नीला": "blue",
        "हरा": "green",
        "पीला": "yellow",
        "काला": "black",
        "सफेद": "white",
        "गुलाबी": "pink",
        "बैंगनी": "purple",
        "सुनहरा": "gold",
        "चांदी": "silver"
    };

    // Check if the command includes any of the colors
    let color = colorNames[command.toLowerCase()] || command.toLowerCase(); // Map Hindi color names to English

    if (Object.values(colorNames).includes(color)) {
        document.body.style.backgroundColor = color;
        speakFun(`Background color changed to ${color}`);
    } else {
        speakFun("मुझे खेद है, मैं इस रंग को नहीं पहचान सका। कृपया पुनः प्रयास करें।");
        console.log("मुझे खेद है, मैं इस रंग को नहीं पहचान सका। कृपया पुनः प्रयास करें।");

    }
};

// Initialize speech recognition
const startRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';  // Hindi Language for Recognition

    recognition.onstart = () => {
        console.log('Voice recognition started. Speak now!');
    };

    recognition.onspeechend = () => {
        console.log('Voice recognition ended.');
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(`You said: ${transcript}`);
        handleCommands(transcript);
        btn.classList.remove('btn-box');
        btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
    };

    recognition.start();
};

// Button click event listener
btn.addEventListener('click', () => {
    startRecognition();
    btn.classList.add('btn-box');
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
});

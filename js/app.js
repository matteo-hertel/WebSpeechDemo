/* jshint esversion: 6 */
'use strict';

class App {

    constructor(button, output, Heisenberg, SpeechRecognition) {
        this.button = button;
        this.output = output;
        this.bindDomEvents();
    }

    bindDomEvents() {
        this.button.addEventListener("click", this.fireEvent.bind(this), false);
    }

    fireEvent() {
        Broadcaster.fireEvent("Heisenberg.sayMyName");
    }

}
class Output {
    constructor(output) {
        this.output = output;
    }

    clearOutput() {
        this.output.innerHTML = "";
    }
    generateOutput(msg) {
        var span = document.createElement("span");
        span.innerHTML = msg;

        var p = document.createElement("p");

        p.appendChild(span);

        return p;
    }
    addOutput(msg) {
        this.output.appendChild(this.generateOutput(msg));
    }

}

class Heisenberg {
    constructor() {
        this.setUp();
        this.addEventsToBroadcaster();
    }

    addEventsToBroadcaster() {
        Broadcaster.addListener("Heisenberg.sayMyName", this.sayMyName.bind(this))
        Broadcaster.addListener("Heisenberg.youreGoddamnRight", this.youreGoddamnRight.bind(this))
        Broadcaster.addListener("Heisenberg.hisNameIsHank", this.hisNameIsHank.bind(this))
    }

    setUp() {
        this.heisenberg = new SpeechSynthesisUtterance();
        this.resetSpeechValues();
    }
    resetSpeechValues() {
        var voices = window.speechSynthesis.getVoices();
        this.heisenberg.voice = voices[10];
        this.heisenberg.voiceURI = 'native';
        this.heisenberg.volume = 0.5; // 0 to 1
        this.heisenberg.rate = 0.2; // 0.1 to 10
        this.heisenberg.pitch = 0; //0 to 2
        this.heisenberg.lang = 'en-US';
    }

    sayMyName() {
        this.heisenberg.text = "Say my name";

        speechSynthesis.speak(this.heisenberg);
        setTimeout(function() {
            Broadcaster.fireEvent("SpeechRecognition.start");
        }, 1500);
    }
    youreGoddamnRight() {
        this.heisenberg.text = "You're Goddamn Right";

        speechSynthesis.speak(this.heisenberg);
    }
    hisNameIsHank() {
        this.heisenberg.text = "His name is HANK!";
        this.heisenberg.volume = 1; // 0 to 1
        this.heisenberg.pitch = 1; //0 to 2
        speechSynthesis.speak(this.heisenberg);
    }

/**
hisNameIsHank() {
    this.heisenberg.text = "This batch it's all wrong, we need to start over";
    this.heisenberg.volume = 1; // 0 to 1
    this.heisenberg.rate = 0.5;
    speechSynthesis.speak(this.heisenberg);
    this.resetSpeechValues();
}
*/
}

class SpeechRecognition {

    constructor() {
        this.defaults();
        this.setUp();
        this.addEventsToBroadcaster();
    }

    defaults() {
        this.recognition = new(webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition || SpeechRecognition)();
    }

    setUp() {
        this.recognition.lang = 'en-GB';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.bindAudioEvents();
    }

    addEventsToBroadcaster() {
        Broadcaster.addListener("SpeechRecognition.start", this.startListening.bind(this))
    }

    startListening() {
        this.recognition.start();
    }

    bindAudioEvents() {
        this.recognition.onresult = this.handleResult.bind(this);
    }
    handleResult(e) {
        if (e.results[0][0].transcript.toLowerCase() === "heisenberg") {
            Broadcaster.fireEvent("Heisenberg.youreGoddamnRight");
        } else {
            Broadcaster.fireEvent("Heisenberg.hisNameIsHank");
        }
    }
}

class Broadcaster {
    static addListener(eventName, callback) {
        this.checkEvents();
        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback);
    }
    static fireEvent(eventName) {
        if (!this.events.hasOwnProperty(eventName)) {
            return;
        }
        this.events[eventName].forEach(function(cb) {
            if (typeof cb === "function") {
                cb();
            }
        })
    }

    static checkEvents() {
        if (!this.events) {
            this.events = {};
        }
    }
}

new App(document.getElementById("Heisenberg"), new Output(document.getElementById("audioOutput")), new Heisenberg(), new SpeechRecognition());

/// <reference path="../../node_modules/@types/webspeechapi/index.d.ts"/>

import { Broadcaster } from "./Broadcaster";

export class Heisenberg {
    private heisenberg: SpeechSynthesisUtterance;
    constructor() {
        this.setUp();
        this.addEventsToBroadcaster();
    }

    addEventsToBroadcaster(): void {
        Broadcaster.addListener("Heisenberg.sayMyName", this.sayMyName.bind(this))
        Broadcaster.addListener("Heisenberg.youreGoddamnRight", this.youreGoddamnRight.bind(this))
        Broadcaster.addListener("Heisenberg.hisNameIsHank", this.hisNameIsHank.bind(this))
    }

    setUp(): void {
        this.heisenberg = new SpeechSynthesisUtterance();
        this.resetSpeechValues();
    }
    resetSpeechValues(): void {
        var voices = window.speechSynthesis.getVoices();
        this.heisenberg.voice = voices[10];
        //this.heisenberg.voiceURI = 'native';
        this.heisenberg.volume = 0.5; // 0 to 1
        this.heisenberg.rate = 0.2; // 0.1 to 10
        this.heisenberg.pitch = 0; //0 to 2
        this.heisenberg.lang = 'en-US';
    }

    sayMyName(): void {
        this.heisenberg.text = "Say my name";

        speechSynthesis.speak(this.heisenberg);
        setTimeout(function () {
            Broadcaster.fireEvent("SpeechRecognition.start");
        }, 1500);
    }
    youreGoddamnRight(): void {
        this.heisenberg.text = "You're Goddamn Right";

        speechSynthesis.speak(this.heisenberg);
    }
    hisNameIsHank(): void {
        this.heisenberg.text = "His name is HANK!";
        this.heisenberg.volume = 1; // 0 to 1
        this.heisenberg.pitch = 1; //0 to 2
        speechSynthesis.speak(this.heisenberg);
    }

    thisBatchItsWrong(): void {
        this.heisenberg.text = "This batch it's all wrong, we need to start over";
        this.heisenberg.volume = 1; // 0 to 1
        this.heisenberg.rate = 0.5;
        speechSynthesis.speak(this.heisenberg);
        this.resetSpeechValues();
    }
}

/// <reference path="../../node_modules/@types/webspeechapi/index.d.ts"/>
import { IwebkitSpeechRecognition } from "../interface/IwebkitSpeechRecognition";
import { Broadcaster } from "./Broadcaster";

export class SpeechRecognition {
    private recognition: IwebkitSpeechRecognition;
    constructor() {
        this.defaults();
        this.setUp();
        this.addEventsToBroadcaster();
    }

    defaults(): void {
        this.recognition = new webkitSpeechRecognition();
    }

    setUp(): void {
        this.recognition.lang = 'en-GB';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.bindAudioEvents();
    }

    addEventsToBroadcaster(): void {
        Broadcaster.addListener("SpeechRecognition.start", this.startListening.bind(this))
    }

    startListening(): void {
        this.recognition.start();
    }

    bindAudioEvents(): void {
        this.recognition.onresult = this.handleResult.bind(this);
    }
    handleResult(e: SpeechRecognitionEvent): void {
        if (e.results[0][0].transcript.toLowerCase() === "heisenberg") {
            Broadcaster.fireEvent("Heisenberg.youreGoddamnRight");
        } else {
            Broadcaster.fireEvent("Heisenberg.hisNameIsHank");
        }
    }
}

import { Output } from "./class/Output";
import { Heisenberg } from "./class/Heisenberg";
import { SpeechRecognition } from "./class/SpeechRecognition";
import { Broadcaster } from "./class/Broadcaster";

import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './../bower_components/material-kit/assets/css/material-kit.css';

class App {
    constructor(
        private button: HTMLElement,
        private output: Output,
        private Heisenberg: Heisenberg,
        private SpeechRecognition: SpeechRecognition) {
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


new App(
    document.getElementById("Heisenberg"),
    new Output(document.getElementById("audioOutput")),
    new Heisenberg(),
    new SpeechRecognition()
);

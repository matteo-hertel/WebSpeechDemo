export class Output {
    constructor(private output: HTMLElement) { }

    clearOutput() {
        this.output.innerHTML = "";
    }
    generateOutput(msg: string): HTMLElement {
        var span = document.createElement("span");
        span.innerHTML = msg;

        var p = document.createElement("p");

        p.appendChild(span);

        return p;
    }
    addOutput(msg: string): void {
        this.output.appendChild(this.generateOutput(msg));
    }

}

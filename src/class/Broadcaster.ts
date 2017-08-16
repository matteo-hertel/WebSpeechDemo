export class Broadcaster {
    static events = {};

    static addListener(eventName: string, callback: any): void {

        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = []
        }

        this.events[eventName].push(callback);
    }

    static fireEvent(eventName: string): void {
        if (!this.events.hasOwnProperty(eventName)) {
            return;
        }
        this.events[eventName].forEach(function (cb) {
            if (typeof cb === "function") {
                cb();
            }
        })
    }
}

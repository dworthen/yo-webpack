
export default class App {
    constructor(isDev = true) {
        this.isDev = isDev;
    }

    logEnv() {
        if (this.isDev) {
            console.log('Dev build');
        } else {
            console.log('Prod build');
        }
    }
}
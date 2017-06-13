import App from './app/app';

declare const IS_DEV_BUILD: boolean;

const app = new App(IS_DEV_BUILD);

app.logEnv();
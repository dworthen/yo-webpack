import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { App } from '../components/app/app';

@inject(App)
export class HttpClientAPI extends HttpClient {
    constructor(app) {
        super();
        this.configure(config => {
            config
                //.withBaseUrl('api/')
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch',
                        'Authorization': 'Bearer ' + window['access_token'] || ''
                    }
                }).withInterceptor({
                    response(response) {
                        console.log(`Response: ${response.status} ${response.url}`);
                        if (response.status == 401) {
                            window.location.reload();
                        } else if (response.status == 403) {
                            app.router.navigate("restricted");
                        } 

                        return response;
                    }
                });
        });
    }
}
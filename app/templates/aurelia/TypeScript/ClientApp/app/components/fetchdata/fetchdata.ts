import { HttpClientAPI } from '../../services/FetchAPI';
import { inject } from 'aurelia-framework';

@inject(HttpClientAPI)
export class Fetchdata {
    public values: Array<string>;

    constructor(http: HttpClientAPI) {
        http.fetch('api/values')
            .then(result => result.json() as Promise<Array<string>>)
            .then(data => {
                this.values = data;
            });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

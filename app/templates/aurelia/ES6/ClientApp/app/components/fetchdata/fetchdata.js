import { HttpClientAPI } from '../../services/FetchAPI';
import { inject } from 'aurelia-framework';

@inject(HttpClientAPI)
export class Fetchdata {
    constructor(http) {
        this.values = [];

        http.fetch('api/values')
            .then(result => result.json())
            .then(data => {
                this.values = data;
            });
    }
}

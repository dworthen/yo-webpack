import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        var base = document.getElementsByTagName('base');
        var root = base && base[0] && base[0].href ? base[0].href.replace(location.protocol + "//" + location.host, "") : "/";

        config.title = 'Aurelia';
        config.options.pushState = true;
        config.options.root = root;
        config.map([{
            route: ['', 'home'],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('../home/home'),
            nav: true,
            title: 'Home'
        }, {
            route: 'counter',
            name: 'counter',
            settings: { icon: 'education' },
            moduleId: PLATFORM.moduleName('../counter/counter'),
            nav: true,
            title: 'Counter'
        }, {
            route: 'fetch-data',
            name: 'fetchdata',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
            nav: true,
            title: 'Fetch Data'
        }, {
            route: 'restricted',
            name: 'restricted',
            settings: { icon: 'eductaion' },
            moduleId: PLATFORM.moduleName('../restricted/restricted'),
            nav: false,
            title: 'Restricted'
        }]);

        this.router = router;
    }
}

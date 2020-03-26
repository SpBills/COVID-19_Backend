import DayController from "../controllers/DayController";

export class DayRoutes {
    constructor() {
        this.day = new DayController()
    }
    routes(router) {
        console.log('Registering routes.');
        router.route('/')
            .get(this.day.getAllData)
    }
}


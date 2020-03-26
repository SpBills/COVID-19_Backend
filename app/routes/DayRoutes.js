import DayController from "../controllers/DayController";

export class DayRoutes {
    constructor() {
        this.day = new DayController()
    }
    routes(router) {
        console.log('registering');
        router.route('/')
            .get(this.day.getAllData)
            .post(this.day.populateFullDatabase)
            .delete(this.day.deleteDatabase)
    }
}


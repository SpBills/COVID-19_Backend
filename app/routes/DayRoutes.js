import DayController from "../controllers/DayController";

class DayRoutes {
    constructor() {
        this.day = new DayController()
    }
    routes(router) {
        router.route('/')
            .get(this.day.getAllData)
    }
}

export default DayRoutes
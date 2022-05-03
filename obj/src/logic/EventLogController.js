"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const EventLogSeverityV1_1 = require("../data/version1/EventLogSeverityV1");
const EventLogCommandSet_1 = require("./EventLogCommandSet");
class EventLogController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(EventLogController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EventLogCommandSet_1.EventLogCommandSet(this);
        return this._commandSet;
    }
    getEvents(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    logEvent(correlationId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.severity = event.severity || EventLogSeverityV1_1.EventLogSeverityV1.Informational;
            event.time = event.time || new Date();
            return yield this._persistence.create(correlationId, event);
        });
    }
}
exports.EventLogController = EventLogController;
EventLogController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-eventlog:persistence:*:*:1.0');
//# sourceMappingURL=EventLogController.js.map
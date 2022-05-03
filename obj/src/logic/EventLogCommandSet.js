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
exports.EventLogCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const SystemEventV1Schema_1 = require("../data/version1/SystemEventV1Schema");
class EventLogCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetEventsCommand());
        this.addCommand(this.makeLogEventCommand());
    }
    makeGetEventsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_events", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_6.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_7.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getEvents(correlationId, filter, paging);
        }));
    }
    makeLogEventCommand() {
        return new pip_services3_commons_nodex_2.Command("log_event", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('eventlog', new SystemEventV1Schema_1.SystemEventV1Schema())
            .withOptionalProperty('event', new SystemEventV1Schema_1.SystemEventV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let event = args.get("event") || args.get("eventlog");
            event.time = pip_services3_commons_nodex_8.DateTimeConverter.toNullableDateTime(event.time);
            return yield this._logic.logEvent(correlationId, event);
        }));
    }
}
exports.EventLogCommandSet = EventLogCommandSet;
//# sourceMappingURL=EventLogCommandSet.js.map
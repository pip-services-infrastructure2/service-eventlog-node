"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const EventLogServiceFactory_1 = require("../build/EventLogServiceFactory");
class EventLogProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory_1.EventLogServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.EventLogProcess = EventLogProcess;
//# sourceMappingURL=EventLogProcess.js.map
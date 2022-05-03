"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class EventLogHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/eventlog');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-eventlog', 'controller', 'default', '*', '1.0'));
    }
}
exports.EventLogHttpServiceV1 = EventLogHttpServiceV1;
//# sourceMappingURL=EventLogHttpServiceV1.js.map
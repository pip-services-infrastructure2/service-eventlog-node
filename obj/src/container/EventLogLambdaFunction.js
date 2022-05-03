"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.EventLogLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const EventLogServiceFactory_1 = require("../build/EventLogServiceFactory");
class EventLogLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("eventlog", "System event logging function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-eventlog', 'controller', 'default', '*', '*'));
        this._factories.add(new EventLogServiceFactory_1.EventLogServiceFactory());
    }
}
exports.EventLogLambdaFunction = EventLogLambdaFunction;
exports.handler = new EventLogLambdaFunction().getHandler();
//# sourceMappingURL=EventLogLambdaFunction.js.map
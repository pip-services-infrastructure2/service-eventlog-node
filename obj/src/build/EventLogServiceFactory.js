"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLogServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const EventLogMongoDbPersistence_1 = require("../persistence/EventLogMongoDbPersistence");
const EventLogFilePersistence_1 = require("../persistence/EventLogFilePersistence");
const EventLogMemoryPersistence_1 = require("../persistence/EventLogMemoryPersistence");
const EventLogController_1 = require("../logic/EventLogController");
const EventLogCommandableHttpServiceV1_1 = require("../services/version1/EventLogCommandableHttpServiceV1");
class EventLogServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(EventLogServiceFactory.MemoryPersistenceDescriptor, EventLogMemoryPersistence_1.EventLogMemoryPersistence);
        this.registerAsType(EventLogServiceFactory.FilePersistenceDescriptor, EventLogFilePersistence_1.EventLogFilePersistence);
        this.registerAsType(EventLogServiceFactory.MongoDbPersistenceDescriptor, EventLogMongoDbPersistence_1.EventLogMongoDbPersistence);
        this.registerAsType(EventLogServiceFactory.ControllerDescriptor, EventLogController_1.EventLogController);
        this.registerAsType(EventLogServiceFactory.HttpServiceDescriptor, EventLogCommandableHttpServiceV1_1.EventLogCommandableHttpServiceV1);
    }
}
exports.EventLogServiceFactory = EventLogServiceFactory;
EventLogServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-eventlog", "factory", "default", "default", "1.0");
EventLogServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-eventlog", "persistence", "memory", "*", "1.0");
EventLogServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-eventlog", "persistence", "file", "*", "1.0");
EventLogServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-eventlog", "persistence", "mongodb", "*", "1.0");
EventLogServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-eventlog", "controller", "default", "*", "1.0");
EventLogServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-eventlog", "service", "commandable-http", "*", "1.0");
//# sourceMappingURL=EventLogServiceFactory.js.map
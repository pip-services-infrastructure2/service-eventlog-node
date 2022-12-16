import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { EventLogMongoDbPersistence } from '../persistence/EventLogMongoDbPersistence';
import { EventLogFilePersistence } from '../persistence/EventLogFilePersistence';
import { EventLogMemoryPersistence } from '../persistence/EventLogMemoryPersistence';
import { EventLogController } from '../logic/EventLogController';
import { EventLogCommandableHttpServiceV1 } from '../services/version1/EventLogCommandableHttpServiceV1';

export class EventLogServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-eventlog", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-eventlog", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-eventlog", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-eventlog", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-eventlog", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-eventlog", "service", "commandable-http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EventLogServiceFactory.MemoryPersistenceDescriptor, EventLogMemoryPersistence);
		this.registerAsType(EventLogServiceFactory.FilePersistenceDescriptor, EventLogFilePersistence);
		this.registerAsType(EventLogServiceFactory.MongoDbPersistenceDescriptor, EventLogMongoDbPersistence);
		this.registerAsType(EventLogServiceFactory.ControllerDescriptor, EventLogController);
		this.registerAsType(EventLogServiceFactory.HttpServiceDescriptor, EventLogCommandableHttpServiceV1);
	}
	
}

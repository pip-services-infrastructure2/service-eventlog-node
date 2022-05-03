import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { EventLogMemoryPersistence } from './EventLogMemoryPersistence';
import { SystemEventV1 } from '../data/version1/SystemEventV1';
export declare class EventLogFilePersistence extends EventLogMemoryPersistence {
    protected _persister: JsonFilePersister<SystemEventV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}

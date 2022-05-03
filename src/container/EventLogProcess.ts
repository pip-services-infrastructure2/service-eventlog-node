import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { EventLogServiceFactory } from '../build/EventLogServiceFactory';


export class EventLogProcess extends ProcessContainer {

    public constructor() {
        super("eventlog", "System event logging microservice");
        this._factories.add(new EventLogServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}

import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class EventLogHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/eventlog');
        this._dependencyResolver.put('controller', new Descriptor('service-eventlog', 'controller', 'default', '*', '1.0'));
    }
}
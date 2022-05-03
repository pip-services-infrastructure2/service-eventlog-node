import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { EventLogSeverityV1 } from '../data/version1/EventLogSeverityV1';
import { IEventLogPersistence } from '../persistence/IEventLogPersistence';
import { IEventLogController } from './IEventLogController';
import { EventLogCommandSet } from './EventLogCommandSet';

export class EventLogController implements IConfigurable, IReferenceable, ICommandable, IEventLogController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-eventlog:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(EventLogController._defaultConfig);
    private _persistence: IEventLogPersistence;
    private _commandSet: EventLogCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IEventLogPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EventLogCommandSet(this);
        return this._commandSet;
    }

    public async getEvents(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SystemEventV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async logEvent(correlationId: string, event: SystemEventV1): Promise<SystemEventV1> {
        event.severity = event.severity || EventLogSeverityV1.Informational;
        event.time = event.time || new Date();
        return await this._persistence.create(correlationId, event);
    }
    
}

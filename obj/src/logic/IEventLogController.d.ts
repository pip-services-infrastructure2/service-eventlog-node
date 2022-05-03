import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { SystemEventV1 } from '../data/version1/SystemEventV1';
export interface IEventLogController {
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SystemEventV1>>;
    logEvent(correlationId: string, event: SystemEventV1): Promise<SystemEventV1>;
}

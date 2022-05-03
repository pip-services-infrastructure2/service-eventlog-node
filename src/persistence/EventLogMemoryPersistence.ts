import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { IEventLogPersistence } from './IEventLogPersistence';

export class EventLogMemoryPersistence 
    extends IdentifiableMemoryPersistence<SystemEventV1, string> 
    implements IEventLogPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: SystemEventV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.source, search))
            return true;
        if (this.matchString(item.message, search))
            return true;
        // if (this.matchString(item.severity.toString(), search))
        //     return true;
        if (this.matchString(item.type, search))
            return true;
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let correlationId = filter.getAsNullableString('correlation_id');
        let source = filter.getAsNullableString('source');
        let type = filter.getAsNullableString('type');
        let minSeverity = filter.getAsNullableInteger('min_severity');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');

        return (item: SystemEventV1) => {
            if (search != null && !this.matchSearch(item, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (correlationId != null && correlationId != item.correlation_id)
                return false;
            if (source != null && source != item.source)
                return false;
            if (type != null && type != item.type)
                return false;
            if (minSeverity != null && item.severity < minSeverity)
                return false;
            if (fromTime != null && item.time < fromTime)
                return false;
            if (toTime != null && item.time >= toTime)
                return false;
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SystemEventV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
}

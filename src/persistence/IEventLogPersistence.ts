import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { SystemEventV1 } from '../data/version1/SystemEventV1';

export interface IEventLogPersistence 
    extends IGetter<SystemEventV1, string>, IWriter<SystemEventV1, string> 
{
    getPageByFilter(correlation_id: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SystemEventV1>>;

    getOneById(correlation_id: string, id: string): Promise<SystemEventV1>;

    create(correlation_id: string, item: SystemEventV1): Promise<SystemEventV1>;

    update(correlation_id: string, item: SystemEventV1): Promise<SystemEventV1>;
    
    deleteById(correlation_id: string, id: string): Promise<SystemEventV1>;
}

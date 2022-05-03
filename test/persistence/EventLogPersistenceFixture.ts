const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { IEventLogPersistence } from '../../src/persistence/IEventLogPersistence';
import { SystemEventV1 } from '../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../src/data/version1/EventLogSeverityV1';

let EVENT1: SystemEventV1 = new SystemEventV1(
    null,
    'test',
    EventLogTypeV1.Restart,
    EventLogSeverityV1.Important,
    'test restart #1'
);
let EVENT2: SystemEventV1 = new SystemEventV1(
    null,
    'test',
    EventLogTypeV1.Failure,
    EventLogSeverityV1.Critical,
    'test error'
);

export class EventLogPersistenceFixture {
    private _persistence: IEventLogPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
                
    public async testCrudOperations() {
        let event1;
        let event2;

        // Create one event
        let event = await this._persistence.create(null, EVENT1);

        assert.isObject(event);
        assert.isNotNull(event.id);
        assert.isNotNull(event.time);
        assert.equal(event.type, EVENT1.type);
        assert.equal(event.severity, EVENT1.severity);
        assert.equal(event.message, EVENT1.message);

        event1 = event;

        // Create another event
        event = await this._persistence.create(null, EVENT2);

        assert.isObject(event);
        assert.isNotNull(event.id);
        assert.isNotNull(event.time);
        assert.equal(event.type, EVENT2.type);
        assert.equal(event.severity, EVENT2.severity);
        assert.equal(event.message, EVENT2.message);

        event2 = event;

        // Get all system events
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples('source', 'test'),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    }
}

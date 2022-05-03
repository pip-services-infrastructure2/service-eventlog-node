const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { SystemEventV1 } from '../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../src/data/version1/EventLogSeverityV1';
import { EventLogLambdaFunction } from '../../src/container/EventLogLambdaFunction';

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

suite('EventLogLambdaFunction', ()=> {
    let lambda: EventLogLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-eventlog:persistence:memory:default:1.0',
            'controller.descriptor', 'service-eventlog:controller:default:default:1.0'
        );

        lambda = new EventLogLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let event1;
        let event2;

        // Create one activity
        let event = await lambda.act(
            {
                role: 'eventlog',
                cmd: 'log_event',
                eventlog: EVENT1
            }
        );

        assert.isObject(event);
        assert.isNotNull(event.time);
        assert.isNotNull(event.server);
        assert.equal(event.type, EVENT1.type);
        assert.equal(event.message, EVENT1.message);

        event1 = event;

        // Create another activity
        event = await lambda.act(
            {
                role: 'eventlog',
                cmd: 'log_event',
                eventlog: EVENT2
            }
        );

        assert.isObject(event);
        assert.isNotNull(event.time);
        assert.isNotNull(event.server);
        assert.equal(event.type, EVENT2.type);
        assert.equal(event.message, EVENT2.message);

        event2 = event;

        // Get all activities
        let page = await lambda.act(
            {
                role: 'eventlog',
                cmd: 'get_events'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    });
});
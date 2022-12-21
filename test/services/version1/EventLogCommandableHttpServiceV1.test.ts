const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { SystemEventV1 } from '../../../src/data/version1/SystemEventV1';
import { EventLogTypeV1 } from '../../../src/data/version1/EventLogTypeV1';
import { EventLogSeverityV1 } from '../../../src/data/version1/EventLogSeverityV1';
import { EventLogMemoryPersistence } from '../../../src/persistence/EventLogMemoryPersistence';
import { EventLogController } from '../../../src/logic/EventLogController';
import { EventLogCommandableHttpServiceV1 } from '../../../src/services/version1/EventLogCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3001
);

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

suite('EventLogCommandableHttpServiceV1', ()=> {
    let service: EventLogCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new EventLogMemoryPersistence();
        let controller = new EventLogController();

        service = new EventLogCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-eventlog', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-eventlog', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3001';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        let event1;
        let event2;

        // Create one activity
        let event = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/eventlog/log_event',
                {
                    event: EVENT1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(event);
        assert.isNotNull(event.time);
        assert.equal(event.type, EVENT1.type);
        assert.equal(event.message, EVENT1.message);

        event1 = event;

        // Create another activity
        event = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/eventlog/log_event',
                {
                    event: EVENT2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(event);
        assert.isNotNull(event.time);
        assert.equal(event.type, EVENT2.type);
        assert.equal(event.message, EVENT2.message);

        event2 = event;

        // Get all activities
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/eventlog/get_events',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    });
});
import { EventLogFilePersistence } from '../../src/persistence/EventLogFilePersistence';
import { EventLogPersistenceFixture } from './EventLogPersistenceFixture';

suite('EventLogFilePersistence', ()=> {
    let persistence: EventLogFilePersistence;
    let fixture: EventLogPersistenceFixture;
    
    setup(async () => {
        persistence = new EventLogFilePersistence('./data/eventlog.test.json');

        fixture = new EventLogPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });
});
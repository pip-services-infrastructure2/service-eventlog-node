import { EventLogMemoryPersistence } from '../../src/persistence/EventLogMemoryPersistence';
import { EventLogPersistenceFixture } from './EventLogPersistenceFixture';

suite('EventLogMemoryPersistence', ()=> {
    let persistence: EventLogMemoryPersistence;
    let fixture: EventLogPersistenceFixture;
    
    setup(async () => {
        persistence = new EventLogMemoryPersistence();
        fixture = new EventLogPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
import { CommandSet } from 'pip-services3-commons-nodex';
import { IEventLogController } from './IEventLogController';
export declare class EventLogCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEventLogController);
    private makeGetEventsCommand;
    private makeLogEventCommand;
}

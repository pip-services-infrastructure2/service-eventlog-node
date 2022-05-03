import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';

import { SystemEventV1 } from '../data/version1/SystemEventV1';
import { SystemEventV1Schema } from '../data/version1/SystemEventV1Schema';
import { IEventLogController } from './IEventLogController';

export class EventLogCommandSet extends CommandSet {
    private _logic: IEventLogController;

	constructor(logic: IEventLogController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetEventsCommand());
		this.addCommand(this.makeLogEventCommand());
	}

	private makeGetEventsCommand(): ICommand {
		return new Command(
			"get_events",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getEvents(correlationId, filter, paging);
			}
		);
	}

	private makeLogEventCommand(): ICommand {
		return new Command(
			"log_event",
			new ObjectSchema(true)
				.withOptionalProperty('eventlog', new SystemEventV1Schema())
				.withOptionalProperty('event', new SystemEventV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let event: SystemEventV1 = args.get("event") || args.get("eventlog");
				event.time = DateTimeConverter.toNullableDateTime(event.time);
				return await this._logic.logEvent(correlationId, event);
			}
		);
	}

}
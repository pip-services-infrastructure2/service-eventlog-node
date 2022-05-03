import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class SystemEventV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('time', null); //TypeCode.DateTime);
        this.withOptionalProperty('correlation_id', TypeCode.String);
        this.withOptionalProperty('source', TypeCode.String);
        this.withRequiredProperty('type', TypeCode.String);
        this.withRequiredProperty('severity', TypeCode.Long);
        this.withOptionalProperty('message', TypeCode.String);
        this.withOptionalProperty('details', TypeCode.Map);
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemEventV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SystemEventV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('time', null); //TypeCode.DateTime);
        this.withOptionalProperty('correlation_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('source', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('severity', pip_services3_commons_nodex_2.TypeCode.Long);
        this.withOptionalProperty('message', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('details', pip_services3_commons_nodex_2.TypeCode.Map);
    }
}
exports.SystemEventV1Schema = SystemEventV1Schema;
//# sourceMappingURL=SystemEventV1Schema.js.map
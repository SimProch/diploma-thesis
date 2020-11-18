export function getDatabaseListQuery(): string {
    return `SELECT name FROM master.sys.databases
    WHERE Cast(CASE WHEN name IN ('master', 'model', 'msdb', 'tempdb') THEN 1 ELSE is_distributor END As bit) = 0
   `;
}

export function getStoredProcedureListQuery(databaseName: string, schema?: string): string {
    if (!schema) return `SELECT ROUTINE_NAME FROM ${databaseName}.INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE'`;
	return `SELECT ROUTINE_NAME FROM ${databaseName}.INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE' AND ROUTINE_SCHEMA = '${schema}'`;

}

export function getSchemaListQuery(databaseName: string): string {
	return `SELECT SCHEMA_NAME FROM ${databaseName}.INFORMATION_SCHEMA.SCHEMATA
    where SCHEMA_NAME NOT LIKE 'db[_]%' AND SCHEMA_NAME NOT IN ('guest', 'INFORMATION_SCHEMA', 'sys')`;
}

export function getProcedureOutputListQuery(databaseName: string, schemaName: string, storedProcedureName: string): string {
    return `EXEC sp_describe_first_result_set N'${databaseName}.${schemaName}.${storedProcedureName}'`
}

export function getProcedureInputListQuery(databaseName: string, schemaName: string, storedProcedureName: string): string {
    return `SELECT name, system_type_id FROM ${databaseName}.sys.parameters WHERE object_id = object_id('${databaseName}.${schemaName}.${storedProcedureName}')`
}

export function getDbTypeListQuery(databaseName): string {
    return `SELECT name, system_type_id FROM ${databaseName}.sys.types`;
}
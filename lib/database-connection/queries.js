#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbTypeListQuery = exports.getProcedureInputListQuery = exports.getProcedureOutputListQuery = exports.getSchemaListQuery = exports.getStoredProcedureListQuery = exports.getDatabaseListQuery = void 0;
function getDatabaseListQuery() {
    return "SELECT name FROM master.sys.databases\n    WHERE Cast(CASE WHEN name IN ('master', 'model', 'msdb', 'tempdb') THEN 1 ELSE is_distributor END As bit) = 0\n   ";
}
exports.getDatabaseListQuery = getDatabaseListQuery;
function getStoredProcedureListQuery(databaseName, schema) {
    if (!schema)
        return "SELECT ROUTINE_NAME FROM " + databaseName + ".INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE'";
    return "SELECT ROUTINE_NAME FROM " + databaseName + ".INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE' AND ROUTINE_SCHEMA = '" + schema + "'";
}
exports.getStoredProcedureListQuery = getStoredProcedureListQuery;
function getSchemaListQuery(databaseName) {
    return "SELECT SCHEMA_NAME FROM " + databaseName + ".INFORMATION_SCHEMA.SCHEMATA\n    where SCHEMA_NAME NOT LIKE 'db[_]%' AND SCHEMA_NAME NOT IN ('guest', 'INFORMATION_SCHEMA', 'sys')";
}
exports.getSchemaListQuery = getSchemaListQuery;
function getProcedureOutputListQuery(databaseName, schemaName, storedProcedureName) {
    return "EXEC sp_describe_first_result_set N'" + databaseName + "." + schemaName + "." + storedProcedureName + "'";
}
exports.getProcedureOutputListQuery = getProcedureOutputListQuery;
function getProcedureInputListQuery(databaseName, schemaName, storedProcedureName) {
    return "SELECT name, system_type_id, is_nullable, max_length FROM " + databaseName + ".sys.parameters WHERE object_id = object_id('" + databaseName + "." + schemaName + "." + storedProcedureName + "')";
}
exports.getProcedureInputListQuery = getProcedureInputListQuery;
function getDbTypeListQuery(databaseName) {
    return "SELECT name, system_type_id FROM " + databaseName + ".sys.types";
}
exports.getDbTypeListQuery = getDbTypeListQuery;

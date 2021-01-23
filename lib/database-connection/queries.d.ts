#!/usr/bin/env node
export declare function getDatabaseListQuery(): string;
export declare function getStoredProcedureListQuery(databaseName: string, schema?: string): string;
export declare function getSchemaListQuery(databaseName: string): string;
export declare function getProcedureOutputListQuery(databaseName: string, schemaName: string, storedProcedureName: string): string;
export declare function getProcedureInputListQuery(databaseName: string, schemaName: string, storedProcedureName: string): string;
export declare function getDbTypeListQuery(databaseName: string): string;

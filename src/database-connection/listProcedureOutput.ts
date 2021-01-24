#!/usr/bin/env node

import * as sql from "mssql/msnodesqlv8";
import chalk = require("chalk");
import { DBType } from "../types/mapping.types";
import { DbDescriptionType, OutputList } from "../types/queries.types";
import { tryConnect } from "./databaseConnection";
import { getDbTypeListQuery, getProcedureOutputListQuery } from "./queries";

export function listProcedureOutput(databaseName: string, schemaName: string, storedProcedureName: string): Promise<OutputList> {
	if (!databaseName) throw new Error(chalk.red("This command requires a database specified"));
	if (!schemaName) throw new Error(chalk.red("This command requires a schema specified"));
	if (!storedProcedureName) throw new Error(chalk.red("This command requires a stored procedure name specified"));
	return tryConnect().then(doListStoredProcedureOutput);

	async function doListStoredProcedureOutput(pool: sql.ConnectionPool): Promise<OutputList> {
		const request = new sql.Request(pool);
		const output = (await request.query<DbDescriptionType>(getProcedureOutputListQuery(databaseName, schemaName, storedProcedureName)))
			.recordsets[0];
		const types = (await request.query<DbDescriptionType>(getDbTypeListQuery(databaseName))).recordsets[0];
		const result: OutputList = output.map((output) => {
			const variableName = types.find((type) => type.system_type_id === output.system_type_id)!.name as DBType;
			return {
				outputName: output.name,
				variableName: variableName,
				maxLength: output.max_length,
				isNullable: output.is_nullable,
			};
		});
		return result;
	}
}

#!/usr/bin/env node

import * as sql from "mssql/msnodesqlv8";
import * as chalk from "chalk";
import { DBType } from "../types/mapping.types";
import { DbDescriptionType, InputList } from "../types/queries.types";
import { tryConnect } from "./databaseConnection";
import { getDbTypeListQuery, getProcedureInputListQuery, getStoredProcedureListQuery } from "./queries";

export function listProcedureInput(databaseName: string, schemaName: string, storedProcedureName: string): Promise<InputList> {
	if (!databaseName) throw new Error(chalk.red("This command requires a database specified"));
	if (!schemaName) throw new Error(chalk.red("This command requires a schema specified"));
	if (!storedProcedureName) throw new Error(chalk.red("This command requires a stored procedure name specified"));
	return tryConnect().then(doListProcedureInput);

	async function doListProcedureInput(pool: sql.ConnectionPool): Promise<InputList> {
		const request = new sql.Request(pool);
		const inputs = (await request.query<DbDescriptionType>(getProcedureInputListQuery(databaseName, schemaName, storedProcedureName)))
			.recordsets[0];
		const types = (await request.query<DbDescriptionType>(getDbTypeListQuery(databaseName))).recordsets[0];
		const result: InputList = inputs.map((input) => {
			const variableName = types.find((type) => type.system_type_id === input.system_type_id).name as DBType;
			return {
				inputName: input.name,
				variableName: variableName,
				maxLength: input.max_length,
				isNullable: input.is_nullable,
			};
		});
		return result;
	}
}

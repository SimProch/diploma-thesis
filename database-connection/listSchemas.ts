import * as sql from "mssql/msnodesqlv8";
import * as chalk from "chalk";
import { SchemaQueryResult } from "../types/queries.types";
import { tryConnect } from "./databaseConnection";
import { getSchemaListQuery } from "./queries";

export function listSchemas(databaseName: string): Promise<sql.IRecordSet<SchemaQueryResult>> {
	if (!databaseName) throw new Error(chalk.red("This command requires a database specified"));
	return tryConnect().then(doListSchemas);

	async function doListSchemas(pool: sql.ConnectionPool): Promise<sql.IRecordSet<SchemaQueryResult>> {
		const request = new sql.Request(pool);
		const result = (await request.query<SchemaQueryResult>(getSchemaListQuery(databaseName))).recordsets[0];
		return result;
	}
}

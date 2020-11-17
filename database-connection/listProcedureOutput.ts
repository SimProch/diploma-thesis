import * as sql from "mssql/msnodesqlv8";
import { tryConnect } from "./databaseConnection";
import { getProcedureOutputListQuery, getStoredProcedureListQuery } from "./queries";

export function listProcedureOutput(databaseName: string, schemaName: string, storedProcedureName: string): void {
	tryConnect(doListStoredProcedureOutput);

	async function doListStoredProcedureOutput(pool: sql.ConnectionPool): Promise<void> {
		const request = new sql.Request(pool);
		const result = await request.query(getProcedureOutputListQuery(databaseName, schemaName, storedProcedureName));
		console.log(result.recordset);
	}
}

import * as sql from "mssql/msnodesqlv8";
import { tryConnect } from "./databaseConnection";
import { getProcedureInputListQuery, getStoredProcedureListQuery } from "./queries";

export function listProcedureInput(databaseName: string, schemaName: string, storedProcedureName: string): void {
	tryConnect(doListProcedureInput);

	async function doListProcedureInput(pool: sql.ConnectionPool): Promise<void> {
		const request = new sql.Request(pool);
		const result = await request.query(getProcedureInputListQuery(databaseName, schemaName, storedProcedureName));
		console.log(result.recordset);
	}
}

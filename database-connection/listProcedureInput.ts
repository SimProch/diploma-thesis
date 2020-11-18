import * as sql from "mssql/msnodesqlv8";
import { DBType } from "../types/mapping.types";
import { DbDescriptionType, InputList } from "../types/queries.types";
import { tryConnect } from "./databaseConnection";
import { getDbTypeListQuery, getProcedureInputListQuery, getStoredProcedureListQuery } from "./queries";

export function listProcedureInput(databaseName: string, schemaName: string, storedProcedureName: string): void {
	if (!databaseName) throw new Error("This command requires a database specified");
	if (!schemaName) throw new Error("This command requires a schema specified");
	if (!storedProcedureName) throw new Error("This command requires a stored procedure name specified");
	tryConnect(doListProcedureInput);

	async function doListProcedureInput(pool: sql.ConnectionPool): Promise<void> {
		const request = new sql.Request(pool);
		const inputs = (await request.query<DbDescriptionType>(getProcedureInputListQuery(databaseName, schemaName, storedProcedureName)))
			.recordsets[0];
		const types = (await request.query<DbDescriptionType>(getDbTypeListQuery(databaseName))).recordsets[0];
		const result: InputList = inputs.map((output) => {
			const variableName = types.find((type) => (type.system_type_id === output.system_type_id)).name as DBType;
			return {
				inputName: output.name,
				variableName: variableName,
			};
		});
		console.log("Resulting properties:")
		console.log(result);
	}
}

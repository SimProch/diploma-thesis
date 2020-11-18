import * as sql from "mssql/msnodesqlv8";
import { StoredProcedureQueryResult } from "../types/queries.types";
import { tryConnect } from "./databaseConnection";
import { getStoredProcedureListQuery } from "./queries";

export function listStoredProcedures(databaseName: string, schemaName: string): Promise<sql.IRecordSet<StoredProcedureQueryResult>> {
    if (!databaseName) throw new Error("This command requires a database specified");
	if (!schemaName) throw new Error("This command requires a schema specified");
    return tryConnect().then(doListStoredProcedures);


    async function doListStoredProcedures(pool: sql.ConnectionPool): Promise<sql.IRecordSet<StoredProcedureQueryResult>> {
        const request = new sql.Request(pool);
        const result = (await request.query<StoredProcedureQueryResult>(getStoredProcedureListQuery(databaseName, schemaName))).recordsets[0];
        return result;
    }
}
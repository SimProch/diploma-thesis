import * as sql from "mssql/msnodesqlv8";
import { tryConnect } from "./databaseConnection";
import { getStoredProcedureListQuery } from "./queries";

export function listStoredProcedures(databaseName: string, schemaName: string): void {
    tryConnect(doListStoredProcedures)


    async function doListStoredProcedures(pool: sql.ConnectionPool): Promise<void> {
        const request = new sql.Request(pool);
        const result = await request.query(getStoredProcedureListQuery(databaseName, schemaName));
        console.log(result.recordset);
    }
}
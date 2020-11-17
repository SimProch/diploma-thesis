
import * as sql from "mssql/msnodesqlv8";
import { tryConnect } from "./databaseConnection";
import { getSchemaListQuery } from "./queries";

export function listSchemas(databaseName: string): void {
    tryConnect(doListSchemas)


    async function doListSchemas(pool: sql.ConnectionPool): Promise<void> {
        const request = new sql.Request(pool);
        const result = await request.query(getSchemaListQuery(databaseName));
        console.log(result.recordset);
    }
}
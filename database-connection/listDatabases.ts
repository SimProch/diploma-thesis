import * as sql from "mssql/msnodesqlv8";
import { tryConnect } from "./databaseConnection";
import { getDatabaseListQuery } from "./queries";

export function listDatabases(): void {
    tryConnect(doListDatabases)
    
    async function doListDatabases(pool: sql.ConnectionPool): Promise<void> {
        const request = new sql.Request(pool);
        const result = await request.query(getDatabaseListQuery());
        console.log(result.recordset);
    }
}

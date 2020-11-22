#!/usr/bin/env node

import * as sql from "mssql/msnodesqlv8";
import { DatabaseQueryResult } from "../types/queries.types";
import { tryConnect } from "./databaseConnection";
import { getDatabaseListQuery } from "./queries";

export function listDatabases(): Promise<sql.IRecordSet<DatabaseQueryResult>> {
	return tryConnect().then(doListDatabases);

	async function doListDatabases(pool: sql.ConnectionPool): Promise<sql.IRecordSet<DatabaseQueryResult>> {
		const request = new sql.Request(pool);
		const result = (await request.query<DatabaseQueryResult>(getDatabaseListQuery())).recordsets[0];
		return result;
	}
}

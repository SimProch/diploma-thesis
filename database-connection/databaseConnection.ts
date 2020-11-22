import * as sql from "mssql/msnodesqlv8";
import { getConfigObject } from "../configure";

export const DEFAULT_DB_NAME = "master";
export const DEFAULT_SERVER_NAME: string = "localhost\\SQLEXPRESS01";

let config: sql.config;

export function initSqlConfig(): void {
	config = {
		server: getConfigObject().global.server,
		database: getConfigObject().global.database,
		driver: "msnodesqlv8",
		options: {
			trustedConnection: true,
		},
	};
}

export function updateSqlConfig(server: string, database: string): void {
	if (server) config.server = server;
	if (database) config.database = database;
}

export async function tryConnect(): Promise<sql.ConnectionPool> {
	try {
		const pool = new sql.ConnectionPool(config);
		return await pool.connect()
	} catch (error) {
		throw new Error(error);
	}
}

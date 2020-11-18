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

export function tryConnect(connectionCallback: (pool: sql.ConnectionPool) => void): void {
	try {
		const pool = new sql.ConnectionPool(config);
		pool.connect()
			.then(() => connectionCallback(pool))
			.catch((err) => console.log(err));
	} catch (error) {
		console.error(error);
	}
}

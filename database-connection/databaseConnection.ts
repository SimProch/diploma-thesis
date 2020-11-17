import * as sql from "mssql/msnodesqlv8";

const server: string = "localhost\\SQLEXPRESS01";
const defaultDatabase: string = "DataAccessGeneratorDB";

const config: sql.config = {
	server: server,
	database: defaultDatabase,
	driver: "msnodesqlv8",
	options: {
		trustedConnection: true,
	},
};

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
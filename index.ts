#!/usr/bin/env node

import * as yargs from "yargs";
import { configure, getConfigObject, initializeConfig } from "./configure";
import { initSqlConfig } from "./database-connection/databaseConnection";
import { listDatabases } from "./database-connection/listDatabases";
import { listProcedureInput } from "./database-connection/listProcedureInput";
import { listProcedureOutput } from "./database-connection/listProcedureOutput";
import { listSchemas } from "./database-connection/listSchemas";
import { listStoredProcedures } from "./database-connection/listStoredProcedures";
import { generate } from "./generate";
import { GlobalConfiguration, MethodCallType } from "./types/cli.types";

initializeConfig();
initSqlConfig();

const argv = getListingCommands(getConfigCommand(getGenerateCommand(yargs(process.argv.slice(2))))).argv;

function getGenerateCommand(yargs: yargs.Argv): yargs.Argv {
	return yargs.command(
		"generate",
		"Generates data access",
		(yargs: yargs.Argv) => {
			return yargs
				.option("tsinterface", {
					alias: "tsi",
					boolean: true,
					description: "If true, generates TS interface. Defaults to true.",
					default: true,
				})
				.option("csmodel", {
					alias: "csm",
					boolean: true,
					description: "If true, generates CS model. Defaults to true.",
					default: true,
				})
				.option("gateway", {
					alias: "g",
					boolean: true,
					description: "If true, generates angular gateway. Defaults to true.",
					default: true,
				})
				.option("controller", {
					alias: "c",
					boolean: true,
					description: "If true, generates CS controller. Defaults to true.",
					default: true,
				})
				.option("dataaccess", {
					alias: "da",
					boolean: true,
					description: "If true, generates CS data access. Defaults to true.",
					default: true,
				});
		},
		(argv) => {
			generate(argv.tsinterface, argv.csmodel);
		}
	);
}

function getConfigCommand(yargs: yargs.Argv): yargs.Argv {
	return yargs.command(
		"config",
		"Used for configuration file for default values, connection etc.",
		(yargs) => {
			return yargs
				.option("server", {
					string: true,
					description: "Saves server name for future calls",
				})
				.option("database", {
					string: true,
					description: "Saves database name for future calls",
				})
				.option("schema", {
					string: true,
					description: "Saves schema name for future calls",
				})
				.option("callType", {
					string: true,
					description: "Saves call type for future calls",
				})
				.option("generateController", {
					boolean: true,
					description: "Saves whether controller should be generated name for future calls",
				})
				.option("generateDataAccess", {
					boolean: true,
					description: "Saves whether data access should be generated name for future calls",
				})
				.option("generateModel", {
					boolean: true,
					description: "Saves whether model should be generated name for future calls",
				})
				.option("generateInterface", {
					boolean: true,
					description: "Saves whether interface should be generated name for future calls",
				})
				.option("dataAccessPath", {
					string: true,
					description: "Saves path to which generate data access name for future calls",
				})
				.option("controllerPath", {
					string: true,
					description: "Saves path to which generate controller name for future calls",
				})

				.alias("srv", "server")
				.alias("db", "database")
				.alias("s", "schema")
				.alias("ct", "callType")
				.alias("gc", "generateController")
				.alias("gda", "generateDataAccess")
				.alias("gm", "generateModel")
				.alias("gi", "generateInterface")
				.alias("dap", "dataAccessPath")
				.alias("cp", "controllerPath");
		},
		(argv) => {
			const config: GlobalConfiguration = {
				server: argv.server,
				database: argv.database,
				schema: argv.schema,
				callType: argv.callType as MethodCallType,
				generateController: argv.generateController,
				generateDataAccess: argv.generateDataAccess,
				generateModel: argv.generateModel,
				generateInterface: argv.generateInterface,
				dataAccessPath: argv.dataAccessPath,
				controllerPath: argv.controllerPath,
			};
			configure(config);
		}
	);
}

function getListingCommands(yargs: yargs.Argv): yargs.Argv {
	return yargs
		.command(
			"listDb",
			"List available databases",
			(yargs: yargs.Argv) => yargs,
			(argv) => listDatabases()
		)
		.command(
			"listSchema",
			"List available schemas from a database",
			(yargs: yargs.Argv) => {
				return yargs
					.option("database", {
						string: true,
						description: "Specifies the database from which schemas should be fetched",
						default: getConfigObject().global.database,
					})
					.alias("db", "database");
			},
			(argv) => listSchemas(argv.database)
		)
		.command(
			"listSp",
			"List available stored procedures from a database",
			(yargs: yargs.Argv) => {
				return yargs
					.option("database", {
						string: true,
						description: "Specifies the database from which schemas should be fetched",
						default: getConfigObject().global.database,
					})
					.option("schema", {
						string: true,
						description: "Specifies the of schema from which stored procedures should be fetched",
						default: getConfigObject().global.schema,
					})
					.alias("db", "database")
					.alias("s", "schema");
			},
			(argv) => listStoredProcedures(argv.database, argv.schema)
		)
		.command(
			"listSpInputs",
			"List available stored procedures from a database",
			(yargs: yargs.Argv) => {
				return yargs
					.option("database", {
						string: true,
						description: "Specifies the database from which schemas should be fetched",
						default: getConfigObject().global.database,
					})
					.option("schema", {
						string: true,
						description: "Specifies the of schema from which stored procedures should be fetched",
						default: getConfigObject().global.schema,
					})
					.option("storedProcedureName", {
						string: true,
						description: "Specifies the of schema from which stored procedures should be fetched",
					})
					.alias("db", "database")
					.alias("s", "schema")
					.alias("sp", "storedProcedureName");
			},
			(argv) => listProcedureInput(argv.database, argv.schema, argv.storedProcedureName)
		)
		.command(
			"listSpOutputs",
			"List available stored procedure outputs from a database",
			(yargs: yargs.Argv) => {
				return yargs
					.option("database", {
						string: true,
						description: "Specifies the database from which schemas should be fetched",
						default: getConfigObject().global.database,
					})
					.option("schema", {
						string: true,
						description: "Specifies the of schema from which stored procedures should be fetched",
						default: getConfigObject().global.schema,
					})
					.option("storedProcedureName", {
						string: true,
						description: "Specifies the of schema from which stored procedures should be fetched",
					})
					.alias("db", "database")
					.alias("s", "schema")
					.alias("sp", "storedProcedureName");
			},
			(argv) => listProcedureOutput(argv.database, argv.schema, argv.storedProcedureName)
		);
}

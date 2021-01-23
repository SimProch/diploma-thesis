#!/usr/bin/env node

import * as chalk from "chalk";
import * as yargs from "yargs";
import { configureGlobal, getConfigObject, initializeConfig } from "./configure";
import { generate } from "./create-files/generate";
import { initSqlConfig } from "./database-connection/databaseConnection";
import { listDatabases } from "./database-connection/listDatabases";
import { listProcedureInput } from "./database-connection/listProcedureInput";
import { listProcedureOutput } from "./database-connection/listProcedureOutput";
import { listSchemas } from "./database-connection/listSchemas";
import { listStoredProcedures } from "./database-connection/listStoredProcedures";
import { CommandArguments, GlobalConfiguration, MethodCallType } from "./types/cli.types";

initializeConfig();
initSqlConfig();

const generateCommand = getGenerateCommand(yargs(process.argv.slice(2)));
const configCommand = getConfigCommand(generateCommand);
const listingCommands = getListingCommands(configCommand);
const regenerateCommand = getRegenrateCommand(listingCommands);
const argv = regenerateCommand.argv;

function getGenerateCommand(yargs: yargs.Argv): yargs.Argv {
	return yargs.command(
		"generate",
		"Generates data access",
		(yargs: yargs.Argv) => {
			return yargs
				.option("server", {
					string: true,
					description: "Specifies server name for future calls",
					default: getConfigObject().global.server,
				})
				.option("database", {
					string: true,
					description: "Specifies database name for future calls",
					default: getConfigObject().global.database,
				})
				.option("schema", {
					string: true,
					description: "Specifies schema name for future calls",
					default: getConfigObject().global.schema,
				})
				.option("callType", {
					string: true,
					description: "Specifies call type for future calls",
					default: getConfigObject().global.callType,
				})
				.option("generateController", {
					boolean: true,
					description: "Specifies whether controller should be generated name for future calls",
					default: getConfigObject().global.generateController,
				})
				.option("generateDataAccess", {
					boolean: true,
					description: "Specifies whether data access should be generated name for future calls",
					default: getConfigObject().global.generateDataAccess,
				})
				.option("generateModel", {
					boolean: true,
					description: "Specifies whether model should be generated name for future calls",
					default: getConfigObject().global.generateModel,
				})
				.option("generateInterface", {
					boolean: true,
					description: "Specifies whether interface should be generated name for future calls",
					default: getConfigObject().global.generateInterface,
				})
				.option("dataAccessPath", {
					string: true,
					description: "Specifies path to which generate data access name for future calls",
					default: getConfigObject().global.dataAccessPath,
				})
				.option("controllerPath", {
					string: true,
					description: "Specifies path to which generate controller name for future calls",
					default: getConfigObject().global.controllerPath,
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
				.alias("cp", "controllerPath")

				.option("storedProcedureName", {
					string: true,
					description: "Specifies the of schema from which stored procedures should be fetched",
				})
				.option("route", {
					string: true,
					description: "Specifies route of controller",
				})
				.option("httpMethodType", {
					string: true,
					description: "Specifies method type to use",
				})
				.alias("sp", "storedProcedureName")
				.alias("r", "route")
				.alias("http", "httpMethodType");
		},
		(argv) => {
			const commandArgs: CommandArguments = {
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
				storedProcedureName: argv.storedProcedureName as string,
				route: argv.route as string,
				httpMethodType: argv.httpMethodType as "POST" | "GET",
			};
			generate(commandArgs);
		}
	);
}

function getConfigCommand(yargs: yargs.Argv): yargs.Argv {
	return yargs.command("config", "Used for setting or getting values of configuration file", (argv) => {
		return yargs
			.command(
				"set",
				"Used setting values in configuration file",
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
					configureGlobal(config);
				}
			)
			.command(
				"get",
				"Used for getting values from configuration file",
				(yargs) => {
					return yargs
						.option("namespace", {
							string: true,
							description: "Defines namespace for the selected configuration",
						})
						.alias("ns", "namespace");
				},
				(argv) => {
					const globalConfig = getConfigObject();
					if (argv.namespace) {
						const config = globalConfig[argv.namespace];
						if (!config) console.log(chalk.red("This configuration namespace does not exist!"));
						else console.log(globalConfig[argv.namespace]);
						process.exit();
					}
					console.log(globalConfig);
					process.exit();
				}
			);
	});
}

function getListingCommands(yargs: yargs.Argv): yargs.Argv {
	return yargs
		.command(
			"listDb",
			"List available databases",
			(yargs: yargs.Argv) => yargs,
			(argv) =>
				listDatabases()
					.then((res) => {
						console.log(chalk.green("Resulting properties:"));
						console.log(res);
						process.exit();
					})
					.catch((err) => {
						throw new Error(err);
					})
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
			(argv) =>
				listSchemas(argv.database)
					.then((res) => {
						console.log(chalk.green("Resulting properties:"));
						console.log(res);
						process.exit();
					})
					.catch((err) => {
						throw new Error(err);
					})
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
			(argv) =>
				listStoredProcedures(argv.database, argv.schema)
					.then((res) => {
						console.log(chalk.green("Resulting properties:"));
						console.log(res);
						process.exit();
					})
					.catch((err) => {
						throw new Error(err);
					})
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
			(argv) =>
				listProcedureInput(argv.database, argv.schema, argv.storedProcedureName)
					.then((res) => {
						console.log(chalk.green("Resulting properties:"));
						console.log(res);
						process.exit();
					})
					.catch((err) => {
						throw new Error(err);
					})
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
			(argv) =>
				listProcedureOutput(argv.database, argv.schema, argv.storedProcedureName)
					.then((res) => {
						console.log(chalk.green("Resulting properties:"));
						console.log(res);
						process.exit();
					})
					.catch((err) => {
						throw new Error(err);
					})
		);
}

function getRegenrateCommand(yargs: yargs.Argv): yargs.Argv {
	return yargs.command(
		"regenerate",
		"List ",
		(yargs: yargs.Argv) => {
			return yargs
				.option("storedProcedureName", {
					string: true,
					description: "Specifies already generated stored procedure",
				})
				.alias("sp", "storedProcedureName");
		},
		(argv) => {
			const globalConfig = getConfigObject();
			const currentConfig = globalConfig[argv.storedProcedureName];
			if (!currentConfig) {
				console.log(chalk.red("Configuration doesn't exist for specified procedure"));
				process.exit(1);
			}
			generate(currentConfig);
		}
	);
}

#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var yargs = require("yargs");
var figlet = require("figlet");
var configure_1 = require("./configure");
var generate_1 = require("./src/create-files/generate");
var databaseConnection_1 = require("./src/database-connection/databaseConnection");
var listDatabases_1 = require("./src/database-connection/listDatabases");
var listProcedureInput_1 = require("./src/database-connection/listProcedureInput");
var listProcedureOutput_1 = require("./src/database-connection/listProcedureOutput");
var listSchemas_1 = require("./src/database-connection/listSchemas");
var listStoredProcedures_1 = require("./src/database-connection/listStoredProcedures");
configure_1.initializeConfig();
databaseConnection_1.initSqlConfig();
var generateCommand = getGenerateCommand(yargs(process.argv.slice(2)));
var configCommand = getConfigCommand(generateCommand);
var listingCommands = getListingCommands(configCommand);
var regenerateCommand = getRegenrateCommand(listingCommands);
var argv = regenerateCommand.argv;
console.log(chalk.red(figlet.textSync("dt-lgx-dafg", { horizontalLayout: "full" })));
function getGenerateCommand(yargs) {
    return yargs.command("generate", "Generates data access", function (yargs) {
        return yargs
            .option("server", {
            string: true,
            description: "Specifies server name for future calls",
            default: configure_1.getConfigObject().global.server,
        })
            .option("database", {
            string: true,
            description: "Specifies database name for future calls",
            default: configure_1.getConfigObject().global.database,
        })
            .option("schema", {
            string: true,
            description: "Specifies schema name for future calls",
            default: configure_1.getConfigObject().global.schema,
        })
            .option("callType", {
            string: true,
            description: "Specifies call type for future calls",
            default: configure_1.getConfigObject().global.callType,
        })
            .option("generateController", {
            boolean: true,
            description: "Specifies whether controller should be generated name for future calls",
            default: configure_1.getConfigObject().global.generateController,
        })
            .option("generateDataAccess", {
            boolean: true,
            description: "Specifies whether data access should be generated name for future calls",
            default: configure_1.getConfigObject().global.generateDataAccess,
        })
            .option("generateModel", {
            boolean: true,
            description: "Specifies whether model should be generated name for future calls",
            default: configure_1.getConfigObject().global.generateModel,
        })
            .option("generateInterface", {
            boolean: true,
            description: "Specifies whether interface should be generated name for future calls",
            default: configure_1.getConfigObject().global.generateInterface,
        })
            .option("dataAccessPath", {
            string: true,
            description: "Specifies path to which generate data access name for future calls",
            default: configure_1.getConfigObject().global.dataAccessPath,
        })
            .option("controllerPath", {
            string: true,
            description: "Specifies path to which generate controller name for future calls",
            default: configure_1.getConfigObject().global.controllerPath,
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
    }, function (argv) {
        var commandArgs = {
            server: argv.server,
            database: argv.database,
            schema: argv.schema,
            callType: argv.callType,
            generateController: argv.generateController,
            generateDataAccess: argv.generateDataAccess,
            generateModel: argv.generateModel,
            generateInterface: argv.generateInterface,
            dataAccessPath: argv.dataAccessPath,
            controllerPath: argv.controllerPath,
            storedProcedureName: argv.storedProcedureName,
            route: argv.route,
            httpMethodType: argv.httpMethodType,
        };
        generate_1.generate(commandArgs);
    });
}
function getConfigCommand(yargs) {
    return yargs.command("config", "Used for setting or getting values of configuration file", function (argv) {
        return yargs
            .command("set", "Used setting values in configuration file", function (yargs) {
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
        }, function (argv) {
            var config = {
                server: argv.server,
                database: argv.database,
                schema: argv.schema,
                callType: argv.callType,
                generateController: argv.generateController,
                generateDataAccess: argv.generateDataAccess,
                generateModel: argv.generateModel,
                generateInterface: argv.generateInterface,
                dataAccessPath: argv.dataAccessPath,
                controllerPath: argv.controllerPath,
            };
            configure_1.configureGlobal(config);
        })
            .command("get", "Used for getting values from configuration file", function (yargs) {
            return yargs
                .option("namespace", {
                string: true,
                description: "Defines namespace for the selected configuration",
            })
                .alias("ns", "namespace");
        }, function (argv) {
            var globalConfig = configure_1.getConfigObject();
            if (argv.namespace) {
                var config = globalConfig[argv.namespace];
                if (!config)
                    console.log(chalk.red("This configuration namespace does not exist!"));
                else
                    console.log(globalConfig[argv.namespace]);
                process.exit();
            }
            console.log(globalConfig);
            process.exit();
        });
    });
}
function getListingCommands(yargs) {
    return yargs
        .command("listDb", "List available databases", function (yargs) { return yargs; }, function (argv) {
        return listDatabases_1.listDatabases()
            .then(function (res) {
            console.log(chalk.green("Resulting properties:"));
            console.log(res);
            process.exit();
        })
            .catch(function (err) {
            throw new Error(err);
        });
    })
        .command("listSchema", "List available schemas from a database", function (yargs) {
        return yargs
            .option("database", {
            string: true,
            description: "Specifies the database from which schemas should be fetched",
            default: configure_1.getConfigObject().global.database,
        })
            .alias("db", "database");
    }, function (argv) {
        return listSchemas_1.listSchemas(argv.database)
            .then(function (res) {
            console.log(chalk.green("Resulting properties:"));
            console.log(res);
            process.exit();
        })
            .catch(function (err) {
            throw new Error(err);
        });
    })
        .command("listSp", "List available stored procedures from a database", function (yargs) {
        return yargs
            .option("database", {
            string: true,
            description: "Specifies the database from which schemas should be fetched",
            default: configure_1.getConfigObject().global.database,
        })
            .option("schema", {
            string: true,
            description: "Specifies the of schema from which stored procedures should be fetched",
            default: configure_1.getConfigObject().global.schema,
        })
            .alias("db", "database")
            .alias("s", "schema");
    }, function (argv) {
        return listStoredProcedures_1.listStoredProcedures(argv.database, argv.schema)
            .then(function (res) {
            console.log(chalk.green("Resulting properties:"));
            console.log(res);
            process.exit();
        })
            .catch(function (err) {
            throw new Error(err);
        });
    })
        .command("listSpInputs", "List available stored procedures from a database", function (yargs) {
        return yargs
            .option("database", {
            string: true,
            description: "Specifies the database from which schemas should be fetched",
            default: configure_1.getConfigObject().global.database,
        })
            .option("schema", {
            string: true,
            description: "Specifies the of schema from which stored procedures should be fetched",
            default: configure_1.getConfigObject().global.schema,
        })
            .option("storedProcedureName", {
            string: true,
            description: "Specifies the of schema from which stored procedures should be fetched",
            demandOption: true,
        })
            .alias("db", "database")
            .alias("s", "schema")
            .alias("sp", "storedProcedureName");
    }, function (argv) {
        return listProcedureInput_1.listProcedureInput(argv.database, argv.schema, argv.storedProcedureName)
            .then(function (res) {
            console.log(chalk.green("Resulting properties:"));
            console.log(res);
            process.exit();
        })
            .catch(function (err) {
            throw new Error(err);
        });
    })
        .command("listSpOutputs", "List available stored procedure outputs from a database", function (yargs) {
        return yargs
            .option("database", {
            string: true,
            description: "Specifies the database from which schemas should be fetched",
            default: configure_1.getConfigObject().global.database,
        })
            .option("schema", {
            string: true,
            description: "Specifies the of schema from which stored procedures should be fetched",
            default: configure_1.getConfigObject().global.schema,
        })
            .option("storedProcedureName", {
            string: true,
            description: "Specifies the of schema from which stored procedures should be fetched",
            demandOption: true,
        })
            .alias("db", "database")
            .alias("s", "schema")
            .alias("sp", "storedProcedureName");
    }, function (argv) {
        return listProcedureOutput_1.listProcedureOutput(argv.database, argv.schema, argv.storedProcedureName)
            .then(function (res) {
            console.log(chalk.green("Resulting properties:"));
            console.log(res);
            process.exit();
        })
            .catch(function (err) {
            throw new Error(err);
        });
    });
}
function getRegenrateCommand(yargs) {
    return yargs.command("regenerate", "Generate previously generated Data Access by specifying stored procedure name", function (yargs) {
        return yargs
            .option("storedProcedureName", {
            string: true,
            description: "Specifies already generated stored procedure",
            demandOption: true,
        })
            .alias("sp", "storedProcedureName");
    }, function (argv) {
        var globalConfig = configure_1.getConfigObject();
        var currentConfig = globalConfig[argv.storedProcedureName];
        if (!currentConfig) {
            console.log(chalk.red("Configuration doesn't exist for specified procedure"));
            process.exit(1);
        }
        generate_1.generate(currentConfig);
    });
}

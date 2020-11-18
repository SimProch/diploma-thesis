import { Configuration, GlobalConfiguration } from "./types/cli.types";
import * as fs from "fs-extra";
import { DEFAULT_DB_NAME, DEFAULT_SERVER_NAME } from "./database-connection/databaseConnection";

const CONFIG_NAME = "config.json";
const DEFAULT_CONFIG = {
	global: {},
};
let globalConfig: Configuration;

export function initializeConfig(): void {
	const hasExistingConfig = fs.existsSync(CONFIG_NAME);
	if (!hasExistingConfig) {
		fs.writeFileSync(CONFIG_NAME, JSON.stringify(DEFAULT_CONFIG), { encoding: "utf8" });
	}

	const JSONconfig = fs.readFileSync(CONFIG_NAME, { encoding: "utf8" });
	globalConfig = JSON.parse(JSONconfig);
}

export function configure(config: GlobalConfiguration): void {
    if (!config.database) config.database = DEFAULT_DB_NAME;
    if (!config.server) config.server = DEFAULT_SERVER_NAME;
    
    if (config.server) addKeyValuePair(globalConfig.global, "server", config.server);
	if (config.database) addKeyValuePair(globalConfig.global, "database", config.database);
	if (config.schema) addKeyValuePair(globalConfig.global, "schema", config.schema);
	if (config.callType) addKeyValuePair(globalConfig.global, "callType", config.callType);
	if (config.generateController) addKeyValuePair(globalConfig.global, "generateController", config.generateController);
	if (config.generateDataAccess) addKeyValuePair(globalConfig.global, "generateDataAccess", config.generateDataAccess);
	if (config.generateModel) addKeyValuePair(globalConfig.global, "generateModel", config.generateModel);
	if (config.generateInterface) addKeyValuePair(globalConfig.global, "generateInterface", config.generateInterface);
	if (config.dataAccessPath) addKeyValuePair(globalConfig.global, "dataAccessPath", config.dataAccessPath);
	if (config.controllerPath) addKeyValuePair(globalConfig.global, "controllerPath", config.controllerPath);
}

export function addKeyValuePair(namespace: object, key: string, value: string | number | boolean) {
	namespace[key] = value;
	fs.writeFileSync(CONFIG_NAME, JSON.stringify(globalConfig, null, 4), { encoding: "utf8" });
}

export function getConfigObject(): Configuration {
	return globalConfig;
}
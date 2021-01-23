#!/usr/bin/env node

import { CommandArguments, Configuration, GlobalConfiguration } from "./src/types/cli.types";
import * as fs from "fs-extra";
import { DEFAULT_DB_NAME, DEFAULT_SERVER_NAME } from "./src/database-connection/databaseConnection";

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

export function configureGlobal(config: GlobalConfiguration): void {
	if (!config.database && !globalConfig.global.database) config.database = DEFAULT_DB_NAME;
	if (!config.server && !globalConfig.global.server) config.server = DEFAULT_SERVER_NAME;

	configure("global", config);
}

export function configure(namespace: string, config: CommandArguments | GlobalConfiguration): void {
	Object.keys(config).forEach((key) => {
		if (!globalConfig[namespace]) globalConfig[namespace] = {} as any;
		if (config[key]) addKeyValuePair(globalConfig[namespace], key, config[key]);
	});
}

function addKeyValuePair(namespace: { [key: string]: any }, key: string, value: string | number | boolean) {
	namespace[key]= value;
	fs.writeFileSync(CONFIG_NAME, JSON.stringify(globalConfig, null, 4), { encoding: "utf8" });
}

export function getConfigObject(): Configuration {
	return globalConfig;
}

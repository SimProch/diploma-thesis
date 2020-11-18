import { ConfigureArguments } from "./types";
import * as fs from 'fs-extra';

const CONFIG_NAME = 'config.json';
let config: object;

export function initializeConfig(): void {

    const hasExistingConfig = fs.existsSync(CONFIG_NAME)
    if (!hasExistingConfig) {
        fs.writeFileSync(CONFIG_NAME, JSON.stringify({}), { encoding: 'utf8' });
    }
    
    const JSONconfig = fs.readFileSync(CONFIG_NAME, { encoding: 'utf8' });  
    config = JSON.parse(JSONconfig);
}

export function configure(argv: ConfigureArguments): void {
    if (argv.server) addKeyValuePair('server', argv.server);
    if (argv.database) addKeyValuePair('database', argv.database);
    if (argv.schema) addKeyValuePair('schema', argv.schema);
}

export function addKeyValuePair(key: string, value: string) {
    config[key] = value;
    fs.writeFileSync(CONFIG_NAME, JSON.stringify(config,null, 4), { encoding: 'utf8' });
}

export function getConfigObjects(): object {
    return config;
}
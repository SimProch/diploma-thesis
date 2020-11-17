#!/usr/bin/env node

import * as yargs from 'yargs';
import { listDatabases } from './database-connection/listDatabases';
import { listSchemas } from './database-connection/listSchemas';
import { listStoredProcedures } from './database-connection/listStoredProcedures';
import { generate } from './generate';

const DEFAULT_DB_NAME = 'master';
const DEFAULT_SCHEMA_NAME = void 0;



const argv = yargs
.command('config', 'Used for configuration file for default values, connection etc.', (yargs: yargs.Argv) => {
	return yargs
		.option('server', {
			alias: 'srv',
			string: true,
			description: 'Saves server name for future calls',
		})
		.option('database', {
			alias: 'db',
			string: true,
			description: 'Saves database name for future calls',
		})
		.option('schema', {
			alias: 's',
			string: true,
			description: 'Saves schema name for future calls',
		})
}, (argv) => {
	console.log('hit')	
})
.command('generate', 'Generates data access', (yargs: yargs.Argv) => {
	return yargs
		.option('tsinterface', {
			alias: 'tsi',
			boolean: true,
			description: 'If true, generates TS interface. Defaults to true.',
			default: true,
		})
		.option('csmodel', {
			alias: 'csm',
			boolean: true,
			description: 'If true, generates CS model. Defaults to true.',
			default: true,
		})
		.option('gateway', {
			alias: 'g',
			boolean: true,
			description: 'If true, generates angular gateway. Defaults to true.',
			default: true,
		})
		.option('controller', {
			alias: 'c',
			boolean: true,
			description: 'If true, generates CS controller. Defaults to true.',
			default: true,
		})
		.option('dataaccess', {
			alias: 'da',
			boolean: true,
			description: 'If true, generates CS data access. Defaults to true.',
			default: true,
		});
}, (argv) => {
	generate(argv.tsinterface, argv.csmodel);
})
.command('listDb', 'List available databases', (yargs: yargs.Argv) => yargs ,(argv) => {
	listDatabases();
})
.command('listSchema', 'List available schemas from a database', (yargs: yargs.Argv) => {
	return yargs
	.option('database', {
		alias: 'db',
		string: true,
		description: 'Specifies the database from which schemas should be fetched',
		default: DEFAULT_DB_NAME,
	});
}, (argv) => {
	listSchemas(argv.database);
})
.command('listSp', 'List available stored procedures from a database', (yargs: yargs.Argv) => {
	return yargs
	.option('database', {
		alias: 'db',
		string: true,
		description: 'Specifies the database from which schemas should be fetched',
		default: DEFAULT_DB_NAME,
	})
	.option('schema', {
		alias: 's',
		string: true,
		description: 'Specifies the of schema from which stored procedures should be fetched',
		default: DEFAULT_SCHEMA_NAME,
	});
}, (argv) => {
	listStoredProcedures(argv.database, argv.schema);
}).argv
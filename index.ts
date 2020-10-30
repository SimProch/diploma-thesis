#!/usr/bin/env node
import * as fs from 'fs-extra';
import * as process from 'process';
import * as yargs from 'yargs';
import createInterface from './createInterface';
import createModel from './createModel';
import { interfaceProperties, modelProperties } from './fakeValues';
import { InterfaceProperties, ModelProperties } from './types';

let argv = yargs.command('generate', 'Generates data access', (yargs: yargs.Argv) => {
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
}).argv;


function generate(tsinterface: boolean, csmodel: boolean) {
	if (tsinterface) createTsInterface('newInterface', interfaceProperties);
	if (csmodel) createCsModel('newModel', modelProperties);
}

function createTsInterface(interfaceName: string, props: InterfaceProperties[]): void {
	deleteFileIfExists(`${interfaceName}.ts`);
	const newInterface = createInterface(interfaceName, props);
	fs.appendFile(`${interfaceName}.ts`, newInterface, (err) => postCreateCallback(err, newInterface));
}

function createCsModel(modelName: string, props: ModelProperties[]): void {
	deleteFileIfExists(`${modelName}.cs`);
	const newModel = createModel(modelName, props);
	fs.appendFile(`${modelName}.cs`, newModel, (err) => postCreateCallback(err, newModel));
}

function deleteFileIfExists(fileName: string): void {
	if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
}

function postCreateCallback(err: NodeJS.ErrnoException, newItem: string) {
	if (err) throw err;
	console.log(`Created ${newItem}`);
}

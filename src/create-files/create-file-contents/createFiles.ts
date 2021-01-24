#!/usr/bin/env node

import * as fs from "fs-extra";
import chalk = require("chalk");
import { MethodCallType } from "../../types/cli.types";
import { CommandDefinitionProperties, InterfaceProperties, ModelProperties } from "../../types/mapping.types";
import getCommandDefinition from "./getCommandDefinition";
import getController from "./getController";
import getDataAccess from "./getDataAccess";
import getInterface from "./getInterface";
import getModel from "./getModel";
import {
	getCommandDefinitionArguments,
	getControllerArguments,
	getDataAccessArguments,
	getInterfaceArguments,
	getModelArguments,
} from "./types/file-contents.types";

const LINE_END = "\r\n";
const calledFromPath = process.cwd();
const resultPath = `${calledFromPath}/result`

export function createTsInterface(interfaceName: string, props: InterfaceProperties[]): Promise<string | null> {
	return new Promise((resolve, reject) => {
		if (props.length == 0) {
			const msg = chalk.yellow(`There are no properties for ${interfaceName}. Skipping creation of TS interface.`);
			console.log(msg);
			resolve(null);
			return;
		}
		const filePath = `${resultPath}/${interfaceName}.ts`;
		createResultDirectory();
		deleteFileIfExists(filePath);
		const getInterfaceArgs: getInterfaceArguments = {
			interfaceName: interfaceName,
			properties: props,
		};
		const newInterface = getInterface(getInterfaceArgs);
		fs.appendFile(filePath, newInterface, (err) => postCreateCallback(err, filePath, resolve, reject));
	});
}
export function createCsModel(modelName: string, props: ModelProperties[]): Promise<string | null> {
	return new Promise((resolve, reject) => {
		if (props.length == 0) {
			const msg = chalk.yellow(`There are no properties for ${modelName}. Skipping creation of TS interface.`);
			console.log(msg);
			resolve(null);
			return;
		}
		const filePath = `${resultPath}/${modelName}.cs`;
		createResultDirectory();
		deleteFileIfExists(filePath);
		const getModelArgs: getModelArguments = {
			modelName: modelName,
			properties: props,
		};
		const newModel = getModel(getModelArgs);
		fs.appendFile(filePath, newModel, (err) => postCreateCallback(err, filePath, resolve, reject));
	});
}
export function createDataAccess(
	methodType: MethodCallType,
	schema: string,
	spName: string,
	props: CommandDefinitionProperties[],
	modelProps: ModelProperties[]
): Promise<string> {
	return new Promise((resolve, reject) => {
		const filePath = `${resultPath}/${spName}.cs`;
		createResultDirectory();
		deleteFileIfExists(filePath);
		const dataAccessArgs: getDataAccessArguments = {
			methodType: methodType,
			spName: spName,
			modelName: "modelName",
			properties: modelProps,
		};
		const commandDefinitionArgs: getCommandDefinitionArguments = {
			schema: schema,
			spName: spName,
			properties: props,
		};
		const dataAccessMethod = getDataAccess(dataAccessArgs);
		const commandDefinition = getCommandDefinition(commandDefinitionArgs);
		const spaceBetween = LINE_END + LINE_END;
		const fileStart = `public class DataAccess {${spaceBetween}`;
		const dataAccessContents = dataAccessMethod + spaceBetween;
		const commandDefinitionContents = commandDefinition + LINE_END;
		const fileEnd = `}`;
		const fileContents = fileStart + dataAccessContents + commandDefinitionContents + fileEnd;
		fs.appendFile(filePath, fileContents, (err) => postCreateCallback(err, filePath, resolve, reject));
	});
}

export function createController(args: getControllerArguments): Promise<string> {
	return new Promise((resolve, reject) => {
		const filePath = `${resultPath}/${args.classMethodName}.cs`;
		createResultDirectory();
		deleteFileIfExists(filePath);
		const controller = getController(args);
		fs.appendFile(filePath, controller, (err) => postCreateCallback(err, filePath, resolve, reject));
	});
}

function deleteFileIfExists(fileName: string): void {
	if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
}

function createResultDirectory(): void {
	if (!fs.existsSync(resultPath)){
		fs.mkdirSync(resultPath);
	}
}

function postCreateCallback(err: NodeJS.ErrnoException, fileName: string, resolve: Function, reject: Function): void {
	if (err) reject(err);
	resolve(fileName);
}

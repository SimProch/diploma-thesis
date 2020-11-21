import * as fs from "fs-extra";
import * as path from "path";
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
const rootDirectory = path.dirname(require.main.filename);

export function createTsInterface(interfaceName: string, props: InterfaceProperties[]): void {
	const filePath = `${rootDirectory}/result/${interfaceName}.ts`;
	deleteFileIfExists(filePath);
	const getInterfaceArgs: getInterfaceArguments = {
		interfaceName: interfaceName,
		properties: props,
	};
	const newInterface = getInterface(getInterfaceArgs);
	fs.appendFile(filePath, newInterface, (err) => postCreateCallback(err, filePath));
}
export function createCsModel(modelName: string, props: ModelProperties[]): void {
	const filePath = `${rootDirectory}/result/${modelName}.cs`;
	deleteFileIfExists(filePath);
	const getModelArgs: getModelArguments = {
		modelName: modelName,
		properties: props,
	};
	const newModel = getModel(getModelArgs);
	fs.appendFile(filePath, newModel, (err) => postCreateCallback(err, filePath));
}
export function createDataAccess(
	methodType: MethodCallType,
	schema: string,
	spName: string,
	props: CommandDefinitionProperties[],
	modelProps: ModelProperties[]
): void {
	const filePath = `${rootDirectory}/result/${spName}.cs`;
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
	const fileContents = `public class DataAccess { ${LINE_END + dataAccessMethod + LINE_END + LINE_END + commandDefinition + LINE_END}}`;
	fs.appendFile(filePath, fileContents, (err) => postCreateCallback(err, filePath));
}

export function createController(args: getControllerArguments): void {
	const filePath = `${rootDirectory}/result/${args.classMethodName}.cs`;
	deleteFileIfExists(filePath);
	const controller = getController(args);
	fs.appendFile(filePath, controller, (err) => postCreateCallback(err, filePath));
}

function deleteFileIfExists(fileName: string): void {
	if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
}
function postCreateCallback(err: NodeJS.ErrnoException, fileName: string) {
	if (err) throw err;
	console.log(`Created ${fileName}`);
}
